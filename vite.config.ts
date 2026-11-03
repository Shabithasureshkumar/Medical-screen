import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

interface MinimalIncomingMessage {
  url?: string
  method?: string
  on(event: 'data', listener: (chunk: { toString(): string }) => void): void
  on(event: 'end', listener: () => void): void
}

function getQueryParam(rawUrl: string, key: string): string | null {
  const qIndex = rawUrl.indexOf('?')
  if (qIndex === -1) return null
  const query = rawUrl.slice(qIndex + 1)
  for (const part of query.split('&')) {
    const [k, v] = part.split('=')
    if (decodeURIComponent(k || '') === key) {
      return decodeURIComponent(v || '')
    }
  }
  return null
}

function getPathname(rawUrl: string): string {
  const qIndex = rawUrl.indexOf('?')
  return qIndex === -1 ? rawUrl : rawUrl.slice(0, qIndex)
}

function medicalPortalApiPlugin(): Plugin {
  const patientsStore: Record<string, unknown> = {}

  return {
    name: 'medical-portal-api',
    configureServer(server) {
      server.middlewares.use((rawReq, res, next) => {
        const req = rawReq as unknown as MinimalIncomingMessage
        if (!req.url || !req.url.startsWith('/api/')) {
          return next()
        }

        const pathname = getPathname(req.url)
        res.setHeader('Content-Type', 'application/json')

        if (req.method === 'GET' && pathname === '/api/health') {
          res.statusCode = 200
          res.end(
            JSON.stringify({
              status: 'ok',
              service: 'mednevo-portal-api',
              persistence: 'memory-and-client-storage',
              timestamp: new Date().toISOString()
            })
          )
          return
        }

        if (req.method === 'GET' && pathname === '/api/auth/session') {
          const patientId = getQueryParam(req.url, 'patientId') || '#4432-6TH'
          res.statusCode = 200
          res.end(
            JSON.stringify({
              authenticated: true,
              patientId,
              role: 'patient',
              isolatedNamespace: `patient:${patientId}`
            })
          )
          return
        }

        if (req.method === 'GET' && pathname === '/api/state') {
          const patientId = getQueryParam(req.url, 'patientId') || '#4432-6TH'
          const state = patientsStore[patientId] || null
          res.statusCode = 200
          res.end(JSON.stringify({ ok: true, patientId, state }))
          return
        }

        if (req.method === 'PUT' && pathname === '/api/state') {
          let body = ''
          req.on('data', (chunk: { toString(): string }) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const payload = JSON.parse(body) as { patientId?: string; state?: unknown }
              const patientId = payload.patientId || '#4432-6TH'
              if (!payload.state || typeof payload.state !== 'object') {
                res.statusCode = 400
                res.end(JSON.stringify({ ok: false, error: 'Invalid state payload' }))
                return
              }
              patientsStore[patientId] = {
                ...(payload.state as Record<string, unknown>),
                updatedAt: new Date().toISOString()
              }
              res.statusCode = 200
              res.end(JSON.stringify({ ok: true, patientId, updatedAt: new Date().toISOString() }))
            } catch {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'Malformed JSON body' }))
            }
          })
          return
        }

        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    medicalPortalApiPlugin(),
  ],
  server: {
    port: 3000,
    open: false
  }
})
