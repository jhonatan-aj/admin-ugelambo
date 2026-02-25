import { NextRequest, NextResponse } from 'next/server'
import webpush from 'web-push'
import mongoose from 'mongoose'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'

const pushSubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
})

const PushSubscriptionModel =
  mongoose.models.push_subscriptions || mongoose.model('push_subscriptions', pushSubscriptionSchema)

let vapidConfigured = false

function ensureVapidConfigured() {
  if (vapidConfigured) return
  const publicKey = process.env.VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY
  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys no configuradas')
  }
  webpush.setVapidDetails('mailto:soporteugelamboo@gmail.com', publicKey, privateKey)
  vapidConfigured = true
}

export async function POST(request: NextRequest) {
  try {
    ensureVapidConfigured()
    const payload = await getPayload({ config })
    const headersList = await getHeaders()
    const { user } = await payload.auth({ headers: headersList })

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { title, body } = await request.json()

    if (!title || !body) {
      return NextResponse.json({ error: 'Se requiere title y body' }, { status: 400 })
    }

    const subscriptions = await PushSubscriptionModel.find({})

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { message: 'No hay suscriptores', sent: 0, failed: 0 },
        { status: 200 },
      )
    }

    const pushPayload = JSON.stringify({ title, body, icon: '/icon-192x192.png' })

    let sent = 0
    let failed = 0
    const expiredEndpoints: string[] = []

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } },
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
      await PushSubscriptionModel.deleteMany({ endpoint: { $in: expiredEndpoints } })
    }

    return NextResponse.json({
      message: 'Notificaciones enviadas',
      sent,
      failed,
      expired: expiredEndpoints.length,
      totalSubscribers: subscriptions.length,
    })
  } catch (error) {
    console.error('Error en API de notificaciones:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET(_request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const headersList = await getHeaders()
    const { user } = await payload.auth({ headers: headersList })

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const count = await PushSubscriptionModel.countDocuments()
    return NextResponse.json({ subscribers: count })
  } catch (error) {
    console.error('Error consultando suscriptores:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
