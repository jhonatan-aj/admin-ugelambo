import type { CollectionConfig } from 'payload'

export const NoticiasModal: CollectionConfig = {
  slug: 'noticias-modal',
  labels: { singular: 'Noticia Modal', plural: 'Noticias Modal' },
  admin: { 
    useAsTitle: 'titulo', 
    defaultColumns: ['titulo', 'activo', 'orden'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'rrhh',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'rrhh',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { 
      name: 'titulo', 
      type: 'text', 
      required: true, 
      label: 'Título/Alt de la imagen',
    },
    { 
      name: 'imagen', 
      type: 'upload', 
      relationTo: 'media', 
      required: true,
      label: 'Imagen del Modal',
    },
    { 
      name: 'activo', 
      type: 'checkbox', 
      defaultValue: true, 
      label: 'Mostrar en landing',
      admin: {
        description: 'Desmarcar para ocultar temporalmente sin eliminar',
      },
    },
    { 
      name: 'orden', 
      type: 'number', 
      defaultValue: 0,
      label: 'Orden de Aparición',
      admin: {
        description: 'Menor número = aparece primero',
      },
    },
  ],
}
