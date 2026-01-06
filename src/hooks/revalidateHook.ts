import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const REVALIDATE_TOKEN = process.env.REVALIDATE_SECRET || 'ugel-ambo-revalidate-2024'

async function triggerRevalidation(collection: string): Promise<void> {
  try {
    const response = await fetch(`${FRONTEND_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify({ collection }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log(`[Revalidate] Triggered for ${collection}:`, data.paths)
    } else {
      console.error(`[Revalidate] Failed for ${collection}:`, response.status)
    }
  } catch (error) {
    // No lanzar error para no interrumpir el flujo de Payload
    console.error(`[Revalidate] Error triggering revalidation for ${collection}:`, error)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  collection,
  doc,
  operation,
}) => {
  // Solo revalidar en producción o si está configurado
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_REVALIDATION === 'true') {
    console.log(`[Revalidate] ${operation} on ${collection.slug}: ${doc.id || doc._id}`)
    await triggerRevalidation(collection.slug)
  }
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ collection, doc }) => {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_REVALIDATION === 'true') {
    console.log(`[Revalidate] delete on ${collection.slug}: ${doc.id || doc._id}`)
    await triggerRevalidation(collection.slug)
  }
  return doc
}
