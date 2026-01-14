import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateHook'

export const Convocatorias: CollectionConfig = {
  slug: 'convocatorias',
  labels: { singular: 'Convocatoria', plural: 'Convocatorias' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'estado', 'fechaInicioInscripcion', 'fechaFinInscripcion', 'activo'],
    group: 'Contenido',
    description: 'Gestiona las convocatorias y oportunidades laborales',
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
      label: 'Nombre del Proceso',
      admin: {
        description:
          'Nombre completo de la convocatoria (ej: "CAS N° 001-2026 - Especialista en Educación")',
      },
    },
    {
      name: 'estado',
      type: 'select',
      required: true,
      label: 'Estado',
      defaultValue: 'vigente',
      options: [
        { label: 'Vigente', value: 'vigente' },
        { label: 'En Proceso', value: 'en_proceso' },
        { label: 'Concluido', value: 'concluido' },
        { label: 'Cancelado', value: 'cancelado' },
      ],
      admin: {
        description: 'Estado actual del proceso de convocatoria',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fechaInicioInscripcion',
          type: 'date',
          required: true,
          label: 'Inicio de Inscripción',
          admin: {
            width: '50%',
            date: {
              displayFormat: 'dd/MM/yyyy',
            },
          },
        },
        {
          name: 'fechaFinInscripcion',
          type: 'date',
          required: true,
          label: 'Fin de Inscripción',
          admin: {
            width: '50%',
            date: {
              displayFormat: 'dd/MM/yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'fechaResultados',
      type: 'date',
      label: 'Fecha de Resultados',
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'archivos',
      type: 'array',
      label: 'Documentos por Etapa',
      admin: {
        description: 'Agrupa los documentos según la etapa del proceso',
      },
      fields: [
        {
          name: 'etapa',
          type: 'select',
          required: true,
          label: 'Etapa',
          options: [
            { label: 'Bases e Inscripción', value: 'inscripcion' },
            { label: 'Evaluación Curricular', value: 'curricular' },
            { label: 'Entrevista Personal', value: 'entrevista' },
            { label: 'Resultados Finales', value: 'final' },
            { label: 'Otros', value: 'otros' },
          ],
        },
        {
          name: 'documentos',
          type: 'array',
          label: 'Documentos',
          fields: [
            {
              name: 'nombreArchivo',
              type: 'text',
              required: true,
              label: 'Nombre del Archivo',
              admin: {
                description: 'Nombre descriptivo del documento',
              },
            },
            {
              name: 'urlDrive',
              type: 'text',
              required: true,
              label: 'URL de Google Drive',
              admin: {
                description: 'Enlace de Google Drive al documento (asegúrate de que sea público)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publicado',
      admin: {
        description: 'Desmarcar para ocultar la convocatoria sin eliminarla',
        position: 'sidebar',
      },
    },
  ],
}
