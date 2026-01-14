import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { es } from '@payloadcms/translations/languages/es'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Personal } from './collections/Personal'
import { Especialistas } from './collections/Especialistas'
import { Fortalecimiento } from './collections/Fortalecimiento'
import { NoticiasModal } from './collections/NoticiasModal'
import { NoticiasIntegridad } from './collections/NoticiasIntegridad'
import { Convocatorias } from './collections/Convocatorias'
import { Tutoriales } from './collections/Tutoriales'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - UGEL Ambo',
      description: 'Panel de Administración - Unidad de Gestión Educativa Local de Ambo',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/icon-ugel.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: './components/Logo#Logo',
        Icon: './components/Icon#Icon',
      },
    },
  },
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  collections: [
    Users,
    Media,
    Personal,
    Especialistas,
    Fortalecimiento,
    NoticiasModal,
    NoticiasIntegridad,
    Convocatorias,
    Tutoriales,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
