import type { CollectionBeforeChangeHook } from 'payload'
import webpush from 'web-push'

let vapidConfigured = false

function ensureVapidConfigured() {
  if (vapidConfigured) return true
  const publicKey = process.env.VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY
  if (!publicKey || !privateKey) {
    console.warn('[Notificaciones] VAPID keys no configuradas, push deshabilitado')
    return false
  }
  webpush.setVapidDetails('mailto:soporteugelamboo@gmail.com', publicKey, privateKey)
  vapidConfigured = true
  return true
}

interface PushSub {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export const enviarNotificacionPush: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  // Solo enviar notificaciones al crear una nueva entrada
  if (operation !== 'create') return data

  if (!ensureVapidConfigured()) return data

  const { titulo, mensaje } = data

  console.log('[Notificaciones] Hook beforeChange ejecutado - Preparando envío push...')

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = req.payload.db as any
    const connection = adapter.connection

    if (!connection || !connection.db) {
      console.error('[Notificaciones] connection.db no disponible para buscar suscriptores')
      return data
    }

    const db = connection.db
    const subscriptionsCol = db.collection('push_subscriptions')
    const subscriptions: PushSub[] = await subscriptionsCol.find({}).toArray()

    console.log(`[Notificaciones] Suscriptores encontrados en BD: ${subscriptions.length}`)

    let sent = 0
    let failed = 0

    if (subscriptions.length > 0) {
      const pushPayload = JSON.stringify({
        title: titulo,
        body: mensaje,
        icon: '/icon-192x192.png',
      })

      const expiredEndpoints: string[] = []

      await Promise.allSettled(
        subscriptions.map(async (sub) => {
          try {
            await webpush.sendNotification(
              {
                endpoint: sub.endpoint,
                keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
              },
              pushPayload,
            )
            sent++
          } catch (error: unknown) {
            failed++
            const statusCode = (error as { statusCode?: number })?.statusCode
            if (statusCode === 410 || statusCode === 404) {
              expiredEndpoints.push(sub.endpoint)
            }
          }
        }),
      )

      if (expiredEndpoints.length > 0) {
        // Limpiamos los expirados de forma asíncrona (fuera de la transacción si es posible, o simplemente seguimos)
        subscriptionsCol
          .deleteMany({ endpoint: { $in: expiredEndpoints } })
          .catch((err: unknown) => {
            console.error('[Notificaciones] Error limpiando expirados:', err)
          })
      }
    }

    console.log(`[Notificaciones] Resultado del envío: ${sent} éxitos, ${failed} fallos`)

    // Asignamos los resultados directamente al objeto data que Payload guardará
    data.enviadoA = sent
    data.fallidos = failed
  } catch (error) {
    console.error('[Notificaciones] Error crítico en hook push:', error)
  }

  return data
}
