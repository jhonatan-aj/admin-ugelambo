import type { CollectionConfig } from 'payload'

export const Especialistas: CollectionConfig = {
  slug: 'especialistas',
  labels: { singular: 'Especialista', plural: 'Especialistas' },
  admin: { 
    useAsTitle: 'nombre', 
    defaultColumns: ['nombre', 'nivel'],
    group: 'Gestión Pedagógica',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'especialista',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'especialista',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { 
      name: 'nombre', 
      type: 'text', 
      required: true,
      label: 'Nombre del Especialista',
    },
    {
      name: 'nivel', 
      type: 'select', 
      required: true,
      label: 'Nivel Educativo',
      options: [
        { label: 'Inicial', value: 'inicial' },
        { label: 'Primaria', value: 'primaria' },
        { label: 'Secundaria', value: 'secundaria' },
        { label: 'CEBA', value: 'ceba' },
        { label: 'PRONOI', value: 'pronoi' },
      ],
    },
    { 
      name: 'foto', 
      type: 'upload', 
      relationTo: 'media',
      label: 'Foto',
    },
    { 
      name: 'presentacion', 
      type: 'textarea',
      label: 'Presentación',
    },
    {
      name: 'colegios', 
      type: 'array', 
      label: 'Colegios Asignados',
      fields: [
        { 
          name: 'ubicacion', 
          type: 'text', 
          required: true,
          label: 'Ubicación',
        },
        { 
          name: 'colegio', 
          type: 'text', 
          required: true,
          label: 'Nombre del Colegio',
        },
        { 
          name: 'nivel_modalidad', 
          type: 'text', 
          required: true,
          label: 'Nivel/Modalidad',
        },
      ],
    },
  ],
}
