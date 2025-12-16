import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '../../../../lib/cloudinary'

// URL base del landing - usar localhost para desarrollo
const LANDING_BASE_URL = process.env.LANDING_URL || 'http://localhost:3000'

// Mapeo de Personal con sus rutas de imagen
const personalData = [
  // DIRECCIÓN (7 personas)
  {
    nombre: 'Dr. Imelda Rios Castillo',
    cargo: 'Directora de la UGEL Ambo',
    area: 'direccion' as const,
    orden: 1,
    imagePath: '/Directorio/direccion/Imelda-Rios.png',
  },
  {
    nombre: 'Jenny Esther Camiloaga Espinoza',
    cargo: 'Especialista Administrativo I',
    area: 'direccion' as const,
    orden: 2,
    imagePath: '/Directorio/direccion/Jenny-Esther.png',
  },
  {
    nombre: 'Karen Jackeline Suarez Lopez',
    cargo: 'Técnico Administrativo I',
    area: 'direccion' as const,
    orden: 3,
    imagePath: '/Directorio/direccion/Karen-Jackeline.png',
  },
  {
    nombre: 'Emperatriz Savia Cristobal Ortiz',
    cargo: 'Imagen Institucional',
    area: 'direccion' as const,
    orden: 4,
    imagePath: '/Directorio/direccion/Emperatriz-Savia.png',
  },
  {
    nombre: 'Cesar Luis Ramos Rojas',
    cargo: 'Asesor Jurídico',
    area: 'direccion' as const,
    orden: 5,
    imagePath: '/Directorio/direccion/Cesar-Luis.png',
  },
  {
    nombre: 'Carbajal Tafur Maria Mercedes',
    cargo: 'Secretaria de Dirección',
    area: 'direccion' as const,
    orden: 6,
    imagePath: '/Directorio/direccion/Carbajal-Tafur.jpg',
  },
  {
    nombre: 'Luis Fernando Bejarano Asca',
    cargo: 'Apoyo en Soporte Informático',
    area: 'direccion' as const,
    orden: 7,
    imagePath: '/Directorio/rrhh/Luis-Fernando.jpeg',
  },

  // RRHH (15 personas)
  {
    nombre: 'Yudith Venturo Bravo',
    cargo: 'Jefe de la Unidad de Gestión',
    area: 'rrhh' as const,
    orden: 1,
    imagePath: '/Directorio/rrhh/Yudith-Venturo.png',
  },
  {
    nombre: 'Ethel German Camacho Robles',
    cargo: 'Técnico Administrativo I - Escalafón y Nexus',
    area: 'rrhh' as const,
    orden: 2,
    imagePath: '/Directorio/rrhh/Ethel-German.png',
  },
  {
    nombre: 'Diógenes Alberto Tello Montes',
    cargo: 'Técnico - Constancia de Pagos y Licencias',
    area: 'rrhh' as const,
    orden: 3,
    imagePath: '/Directorio/rrhh/Diogenes-Alberto.png',
  },
  {
    nombre: 'Susan Sherly Barrantes Villanueva',
    cargo: 'Asistente Administrativo - Planillas',
    area: 'rrhh' as const,
    orden: 4,
    imagePath: '/Directorio/rrhh/Susan-Sherly.png',
  },
  {
    nombre: 'Paul Anthony Figueroa Bravo',
    cargo: 'Abogado II - Recursos Humanos',
    area: 'rrhh' as const,
    orden: 5,
    imagePath: '/Directorio/rrhh/Paul-Anthony.png',
  },
  {
    nombre: 'Carmen del Pilar Bustamante Panduro',
    cargo: 'Abogado - Especialista en Procesos Administrativos',
    area: 'rrhh' as const,
    orden: 6,
    imagePath: '/Directorio/rrhh/Carmen-del-Pilar.png',
  },
  {
    nombre: 'Luz Monica Hilario Ases',
    cargo: 'Especialista en Escalafón',
    area: 'rrhh' as const,
    orden: 7,
    imagePath: '/Directorio/rrhh/Luz-Monica.jpg',
  },
  {
    nombre: 'Victor Hugo Valderrama Bustamante',
    cargo: 'Especialista - Planillas',
    area: 'rrhh' as const,
    orden: 8,
    imagePath: '/Directorio/rrhh/Victor-Hugo.png',
  },
  {
    nombre: 'Nicasio Richard Julca Rojas',
    cargo: 'Apoyo en PAD',
    area: 'rrhh' as const,
    orden: 9,
    imagePath: '/Directorio/rrhh/Nicasio-Richard.png',
  },
  {
    nombre: 'Shyrle Celestino Paredes',
    cargo: 'Apoyo en Escalafón y Nexus',
    area: 'rrhh' as const,
    orden: 10,
    imagePath: '/Directorio/rrhh/Shyrle-Celestino.jpg',
  },
  {
    nombre: 'Hermes Gabriel Abanto Maldonado',
    cargo: 'Apoyo en Recursos Humanos',
    area: 'rrhh' as const,
    orden: 11,
    imagePath: '/Directorio/rrhh/Hermes-Gabriel.png',
  },
  {
    nombre: 'Maura Oriuela Tadeo',
    cargo: 'Apoyo en Recursos Humanos',
    area: 'rrhh' as const,
    orden: 12,
    imagePath: '/Directorio/rrhh/Maura-Oriuela.png',
  },
  {
    nombre: 'José German Sanchez Bravo',
    cargo: 'Asistente Administrativo',
    area: 'rrhh' as const,
    orden: 13,
    imagePath: '/Directorio/rrhh/Jose-German.png',
  },
  {
    nombre: 'Cynthia Katherine Espinoza Simeon',
    cargo: 'Asistente Administrativo',
    area: 'rrhh' as const,
    orden: 14,
    imagePath: '/Directorio/rrhh/Cynthia-Katherine.png',
  },
  {
    nombre: 'Lesly Flor Cardenas Chamorro',
    cargo: 'Asistente Administrativo',
    area: 'rrhh' as const,
    orden: 15,
    imagePath: '/Directorio/rrhh/Lesly-Flor.jpg',
  },

  // GESTIÓN ADMINISTRATIVA (14 personas)
  {
    nombre: 'Wilder Yonel Rojas Bardales',
    cargo: 'Jefe de la Unidad de Gestión Administrativa',
    area: 'aga' as const,
    orden: 1,
    imagePath: '/Directorio/aga/Wilder-Yonel.png',
  },
  {
    nombre: 'María Eugenia Maynicta León',
    cargo: 'Secretaria de Dirección',
    area: 'aga' as const,
    orden: 2,
    imagePath: '/Directorio/aga/Maria-Eugenia.png',
  },
  {
    nombre: 'Alfredo Ostos Miraval',
    cargo: 'Analista de Abastecimientos',
    area: 'aga' as const,
    orden: 3,
    imagePath: '/Directorio/aga/Alfredo-Ostos.png',
  },
  {
    nombre: 'Angelica Janeth Fuster Quispe',
    cargo: 'Técnico - Patrimonio y Almacén',
    area: 'aga' as const,
    orden: 4,
    imagePath: '/Directorio/aga/Angelica-Janeth.png',
  },
  {
    nombre: 'Mery Maritza Palomino Chavez',
    cargo: 'Tesorero I',
    area: 'aga' as const,
    orden: 5,
    imagePath: '/Directorio/aga/Mery-Maritza.png',
  },
  {
    nombre: 'Edgardo Omar Minaya Davila',
    cargo: 'Especialista en Contabilidad',
    area: 'aga' as const,
    orden: 6,
    imagePath: '/Directorio/aga/Edgardo-Omar.png',
  },
  {
    nombre: 'Anderson Henry Ponce Runco',
    cargo: 'Soporte Informático',
    area: 'aga' as const,
    orden: 7,
    imagePath: '/Directorio/aga/Anderson-Henry.png',
  },
  {
    nombre: 'Erik Diaz Chaucas',
    cargo: 'Chofer',
    area: 'aga' as const,
    orden: 8,
    imagePath: '/Directorio/aga/Erik-Diaz.png',
  },
  {
    nombre: 'William Martin Machaca Bravo',
    cargo: 'Personal de Servicio 2',
    area: 'aga' as const,
    orden: 9,
    imagePath: '/Directorio/aga/Williams-Martin.png',
  },
  {
    nombre: 'Gabriela Cyntya Ambrocio Celis',
    cargo: 'Especialista en Adquisiciones',
    area: 'aga' as const,
    orden: 10,
    imagePath: '/Directorio/aga/Gabriela-Cyntya.png',
  },
  {
    nombre: 'Jhonatan Anibal Julca Garcia',
    cargo: 'Soporte Informático II',
    area: 'aga' as const,
    orden: 11,
    imagePath: '/Directorio/aga/Jhonatan-Anibal.png',
  },
  {
    nombre: 'Anggie Haily Retis Falcon',
    cargo: 'Apoyo en Patrimonio',
    area: 'aga' as const,
    orden: 12,
    imagePath: '/Directorio/aga/Anggie-Haily.png',
  },
  {
    nombre: 'Maria Luisa Huerta Leandro',
    cargo: 'Apoyo en Abastecimiento',
    area: 'aga' as const,
    orden: 13,
    imagePath: '/Directorio/aga/Maria-Luisa.png',
  },
  {
    nombre: 'Vanessa Castro Figueroa',
    cargo: 'Apoyo en Patrimonio',
    area: 'aga' as const,
    orden: 14,
    imagePath: '/Directorio/aga/Vanessa-Castro.png',
  },

  // PLANEAMIENTO Y DESARROLLO (11 personas)
  {
    nombre: 'Rider Ortega Tucto',
    cargo: 'Jefe de Planeamiento y Desarrollo Institucional',
    area: 'agi' as const,
    orden: 1,
    imagePath: '/Directorio/agi/Rider-Ortega.png',
  },
  {
    nombre: 'José Luis Chávez Valerio',
    cargo: 'Secretario Técnico',
    area: 'agi' as const,
    orden: 2,
    imagePath: '/Directorio/agi/Jose-Luis.png',
  },
  {
    nombre: 'Yonatan Gustavo Tafur Rodriguez',
    cargo: 'Planificador Institucional',
    area: 'agi' as const,
    orden: 3,
    imagePath: '/Directorio/agi/Yonatan-Gustavo.jpeg',
  },
  {
    nombre: 'Maryori Mishel Leon Colqui',
    cargo: 'Especialista en PREVAED',
    area: 'agi' as const,
    orden: 4,
    imagePath: '/Directorio/agi/Maryori-Mishel.jpeg',
  },
  {
    nombre: 'Antonio Percy Chavez Alcantara',
    cargo: 'Vigilante de la UGEL',
    area: 'agi' as const,
    orden: 5,
    imagePath: '/Directorio/agi/Antonio-Percy.png',
  },
  {
    nombre: 'Delmer Jmes Villareal Morales',
    cargo: 'Vigilante de la UGEL',
    area: 'agi' as const,
    orden: 6,
    imagePath: '/Directorio/agi/Delmer-Jmes.png',
  },
  {
    nombre: 'Irene Martel Condezo',
    cargo: 'Especialista de Finanzas',
    area: 'agi' as const,
    orden: 7,
    imagePath: '/Directorio/agi/Irene-Martel.png',
  },
  {
    nombre: 'Katherine Haydeé Osorio Celis',
    cargo: 'Técnico en SIAGIE y Estadistica',
    area: 'agi' as const,
    orden: 8,
    imagePath: '/Directorio/agi/Katherine-Haydee.png',
  },
  {
    nombre: 'Mayck Christian Bardon Dionicio',
    cargo: 'Especialista en Infraestructura',
    area: 'agi' as const,
    orden: 9,
    imagePath: '/Directorio/agi/Mayck-Christian.png',
  },
  {
    nombre: 'Indira Venecia Davila del Valle',
    cargo: 'Apoyo en Infraestructura',
    area: 'agi' as const,
    orden: 10,
    imagePath: '/Directorio/agi/Indira-Venecia.png',
  },
  {
    nombre: 'Ruth Gieze Zuñiga Quinto',
    cargo: 'Apoyo en Infraestructura',
    area: 'agi' as const,
    orden: 11,
    imagePath: '/Directorio/agi/Ruth-Gieze.png',
  },

  // GESTIÓN PEDAGÓGICA (19 personas)
  {
    nombre: 'Jaly H. Mallqui Durand',
    cargo: 'Jefe del Área de Gestión Pedagógica',
    area: 'agp' as const,
    orden: 1,
    imagePath: '/Directorio/agp/Jaly-H.png',
  },
  {
    nombre: 'Nelida del Pilar Albornoz Julca',
    cargo: 'Secretaria I - AGP',
    area: 'agp' as const,
    orden: 2,
    imagePath: '/Directorio/agp/Nelida-del-Pilar.jpg',
  },
  {
    nombre: 'Maglorio Ortiz Rojas',
    cargo: 'Especialista Ed. Inicial',
    area: 'agp' as const,
    orden: 3,
    imagePath: '/Directorio/agp/Maglorio-Ortiz.jpeg',
  },
  {
    nombre: 'Lyz Sara Matos Cristobal',
    cargo: 'Especialista Ed. Inicial',
    area: 'agp' as const,
    orden: 4,
    imagePath: '/Directorio/agp/Lyz-Sara.png',
  },
  {
    nombre: 'Maria Elena Meza Fernandez',
    cargo: 'Especialista Ed. Inicial',
    area: 'agp' as const,
    orden: 5,
    imagePath: '/Directorio/agp/Maria-Elena.png',
  },
  {
    nombre: 'Amilda Lopez Espiritu',
    cargo: 'Especialista Ed. Inicial',
    area: 'agp' as const,
    orden: 6,
    imagePath: '/Directorio/agp/Almida-Lopez.png',
  },
  {
    nombre: 'Esther Delia Diaz Acuña',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp' as const,
    orden: 7,
    imagePath: '/Directorio/agp/Esther-Delia.jpg',
  },
  {
    nombre: 'Marcos Antonio Arqueño Garay',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp' as const,
    orden: 8,
    imagePath: '/Directorio/agp/Marcos-Antonio-Arqueño.png',
  },
  {
    nombre: 'Noel Grover Alvarez Aldava',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp' as const,
    orden: 9,
    imagePath: '/Directorio/agp/Noel-Grover.png',
  },
  {
    nombre: 'Marco Antonio Paredes Munguia',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp' as const,
    orden: 10,
    imagePath: '/Directorio/agp/Marco-Antonio-Paredes.png',
  },
  {
    nombre: 'Carmen Paulina Gomez Godoy',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp' as const,
    orden: 11,
    imagePath: '/Directorio/agp/Carmen-Paulina.png',
  },
  {
    nombre: 'Walter Máximo Rivera Tadeo',
    cargo: 'Especialista Ed. Primaria EIB',
    area: 'agp' as const,
    orden: 12,
    imagePath: '/Directorio/agp/Walter-Maximo.png',
  },
  {
    nombre: 'Julio Cesar Vicencio Romero',
    cargo: 'Especialista Ed. Secundaria CTA',
    area: 'agp' as const,
    orden: 13,
    imagePath: '/Directorio/agp/Julio-Cesar.png',
  },
  {
    nombre: 'Ramon Giovanni Figueredo Oneeglio',
    cargo: 'Especialista Ed. Secundaria Matemática',
    area: 'agp' as const,
    orden: 14,
    imagePath: '/Directorio/agp/Ramon-Giovanni.png',
  },
  {
    nombre: 'Victor Raul Albornoz Flores',
    cargo: 'Especialista Ed. Secundaria Comunicación',
    area: 'agp' as const,
    orden: 15,
    imagePath: '/Directorio/agp/Victor-Raul.png',
  },
  {
    nombre: 'Beatriz Jaramillo Coz',
    cargo: 'Coordinadora de Religión',
    area: 'agp' as const,
    orden: 16,
    imagePath: '/Directorio/agp/Beatriz-Jaramillo.png',
  },
  {
    nombre: 'Paolo Roberto Zevallos Leon',
    cargo: 'Especialista en Convivencia Escolar',
    area: 'agp' as const,
    orden: 17,
    imagePath: '/Directorio/agp/Paolo-Roberto.png',
  },
  {
    nombre: 'Yasmin Beatriz Salvador Saldivar',
    cargo: 'Profesional II Convivencia Escolar',
    area: 'agp' as const,
    orden: 18,
    imagePath: '/Directorio/agp/Yasmin-Beatriz.png',
  },
  {
    nombre: 'Meliza Mercedes Verde Zevallos',
    cargo: 'Profesional III Convivencia Escolar',
    area: 'agp' as const,
    orden: 19,
    imagePath: '/Directorio/agp/Meliza-Mercedes.png',
  },
]

// Función para descargar imagen desde URL y convertir a Buffer
async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    console.log(`Downloading image from: ${url}`)
    const response = await fetch(url)
    console.log(`Response status: ${response.status} for ${url}`)
    if (!response.ok) {
      console.error(`Failed to download image: ${url} - ${response.status} ${response.statusText}`)
      return null
    }
    const arrayBuffer = await response.arrayBuffer()
    console.log(`Downloaded ${arrayBuffer.byteLength} bytes from ${url}`)
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error(`Error downloading image: ${url}`, error)
    return null
  }
}

// Función para subir imagen y crear documento Media
async function uploadAndCreateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imagePath: string,
  altText: string,
): Promise<string | null> {
  const imageUrl = `${LANDING_BASE_URL}${imagePath}`
  console.log(`Processing image: ${imageUrl}`)
  const buffer = await downloadImage(imageUrl)

  if (!buffer) {
    console.log(`Skipping image upload for: ${imagePath} - no buffer received`)
    return null
  }

  const filename = imagePath.split('/').pop() || 'image.png'
  console.log(`Uploading ${filename} to Cloudinary...`)

  try {
    // Subir a Cloudinary
    const cloudinaryResult = await uploadToCloudinary(buffer, filename, 'ugel-admin/personal')
    console.log(`Cloudinary upload success: ${cloudinaryResult.url}`)

    // Crear documento Media en Payload
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: altText,
        url: cloudinaryResult.url,
        cloudinaryPublicId: cloudinaryResult.publicId,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        mimeType: `image/${cloudinaryResult.format}`,
        filesize: buffer.length,
        filename: filename,
      },
    })

    console.log(`Media document created: ${mediaDoc.id}`)
    return mediaDoc.id
  } catch (error) {
    console.error(`Error uploading image to Cloudinary: ${imagePath}`, error)
    return null
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })

    let personalCount = 0
    let mediaCount = 0
    const errors: string[] = []

    console.log('Starting seed with images...')
    console.log(`Base URL: ${LANDING_BASE_URL}`)

    // Insertar Personal con imágenes
    for (const persona of personalData) {
      try {
        // Subir imagen y crear Media
        const mediaId = await uploadAndCreateMedia(
          payload,
          persona.imagePath,
          `Foto de ${persona.nombre}`,
        )

        if (mediaId) {
          mediaCount++
        }

        // Crear documento Personal
        await payload.create({
          collection: 'personal',
          data: {
            nombre: persona.nombre,
            cargo: persona.cargo,
            area: persona.area,
            orden: persona.orden,
            foto: mediaId || undefined,
          },
        })
        personalCount++
        console.log(`Created: ${persona.nombre} (${persona.area})`)
      } catch (error) {
        const errorMsg = `Error creating ${persona.nombre}: ${error instanceof Error ? error.message : 'Unknown error'}`
        console.error(errorMsg)
        errors.push(errorMsg)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Datos de personal sembrados correctamente',
      stats: {
        personalCreated: personalCount,
        mediaUploaded: mediaCount,
        totalExpected: personalData.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error('Error seeding data:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}
