import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateHook'

export const Tutoriales: CollectionConfig = {
  slug: 'tutoriales',
  labels: { singular: 'Tutorial', plural: 'Tutoriales' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'categoria', 'activo'],
    group: 'Contenido',
    description: 'Gestiona los videos tutoriales para docentes',
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'especialista',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'especialista',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título del Tutorial',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
      label: 'Descripción',
      admin: {
        description: 'Breve explicación de lo que trata el tutorial.',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      label: 'URL de YouTube',
      admin: {
        description:
          'Pega el enlace completo del video o el ID (ej: https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      },
    },
    {
      name: 'categoria',
      type: 'select',
      required: true,
      label: 'Categoría',
      defaultValue: 'docentes',
      options: [
        { label: 'Docentes', value: 'docentes' },
        { label: 'Directivos', value: 'directivos' },
        { label: 'Otros', value: 'otros' },
      ],
    },
    {
      name: 'orden',
      type: 'number',
      defaultValue: 0,
      label: 'Prioridad / Orden',
      admin: {
        description: 'Números menores aparecen primero.',
        position: 'sidebar',
      },
    },
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publicado',
      admin: {
        description: 'Desmarcar para ocultar el tutorial.',
        position: 'sidebar',
      },
    },
  ],
}
