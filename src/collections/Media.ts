import type { CollectionConfig } from 'payload'
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Medios' },
  admin: {
    useAsTitle: 'alt',
    group: 'Contenido',
    description: 'Archivos multimedia almacenados en Cloudinary',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }: { data: any; req: any }) => {
        if (req.file) {
          const buffer = req.file.data
          const filename = req.file.name

          try {
            const result = await uploadToCloudinary(buffer, filename, 'ugel-admin/media')

            // Guardar información de Cloudinary en el documento
            // NO establecer filename, mimeType, filesize - Payload los maneja internamente
            return {
              ...data,
              url: result.url,
              cloudinaryPublicId: result.publicId,
              width: result.width,
              height: result.height,
            }
          } catch (error) {
            console.error('Error uploading to Cloudinary:', error)
            throw new Error('No se pudo subir la imagen a Cloudinary')
          }
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }: { doc: any }) => {
        if (doc.cloudinaryPublicId) {
          try {
            await deleteFromCloudinary(doc.cloudinaryPublicId)
          } catch (error) {
            console.error('Error deleting from Cloudinary:', error)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto Alternativo',
      admin: {
        description: 'Descripción de la imagen para accesibilidad',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL de Cloudinary',
      admin: {
        readOnly: true,
        description: 'URL de la imagen en Cloudinary (se genera automáticamente)',
      },
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      label: 'Public ID de Cloudinary',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'width',
      type: 'number',
      label: 'Ancho',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Alto',
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) => (doc?.url as string) || null,
    disableLocalStorage: true,
  },
}
