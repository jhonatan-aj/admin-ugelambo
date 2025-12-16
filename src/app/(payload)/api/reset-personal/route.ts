import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// Limpia TODAS las colecciones de Personal y Media para un seed limpio
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Eliminar todo el personal existente
    const allPersonal = await payload.find({
      collection: 'personal',
      limit: 200,
    })

    let personalDeleted = 0
    for (const doc of allPersonal.docs) {
      await payload.delete({
        collection: 'personal',
        id: doc.id,
      })
      personalDeleted++
    }

    // Eliminar todos los media (esto también elimina de Cloudinary gracias al hook afterDelete)
    const allMedia = await payload.find({
      collection: 'media',
      limit: 200,
    })

    let mediaDeleted = 0
    for (const doc of allMedia.docs) {
      await payload.delete({
        collection: 'media',
        id: doc.id,
      })
      mediaDeleted++
    }

    console.log(`Deleted ${personalDeleted} personal records and ${mediaDeleted} media records`)

    return NextResponse.json({
      success: true,
      message: 'Colecciones limpiadas correctamente',
      deleted: {
        personal: personalDeleted,
        media: mediaDeleted,
      },
    })
  } catch (error) {
    console.error('Error resetting data:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}
