import type { CollectionConfig } from 'payload'
import { enviarNotificacionPush } from '../hooks/enviarNotificacionPush'

export const Notificaciones: CollectionConfig = {
  slug: 'notificaciones',
  labels: { singular: 'Notificación', plural: 'Notificaciones' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'mensaje', 'enviadoA', 'createdAt'],
    group: 'Contenido',
    description: 'Gestiona las notificaciones push enviadas al portal web',
  },
  hooks: {
    beforeChange: [enviarNotificacionPush],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título',
      defaultValue: 'UGEL Ambo',
    },
    {
      name: 'mensaje',
      type: 'textarea',
      required: true,
      label: 'Mensaje',
    },
    {
      name: 'enviadoA',
      type: 'number',
      label: 'Enviado a (suscriptores)',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Cantidad de suscriptores que recibieron la notificación',
      },
    },
    {
      name: 'fallidos',
      type: 'number',
      label: 'Fallidos',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
