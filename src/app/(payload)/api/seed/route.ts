import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// Datos de Personal por Área
const personalData = [
  // DIRECCIÓN (7 personas)
  {
    nombre: 'Dr. Imelda Rios Castillo',
    cargo: 'Directora de la UGEL Ambo',
    area: 'direccion',
    orden: 1,
  },
  {
    nombre: 'Jenny Esther Camiloaga Espinoza',
    cargo: 'Especialista Administrativo I',
    area: 'direccion',
    orden: 2,
  },
  {
    nombre: 'Karen Jackeline Suarez Lopez',
    cargo: 'Técnico Administrativo I',
    area: 'direccion',
    orden: 3,
  },
  {
    nombre: 'Emperatriz Savia Cristobal Ortiz',
    cargo: 'Imagen Institucional',
    area: 'direccion',
    orden: 4,
  },
  { nombre: 'Cesar Luis Ramos Rojas', cargo: 'Asesor Jurídico', area: 'direccion', orden: 5 },
  {
    nombre: 'Carbajal Tafur Maria Mercedes',
    cargo: 'Secretaria de Dirección',
    area: 'direccion',
    orden: 6,
  },
  {
    nombre: 'Luis Fernando Bejarano Asca',
    cargo: 'Apoyo en Soporte Informático',
    area: 'direccion',
    orden: 7,
  },

  // RRHH (15 personas)
  { nombre: 'Yudith Venturo Bravo', cargo: 'Jefe de la Unidad de Gestión', area: 'rrhh', orden: 1 },
  {
    nombre: 'Ethel German Camacho Robles',
    cargo: 'Técnico Administrativo I - Escalafón y Nexus',
    area: 'rrhh',
    orden: 2,
  },
  {
    nombre: 'Diógenes Alberto Tello Montes',
    cargo: 'Técnico - Constancia de Pagos y Licencias',
    area: 'rrhh',
    orden: 3,
  },
  {
    nombre: 'Susan Sherly Barrantes Villanueva',
    cargo: 'Asistente Administrativo - Planillas',
    area: 'rrhh',
    orden: 4,
  },
  {
    nombre: 'Paul Anthony Figueroa Bravo',
    cargo: 'Abogado II - Recursos Humanos',
    area: 'rrhh',
    orden: 5,
  },
  {
    nombre: 'Carmen del Pilar Bustamante Panduro',
    cargo: 'Abogado - Especialista en Procesos Administrativos',
    area: 'rrhh',
    orden: 6,
  },
  { nombre: 'Luz Monica Hilario Ases', cargo: 'Especialista en Escalafón', area: 'rrhh', orden: 7 },
  {
    nombre: 'Victor Hugo Valderrama Bustamante',
    cargo: 'Especialista - Planillas',
    area: 'rrhh',
    orden: 8,
  },
  { nombre: 'Nicasio Richard Julca Rojas', cargo: 'Apoyo en PAD', area: 'rrhh', orden: 9 },
  {
    nombre: 'Shyrle Celestino Paredes',
    cargo: 'Apoyo en Escalafón y Nexus',
    area: 'rrhh',
    orden: 10,
  },
  {
    nombre: 'Hermes Gabriel Abanto Maldonado',
    cargo: 'Apoyo en Recursos Humanos',
    area: 'rrhh',
    orden: 11,
  },
  { nombre: 'Maura Oriuela Tadeo', cargo: 'Apoyo en Recursos Humanos', area: 'rrhh', orden: 12 },
  {
    nombre: 'José German Sanchez Bravo',
    cargo: 'Asistente Administrativo',
    area: 'rrhh',
    orden: 13,
  },
  {
    nombre: 'Cynthia Katherine Espinoza Simeon',
    cargo: 'Asistente Administrativo',
    area: 'rrhh',
    orden: 14,
  },
  {
    nombre: 'Lesly Flor Cardenas Chamarro',
    cargo: 'Asistente Administrativo',
    area: 'rrhh',
    orden: 15,
  },

  // GESTIÓN ADMINISTRATIVA (14 personas)
  {
    nombre: 'Wilder Yonel Rojas Bardales',
    cargo: 'Jefe de la Unidad de Gestión Administrativa',
    area: 'aga',
    orden: 1,
  },
  {
    nombre: 'María Eugenia Maynicta León',
    cargo: 'Secretaria de Dirección',
    area: 'aga',
    orden: 2,
  },
  { nombre: 'Alfredo Ostos Miraval', cargo: 'Analista de Abastecimientos', area: 'aga', orden: 3 },
  {
    nombre: 'Angelica Janeth Fuster Quispe',
    cargo: 'Técnico - Patrimonio y Almacén',
    area: 'aga',
    orden: 4,
  },
  { nombre: 'Mery Maritza Palomino Chavez', cargo: 'Tesorero I', area: 'aga', orden: 5 },
  {
    nombre: 'Edgardo Omar Minaya Davila',
    cargo: 'Especialista en Contabilidad',
    area: 'aga',
    orden: 6,
  },
  { nombre: 'Anderson Henry Ponce Runco', cargo: 'Soporte Informático', area: 'aga', orden: 7 },
  { nombre: 'Erik Diaz Chaucas', cargo: 'Chofer', area: 'aga', orden: 8 },
  {
    nombre: 'William Martin Machaca Bravo',
    cargo: 'Personal de Servicio 2',
    area: 'aga',
    orden: 9,
  },
  {
    nombre: 'Gabriela Cyntya Ambrocio Celis',
    cargo: 'Especialista en Adquisiciones',
    area: 'aga',
    orden: 10,
  },
  {
    nombre: 'Jhonatan Anibal Julca Garcia',
    cargo: 'Soporte Informático II',
    area: 'aga',
    orden: 11,
  },
  { nombre: 'Anggie Haily Retis Falcon', cargo: 'Apoyo en Patrimonio', area: 'aga', orden: 12 },
  {
    nombre: 'Maria Luisa Huerta Leandro',
    cargo: 'Apoyo en Abastecimiento',
    area: 'aga',
    orden: 13,
  },
  { nombre: 'Vanessa Castro Figueroa', cargo: 'Apoyo en Patrimonio', area: 'aga', orden: 14 },

  // PLANEAMIENTO Y DESARROLLO (11 personas)
  {
    nombre: 'Rider Ortega Tucto',
    cargo: 'Jefe de Planeamiento y Desarrollo Institucional',
    area: 'agi',
    orden: 1,
  },
  { nombre: 'José Luis Chávez Valerio', cargo: 'Secretario Técnico', area: 'agi', orden: 2 },
  {
    nombre: 'Yonatan Gustavo Tafur Rodriguez',
    cargo: 'Planificador Institucional',
    area: 'agi',
    orden: 3,
  },
  { nombre: 'Maryori Mishel Leon Colqui', cargo: 'Especialista en PREVAED', area: 'agi', orden: 4 },
  {
    nombre: 'Antonio Percy Chavez Alcantara',
    cargo: 'Vigilante de la UGEL',
    area: 'agi',
    orden: 5,
  },
  { nombre: 'Delmer Jmes Villareal Morales', cargo: 'Vigilante de la UGEL', area: 'agi', orden: 6 },
  { nombre: 'Irene Martel Condezo', cargo: 'Especialista de Finanzas', area: 'agi', orden: 7 },
  {
    nombre: 'Katherine Haydeé Osorio Celis',
    cargo: 'Técnico en SIAGIE y Estadistica',
    area: 'agi',
    orden: 8,
  },
  {
    nombre: 'Mayck Christian Bardon Dionicio',
    cargo: 'Especialista en Infraestructura',
    area: 'agi',
    orden: 9,
  },
  {
    nombre: 'Indira Venecia Davila del Valle',
    cargo: 'Apoyo en Infraestructura',
    area: 'agi',
    orden: 10,
  },
  { nombre: 'Ruth Gieze Zuñiga Quinto', cargo: 'Apoyo en Infraestructura', area: 'agi', orden: 11 },

  // GESTIÓN PEDAGÓGICA (19 personas)
  {
    nombre: 'Jaly H. Mallqui Durand',
    cargo: 'Jefe del Área de Gestión Pedagógica',
    area: 'agp',
    orden: 1,
  },
  { nombre: 'Nelida del Pilar Albornoz Julca', cargo: 'Secretaria I - AGP', area: 'agp', orden: 2 },
  { nombre: 'Maglorio Ortiz Rojas', cargo: 'Especialista Ed. Inicial', area: 'agp', orden: 3 },
  { nombre: 'Lyz Sara Matos Cristobal', cargo: 'Especialista Ed. Inicial', area: 'agp', orden: 4 },
  {
    nombre: 'Maria Elena Meza Fernandez',
    cargo: 'Especialista Ed. Inicial',
    area: 'agp',
    orden: 5,
  },
  { nombre: 'Amilda Lopez Espiritu', cargo: 'Especialista Ed. Inicial', area: 'agp', orden: 6 },
  { nombre: 'Esther Delia Diaz Acuña', cargo: 'Especialista Ed. Primaria', area: 'agp', orden: 7 },
  {
    nombre: 'Marcos Antonio Arqueño Garay',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp',
    orden: 8,
  },
  {
    nombre: 'Noel Grover Alvarez Aldava',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp',
    orden: 9,
  },
  {
    nombre: 'Marco Antonio Paredes Munguia',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp',
    orden: 10,
  },
  {
    nombre: 'Carmen Paulina Gomez Godoy',
    cargo: 'Especialista Ed. Primaria',
    area: 'agp',
    orden: 11,
  },
  {
    nombre: 'Walter Máximo Rivera Tadeo',
    cargo: 'Especialista Ed. Primaria EIB',
    area: 'agp',
    orden: 12,
  },
  {
    nombre: 'Julio Cesar Vicencio Romero',
    cargo: 'Especialista Ed. Secundaria CTA',
    area: 'agp',
    orden: 13,
  },
  {
    nombre: 'Ramon Giovanni Figueredo Oneeglio',
    cargo: 'Especialista Ed. Secundaria Matemática',
    area: 'agp',
    orden: 14,
  },
  {
    nombre: 'Victor Raul Albornoz Flores',
    cargo: 'Especialista Ed. Secundaria Comunicación',
    area: 'agp',
    orden: 15,
  },
  { nombre: 'Beatriz Jaramillo Coz', cargo: 'Coordinadora de Religión', area: 'agp', orden: 16 },
  {
    nombre: 'Paolo Roberto Zevallos Leon',
    cargo: 'Especialista en Convivencia Escolar',
    area: 'agp',
    orden: 17,
  },
  {
    nombre: 'Yasmin Beatriz Salvador Saldivar',
    cargo: 'Profesional II Convivencia Escolar',
    area: 'agp',
    orden: 18,
  },
  {
    nombre: 'Meliza Mercedes Verde Zevallos',
    cargo: 'Profesional III Convivencia Escolar',
    area: 'agp',
    orden: 19,
  },
] as const

// Datos de Especialistas con sus colegios asignados
const especialistasData = [
  // SECUNDARIA
  {
    nombre: 'Julio Cesar Vicencio Romero',
    nivel: 'secundaria',
    presentacion: 'Especialista comprometido con el desarrollo educativo del nivel secundario.',
    colegios: [
      { ubicacion: 'CHAUCHA', colegio: 'JORGE CHAVEZ DARTNELL', nivel_modalidad: 'Secundaria' },
      {
        ubicacion: 'SAN RAFAEL',
        colegio: 'VICTOR RAUL HAYA DE LA TORRE',
        nivel_modalidad: 'Secundaria',
      },
      {
        ubicacion: 'TOMAYQUICHUA',
        colegio: 'RICARDO FLORES GUTIERREZ',
        nivel_modalidad: 'Secundaria',
      },
      { ubicacion: 'HUARACALLA', colegio: '32137 ALBERT EINSTEIN', nivel_modalidad: 'Secundaria' },
      {
        ubicacion: 'SAN MIGUEL DE HUACAR',
        colegio: 'GREGORIO CARTAGENA',
        nivel_modalidad: 'Secundaria',
      },
      { ubicacion: 'ANGASMARCA', colegio: '32153 SIMON BOLIVAR', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'CAYNA', colegio: 'MANUEL GONZALES PRADA', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'ÑAUZA', colegio: '32149 SAN MARTIN DE PORRAS', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'AMBO', colegio: 'HESSEN', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'AMBO', colegio: 'GALILEO GALILEI COLLEGE', nivel_modalidad: 'Secundaria' },
    ],
  },
  {
    nombre: 'Marcos Antonio Arqueño Garay',
    nivel: 'secundaria',
    presentacion: 'Especialista comprometido con el desarrollo educativo del nivel secundario.',
    colegios: [
      {
        ubicacion: 'AYANCOCHA ALTA',
        colegio: '32732 JOSE GALVEZ BARRENECHEA',
        nivel_modalidad: 'Secundaria',
      },
    ],
  },
  {
    nombre: 'Ramon Giovanni Figueredo Oneeglio',
    nivel: 'secundaria',
    presentacion: 'Especialista comprometido con el desarrollo educativo del nivel secundario.',
    colegios: [
      { ubicacion: 'QUEROJAMANAN', colegio: '32192', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'MATIHUACA', colegio: 'CPED - 32161', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'COCHATAMA', colegio: 'RICARDO PALMA SORIANO', nivel_modalidad: 'Secundaria' },
      {
        ubicacion: 'HUANDOBAMBA',
        colegio: '32167 JOSE OLAYA BALANDRA',
        nivel_modalidad: 'Secundaria',
      },
      { ubicacion: 'CONCHAMARCA', colegio: 'SAN LORENZO', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'AMBO', colegio: 'CIENCIAS', nivel_modalidad: 'Secundaria' },
      {
        ubicacion: 'MARAYPATA',
        colegio: '32169 DAYSI YENY SOTO MORY',
        nivel_modalidad: 'Secundaria',
      },
      { ubicacion: 'AMBO', colegio: 'JULIO BENAVIDES SANGUINETTI', nivel_modalidad: 'Secundaria' },
    ],
  },
  {
    nombre: 'Victor Raul Albornoz Flores',
    nivel: 'secundaria',
    presentacion: 'Especialista comprometido con el desarrollo educativo del nivel secundario.',
    colegios: [
      { ubicacion: 'PUCASINIEGA', colegio: '32744', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'MOSCATUNA', colegio: '32181', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'ARMATANGA', colegio: '32202', nivel_modalidad: 'Secundaria' },
      {
        ubicacion: 'SAN JUAN DE YANAMACHAY',
        colegio: '32747 TUPAC AMARU II',
        nivel_modalidad: 'Secundaria',
      },
      {
        ubicacion: 'ACOCHACAN',
        colegio: '32733 CESAR MORALES NEGRETE',
        nivel_modalidad: 'Secundaria',
      },
      { ubicacion: 'COLPAS', colegio: 'SAN JUAN', nivel_modalidad: 'Secundaria' },
      { ubicacion: 'AMBO', colegio: 'JUAN JOSE CRESPO Y CASTILLO', nivel_modalidad: 'Secundaria' },
    ],
  },
  // CEBA
  {
    nombre: 'Ramon Giovanni Figueredo Oneeglio',
    nivel: 'ceba',
    presentacion: 'Especialista comprometido con la educación básica alternativa.',
    colegios: [
      { ubicacion: 'AMBO', colegio: 'SAN MARCOS', nivel_modalidad: 'Avanzado' },
      { ubicacion: 'SAN RAFAEL', colegio: 'SAN MARCOS', nivel_modalidad: 'Avanzado' },
      { ubicacion: 'AMBO', colegio: 'SAN MARCOS', nivel_modalidad: 'Inicial e Intermedio' },
      {
        ubicacion: 'AMBO',
        colegio: 'JUAN JOSE CRESPO Y CASTILLO',
        nivel_modalidad: 'Inicial e Intermedio',
      },
    ],
  },
  // PRONOI
  {
    nombre: 'Maglorio Ortiz Rojas',
    nivel: 'pronoi',
    presentacion: 'Especialista comprometido con la educación inicial no escolarizada.',
    colegios: [
      { ubicacion: 'UNGRO', colegio: 'ENCANTADORES', nivel_modalidad: 'PRONOI' },
      { ubicacion: 'QUEPAYACAN', colegio: 'LOS SOLDADITOS', nivel_modalidad: 'PRONOI' },
      { ubicacion: 'YAMOR', colegio: 'ESTRELLITAS FELICES', nivel_modalidad: 'PRONOI' },
      { ubicacion: 'PONGA', colegio: 'LOS TESORITOS', nivel_modalidad: 'PRONOI' },
      { ubicacion: 'CHACAPAMPA', colegio: '3ROCIO DEL AMANECER', nivel_modalidad: 'PRONOI' },
    ],
  },
] as const

export async function GET() {
  try {
    const payload = await getPayload({ config })

    let personalCount = 0
    let especialistasCount = 0

    // Insertar Personal
    for (const persona of personalData) {
      await payload.create({
        collection: 'personal',
        data: {
          nombre: persona.nombre,
          cargo: persona.cargo,
          area: persona.area,
          orden: persona.orden,
        },
      })
      personalCount++
    }

    // Insertar Especialistas
    for (const especialista of especialistasData) {
      await payload.create({
        collection: 'especialistas',
        data: {
          nombre: especialista.nombre,
          nivel: especialista.nivel,
          presentacion: especialista.presentacion,
          colegios: especialista.colegios.map((c) => ({
            ubicacion: c.ubicacion,
            colegio: c.colegio,
            nivel_modalidad: c.nivel_modalidad,
          })),
        },
      })
      especialistasCount++
    }

    return NextResponse.json({
      success: true,
      message: 'Datos sembrados correctamente',
      inserted: {
        personal: personalCount,
        especialistas: especialistasCount,
      },
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
