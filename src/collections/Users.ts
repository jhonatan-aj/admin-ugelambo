import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'especialista',
      label: 'Rol',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Especialista (Pedagógico)', value: 'especialista' },
        { label: 'RRHH', value: 'rrhh' },
        { label: 'Integridad', value: 'integridad' },
      ],
      admin: {
        description: 'Define los permisos de acceso del usuario',
      },
    },
  ],
}
