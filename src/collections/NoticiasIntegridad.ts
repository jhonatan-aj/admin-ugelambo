import type { CollectionConfig } from 'payload'

export const NoticiasIntegridad: CollectionConfig = {
  slug: 'noticiaintegridads', // Debe coincidir con el nombre de colección MongoDB que usa el landing
  labels: { singular: 'Noticia Integridad', plural: 'Noticias Integridad' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'fecha', 'area', 'activo'],
    group: 'Contenido',
    description: 'Gestiona las noticias del área de Integridad y Transparencia',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'integridad',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'integridad',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título de la Noticia',
      admin: {
        description: 'Título que aparecerá en la tarjeta y página de detalle',
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
      label: 'Descripción',
      admin: {
        description:
          'Contenido completo de la noticia. En las tarjetas solo se mostrará un extracto.',
      },
    },
    {
      name: 'fecha',
      type: 'date',
      required: true,
      label: 'Fecha de Publicación',
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      admin: {
        description: 'Sube una imagen para la noticia (se almacenará en Cloudinary)',
      },
    },
    {
      name: 'area',
      type: 'select',
      required: true,
      label: 'Área',
      defaultValue: 'integridad',
      options: [
        { label: 'Integridad', value: 'integridad' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        description: 'Área a la que pertenece esta noticia',
      },
    },
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publicado',
      admin: {
        description: 'Desmarcar para ocultar la noticia sin eliminarla',
        position: 'sidebar',
      },
    },
  ],
}
