import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateHook'

export const Personal: CollectionConfig = {
  slug: 'personal',
  labels: { singular: 'Personal', plural: 'Personal' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'cargo', 'area', 'orden'],
    group: 'Contenido',
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'rrhh',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'rrhh',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      label: 'Nombre Completo',
    },
    {
      name: 'cargo',
      type: 'text',
      required: true,
      label: 'Cargo/Puesto',
    },
    {
      name: 'area',
      type: 'select',
      required: true,
      label: 'Área',
      options: [
        { label: 'Dirección', value: 'direccion' },
        { label: 'Recursos Humanos', value: 'rrhh' },
        { label: 'Gestión Administrativa', value: 'aga' },
        { label: 'Planeamiento y Desarrollo', value: 'agi' },
        { label: 'Gestión Pedagógica', value: 'agp' },
      ],
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
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
