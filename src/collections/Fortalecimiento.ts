import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateHook'

export const Fortalecimiento: CollectionConfig = {
  slug: 'fortalecimiento',
  labels: { singular: 'Material de Fortalecimiento', plural: 'Materiales de Fortalecimiento' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'area', 'tipo', 'fecha'],
    group: 'Gestión Pedagógica',
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
      label: 'Título',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'fecha',
      type: 'date',
      required: true,
      label: 'Fecha',
    },
    {
      name: 'area',
      type: 'select',
      required: true,
      label: 'Área/Nivel',
      options: [
        { label: 'Inicial', value: 'inicial' },
        { label: 'Primaria', value: 'primaria' },
        { label: 'Secundaria', value: 'secundaria' },
        { label: 'PRONOI', value: 'pronoi' },
        { label: 'CEBA', value: 'ceba' },
        { label: 'Convivencia Escolar', value: 'convivencia' },
      ],
    },
    {
      name: 'tipo',
      type: 'select',
      required: true,
      label: 'Tipo de Material',
      options: [
        { label: 'Curso', value: 'Curso' },
        { label: 'Charla', value: 'Charla' },
        { label: 'Taller', value: 'Taller' },
        { label: 'Capacitación', value: 'Capacitacion' },
      ],
    },
    {
      name: 'linkRecursos',
      type: 'text',
      label: 'Link de Recursos',
      admin: {
        description: 'URL de Google Drive u otro servicio de almacenamiento',
      },
    },
  ],
}
