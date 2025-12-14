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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
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
