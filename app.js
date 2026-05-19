/* ═══════════════════════════════════════════════════
   
   Arquitectura orientada a objetos  
   Planes de estudio por cuatrimestre 
   Apuntes: Biblioteca Virtual Google Drive UNAB
═══════════════════════════════════════════════════ */
'use strict';

const API_BASE    = 'http://localhost:5000';
const DRIVE_ROOT  = 'https://drive.google.com/drive/folders/15xbE60gHxsIoKsqkitjVvm2H0Ub5eTBy';

/* ══════════════════════════════════════════
   CLASE: Materia
══════════════════════════════════════════ */
class Materia {
  /**
   * @param {string} nombre
   * @param {string|null} driveUrl  - URL del apunte en Drive (null = sin apunte propio)
   */
  constructor(nombre, driveUrl = null) {
    this.nombre   = nombre;
    this.driveUrl = driveUrl || DRIVE_ROOT;  // si no hay apunte específico → carpeta raíz
  }
}

/* ══════════════════════════════════════════
   CLASE: Cuatrimestre
══════════════════════════════════════════ */
class Cuatrimestre {
  /**
   * @param {string}    label    - 'Cuatrimestre 1' | 'Cuatrimestre 2' | 'Anual / PPS'
   * @param {Materia[]} materias
   * @param {boolean}   anual    - true si ocupa ambas columnas
   */
  constructor(label, materias, anual = false) {
    this.label    = label;
    this.materias = materias;
    this.anual    = anual;
  }
}

/* ══════════════════════════════════════════
   CLASE: AnioAcademico
══════════════════════════════════════════ */
class AnioAcademico {
  /**
   * @param {string}          label        - 'Primer Año', 'Segundo Año'…
   * @param {Cuatrimestre[]}  cuatrimestres
   */
  constructor(label, cuatrimestres) {
    this.label         = label;
    this.cuatrimestres = cuatrimestres;
  }
}

/* ══════════════════════════════════════════
   CLASE: Carrera  — modelo de datos
══════════════════════════════════════════ */
class Carrera {
  /**
   * @param {number}           id
   * @param {string}           nombre
   * @param {'lic'|'tec'|'ccc'} tipo
   * @param {string}           pdfUrl
   * @param {AnioAcademico[]}  anios
   */
  constructor(id, nombre, tipo, pdfUrl, anios) {
    this.id     = id;
    this.nombre = nombre;
    this.tipo   = tipo;
    this.pdfUrl = pdfUrl;
    this.anios  = anios;
  }
  get tipoBadgeClass() {
    return { lic: 'tipo-lic', tec: 'tipo-tec', ccc: 'tipo-ccc' }[this.tipo];
  }
  get tipoLabel() {
    return { lic: 'Licenciatura', tec: 'Tecnicatura', ccc: 'CCC' }[this.tipo];
  }
}

/* ══════════════════════════════════════════
   DATOS — 15 carreras con plan por cuatrimestre
   Fuente: UNAB
══════════════════════════════════════════ */
const CARRERAS = [

  /* ── 1. Tec. PROGRAMACIÓN ──────────────────────────────────── */
  new Carrera(14, 'Tec. Programación', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/Programacion-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Ciencia, Tecnología e Innovación'),
        new Materia('Matemática General'),
        new Materia('Algoritmos y Estructuras de Datos'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Álgebra'),
        new Materia('Organización de computadoras'),
        new Materia('Inglés'),
        new Materia('Estructuras de Datos'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Inglés comunicacional'),
        new Materia('Probabilidad y Estadística'),
        new Materia('Programación Avanzada'),
        new Materia('Desarrollo de Software'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Visualización de la información'),
        new Materia('Gestión de Datos'),
        new Materia('Inferencia Estadística y reconocimiento de patrones'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Redes de computadoras'),
        new Materia('Conceptos y Paradigmas de Lenguajes de Programación'),
        new Materia('Sistemas Operativos'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Inteligencia Artificial'),
        new Materia('Metodologías Ágiles para el Desarrollo de Software'),
        new Materia('Programación Concurrente'),
        new Materia('Práctica Profesional Supervisada (PPS)'),
      ]),
    ]),
  ]),

  /* ── 2. Tec. CIENCIAS DE DATOS ────────────────────────────── */
  new Carrera(9, 'Tec. Ciencias de Datos', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/TEC.-UNIV.-CIENCIAS-DE-DATOS.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Ciencia, Tecnología e Innovación'),
        new Materia('Matemática General'),
        new Materia('Herramientas computacionales'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Introducción a la programación'),
        new Materia('Análisis matemático I'),
        new Materia('Lógica'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Gestión de datos'),
        new Materia('Visualización de la información'),
        new Materia('Inglés'),
        new Materia('Probabilidad y Estadística'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Algoritmos y estructuras de datos'),
        new Materia('Recolección de Datos y Análisis Primario de la Inf.'),
        new Materia('Inferencia estadística y reconocimiento de patrones'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Análisis multivariado'),
        new Materia('Programación Avanzada'),
        new Materia('Inteligencia Artificial'),
        new Materia('Modelado y Simulación'),
      ], false),
    ]),
  ]),

  /* ── 3. Tec. GESTIÓN DE LAS ORGANIZACIONES ─────────────────── */
  new Carrera(13, 'Tec. Gestión de las Organizaciones', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/GESTION-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Taller de Ciencia, Tecnología y Sociedad'),
        new Materia('Inglés'),
        new Materia('Comunicación institucional'),
        new Materia('Sistemas contables I'),
        new Materia('Matemática'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Economía'),
        new Materia('Administración'),
        new Materia('Problemáticas Socio Contemporáneas'),
        new Materia('Teoría y comportamiento organizacional'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Sociología de las organizaciones'),
        new Materia('Informática'),
        new Materia('Sistemas contables II'),
        new Materia('Gestión de la producción'),
        new Materia('Estadística'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Gestión de cooperativas'),
        new Materia('Gestión de talento humano y relaciones laborales'),
        new Materia('Gestión de costos'),
        new Materia('Gestión de la comercialización e investigación comercial'),
        new Materia('Taller y práctica profesionalizante'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Legislación comercial y tributaria'),
        new Materia('Estrategia empresarial'),
        new Materia('Sistemas de información para la gestión de las organizaciones'),
        new Materia('Práctica supervisada (1.° cuatrimestre — asignatura anual)'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Higiene, Seguridad y Gestión ambiental'),
        new Materia('Evaluación y administración de proyecto'),
        new Materia('Control de gestión'),
        new Materia('Práctica supervisada (2.° cuatrimestre — asignatura anual)'),
      ]),
    ]),
  ]),

  /* ── 4. Lic. ADMINISTRACIÓN ────────────────────────────────── */
  new Carrera(2, 'Lic. Administración', 'lic',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/LIC-Administracion-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Taller de Ciencia, Tecnología y Sociedad'),
        new Materia('Matemática'),
        new Materia('Comunicación institucional'),
        new Materia('Sistemas contables I'),
        new Materia('Inglés'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Economía'),
        new Materia('Administración'),
        new Materia('Problemáticas Socio Contemporáneas'),
        new Materia('Teoría y comportamiento organizacional'),
        new Materia('Historia económica y social'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Sociología de las organizaciones'),
        new Materia('Sistemas contables II'),
        new Materia('Gestión de la producción'),
        new Materia('Estadística'),
        new Materia('Informática'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Gestión de cooperativas'),
        new Materia('Gestión de las relaciones laborales'),
        new Materia('Gestión de costos'),
        new Materia('Gestión de la comercialización e invest. comercial'),
        new Materia('Macroeconomía'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Legislación comercial y tributaria'),
        new Materia('Administración pública'),
        new Materia('Estrategia empresarial'),
        new Materia('Sistemas de información para la gestión de las org.'),
        new Materia('Matemática financiera'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Métodos de investigación en ciencias sociales'),
        new Materia('Evaluación y administración de proyecto'),
        new Materia('Control de gestión'),
        new Materia('Higiene, Seguridad y Gestión ambiental'),
        new Materia('Derecho del trabajo y seguridad social'),
      ]),
    ]),
    new AnioAcademico('Cuarto Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Estadística aplicada a la Administración'),
        new Materia('Microeconomía'),
        new Materia('Derecho civil y comercial'),
        new Materia('Finanzas públicas'),
        new Materia('Economía social'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Marketing'),
        new Materia('Comercio exterior'),
        new Materia('Administración de la producción'),
        new Materia('Taller Trabajo de integración final'),
        new Materia('Administración financiera'),
      ]),
    ]),
  ]),

  /* ── 5. Lic. ENFERMERÍA ────────────────────────────────────── */
  new Carrera(1, 'Lic. en Enfermería', 'lic',
    'https://www.unab.edu.ar/wp-content/uploads/2025/10/PE-Lic-Enfermeria.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Enfermería Básica I'),
        new Materia('Ciencias biológicas I'),
        new Materia('Enfermería Comunitaria I'),
        new Materia('Ciencia, Tecnología e innovación'),
        new Materia('Psicología'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Enfermería Básica II'),
        new Materia('Ciencias biológicas II'),
        new Materia('Epidemiología'),
        new Materia('Microbiología y parasitología'),
        new Materia('Antropología'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Cuidados de Enfermería en el adulto y el anciano I'),
        new Materia('Enfermería Materno Infantil I'),
        new Materia('Nutrición y Dietoterapia'),
        new Materia('Introducción a la sociología'),
        new Materia('Introducción a la Filosofía'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Cuidados de Enfermería en el adulto y el anciano II'),
        new Materia('Enfermería Materno Infantil II'),
        new Materia('Farmacología'),
        new Materia('Ética y Deontología Profesional'),
        new Materia('Informática'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Cuidados de Enfermería en el niño y el adolescente'),
        new Materia('Gestión de los Servicios de Enfermería Hospitalarios y Comunitarios I'),
        new Materia('Introducción a la Investigación en Enfermería'),
        new Materia('UNaB I (Seminario Optativo I)'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Enfermería en Salud Mental'),
        new Materia('UNaB II (Seminario Optativo II)'),
        new Materia('Inglés'),
        new Materia('Práctica integrada I'),
      ]),
    ]),
    new AnioAcademico('Cuarto Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Enfermería en cuidados críticos I'),
        new Materia('Investigación I'),
        new Materia('Taller de Investigación I'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Enfermería en cuidados críticos II'),
        new Materia('Educación en Enfermería'),
        new Materia('Filosofía del cuidado'),
        new Materia('Inglés Comunicacional'),
      ]),
    ]),
  ]),

  /* ── 6. Lic. CIENCIA DE DATOS ──────────────────────────────── */
  new Carrera(3, 'Lic. Ciencia de Datos', 'lic',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/LIC-Ciencias-Datos-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Taller de Ciencia, Tecnología y Sociedad'), 
        new Materia('Herramientas computacionales '),
        new Materia('Análisis Matemático I'), 
        new Materia('Inglés'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Introducción a la Programación'), 
        new Materia('Análisis Matemático II'),
        new Materia('Álgebra '), 
        new Materia('Administración'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Economía'), 
        new Materia('Probabilidad y Estadística'),
        new Materia('Recolección de Datos y Análisis Primario de la Inf.'), 
        new Materia('Introducción al Análisis Contable y Financiero'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Inferencia Estadística y reconocimiento de patrones'), 
        new Materia('Algoritmos y estructuras de Datos'),
        new Materia('Metodologías de investigación'), 
        new Materia('Gestión de Datos'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Modelado y Simulación'), new Materia('Visualización de la información'),
        new Materia('Programación Avanzada'), new Materia('Análisis Multivariado'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Inteligencia Articial'), new Materia('Análisis en Redes Sociales'),
        new Materia('Taller I - Big Data y las políticas públicas'), new Materia('Técnicas de Investigación de Mercado'),
      ]),
    ]),
    new AnioAcademico('Cuarto Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Computación en la Nube'), new Materia('Comercio Electrónico'),
        new Materia('Taller II - Big Data y la Salud'), new Materia('Formulación y evaluación de proyectos tecnológicos'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Seminario Final'), new Materia('Práctica Profesional Supervisada (PPS)'),
      ]),
    ]),
  ]),

  /* ── 7. Lic. CIENCIA POLÍTICA ──────────────────────────────── */
  new Carrera(4, 'Lic. Ciencia Política', 'lic',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/Ciencia-Politica-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Taller de ciencia, tecnología y sociedad'), new Materia('Problemáticas Socio Contemporáneas'),
        new Materia('Matemática'), new Materia('Introducción a la Ciencia Política'),
        new Materia('Comunicación Institucional'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Teoría Política'), new Materia('Historia Económica y Social'),
        new Materia('Economía'), new Materia('Derecho'), new Materia('Inglés'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Sociología'), new Materia('Epistemología'),
        new Materia('Administración Pública'), new Materia('Historia Argentina y latinoamericana'),
        new Materia('Estadística'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Teoría Política Contemporánea'), new Materia('Métodos de investigación en Ciencias Sociales'),
        new Materia('Sociología de las organizaciones'), new Materia('Derecho Administrativo'), new Materia('Instituciones Políticas y de gobierno'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Finanzas Públicas'), new Materia('Actores sociales'),
        new Materia('Relaciones Internacionales I'), new Materia('Análisis de las políticas públicas'),
        new Materia('Informática'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Gobierno Local'), new Materia('Opinión Pública'),
        new Materia('Fundamentos del Big Data'), new Materia('Seminario I'), new Materia('Macroeconomía'),
      ]),
    ]),
    new AnioAcademico('Cuarto Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Teoría de los partidos políticos'), new Materia('Teoría política analítica'),
        new Materia('Relaciones Internacionales II'), new Materia('Política Argentina'),
        new Materia('Seminario II'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Institución presidencial y poder ejecutivo'), new Materia('Análisis Político'),
        new Materia('Historia Argentina y Latinoamericana del siglo XX'), new Materia('Comunicación Política'),
        new Materia('Seminario  III'),
      ]),
    ]),
  ]),

  /* ── 8. Lic. LOGÍSTICA Y TRANSPORTE ────────────────────────── */
  new Carrera(5, 'Lic. Logística y Transporte', 'lic',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/LIC-Logistica-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Taller de Ciencia, Tecnología y Sociedad'), new Materia('Logística I'),
        new Materia('Matemática'), new Materia('Sociología de las organizaciones'),
        new Materia('Inglés'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Geografía e integración territorial'), new Materia('Distribución I'),
        new Materia('Economía'), new Materia('Principios de administración'),
        new Materia('Transporte terrestre'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Estadística aplicada a la logística'), new Materia('Logística II'),
        new Materia('Informática'), new Materia('Gestión Organizacional'),
        new Materia('Matemática aplicada a la logística'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Distribución II'), new Materia('Gestión de calidad de producción y servicio'),
        new Materia('Administración de inventario y compras'), new Materia('Legislación nacional e internacional'),
        new Materia('Transporte aéreo'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Distribución Urbana'), new Materia('Simulación Logística'),
        new Materia('Gestión de Proyectos'), new Materia('Investigación Operativa'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Logística Portuaria'), new Materia('Gestión Aduanera'),
        new Materia('Trabajo Final de Carrera'),
      ]),
    ]),
  ]),

  /* ── 9. CCC. Lic. ENSEÑANZA DE LA MATEMÁTICA ───────────────── */
  new Carrera(6, 'CCC. Lic. Enseñanza de la Matemática', 'ccc',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/LIC-Matematica-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Álgebra y Geometría Analítica'), new Materia('Análisis Matemático I'),
        new Materia('Lógica y Teoría de Conjuntos'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Didáctica de la Matemática I'), new Materia('Estadística y Probabilidad'),
        new Materia('Análisis Matemático II'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Álgebra Lineal'), new Materia('Didáctica de la Matemática II'),
        new Materia('Geometría'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Historia de la Matemática'), new Materia('Residencia Pedagógica'),
        new Materia('Cálculo Numérico'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Investigación en Educación Matemática'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Seminario de Tesis'), new Materia('Trabajo Final Integrador'),
      ]),
    ]),
  ]),

  /* ── 10. Tec. ACOMPAÑAMIENTO TERAPÉUTICO ───────────────────── */
  new Carrera(7, 'Tec. Acompañamiento Terapéutico', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/Acompanamiento-Terapeutico-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Psicología General'), new Materia('Psicopatología I'),
        new Materia('Fundamentos del AT'), new Materia('Anatomía y Fisiología'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Comunicación Humana'), new Materia('Introducción al Trabajo Social'),
        new Materia('Psicopatología II'), new Materia('Técnicas del AT'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Salud Mental Comunitaria'), new Materia('Ética y Deontología Profesional'),
        new Materia('Farmacología Psiquiátrica'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Práctica Supervisada'), new Materia('AT en Infancia y Adolescencia'),
        new Materia('AT en Gerontología'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Marco Legal en Salud Mental'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Residencia Final'),
      ]),
    ]),
  ]),

  /* ── 11. Tec. AUTOMATIZACIÓN Y CONTROL ─────────────────────── */
  new Carrera(8, 'Tec. Automatización y Control', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/AUTOMATIZACION-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Matemática Aplicada'), new Materia('Física Aplicada'),
        new Materia('Electrónica Analógica'), new Materia('Dibujo Técnico'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Programación Básica (C/C++)'), new Materia('Electrotecnia'),
        new Materia('Sistemas de Control'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('PLCs y Automatización Industrial'), new Materia('Electrónica Digital'),
        new Materia('Instrumentación'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Redes Industriales'), new Materia('Robótica Básica'),
        new Materia('Control Avanzado'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('SCADA y HMI'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Proyecto Final Integrador'), new Materia('Práctica Profesionalizante'),
      ]),
    ]),
  ]),

  /* ── 12. Tec. COMUNICACIÓN DIGITAL ─────────────────────────── */
  new Carrera(10, 'Tec. Comunicación Digital', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/Comunicacion-Digital-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Introducción a la Comunicación'), new Materia('Lenguaje Audiovisual'),
        new Materia('Fotografía Digital'), new Materia('Diseño Gráfico Básico'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Producción Escrita para Web'), new Materia('Marketing Digital I'),
        new Materia('Producción Audiovisual'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Community Management'), new Materia('SEO/SEM'),
        new Materia('Marketing Digital II'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Análisis de Métricas'), new Materia('Narrativa Transmedia'),
        new Materia('Gestión de Contenidos'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre Final', [
        new Materia('Producción de Podcast y Video'), new Materia('Proyecto Final Profesional'),
      ]),
    ]),
  ]),

  /* ── 13. Tec. DISEÑO Y DESARROLLO DE PRODUCTO ──────────────── */
  new Carrera(11, 'Tec. Diseño y Desarrollo de Producto', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/Diseno-desarrollo-producto-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Fundamentos del Diseño Industrial'), new Materia('Expresión Gráfica'),
        new Materia('Morfología'), new Materia('CAD 3D I'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Materiales y Procesos I'), new Materia('Ergonomía'),
        new Materia('Diseño de Producto I'), new Materia('CAD 3D II'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Materiales y Procesos II'), new Materia('Prototipado Rápido'),
        new Materia('Diseño Sustentable'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Gestión de Proyectos'), new Materia('Diseño de Producto II'),
        new Materia('Innovación y Creatividad'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre Final', [
        new Materia('Trabajo Final de Carrera'),
      ]),
    ]),
  ]),

  /* ── 14. Tec. LOGÍSTICA Y TRANSPORTE ───────────────────────── */
  new Carrera(12, 'Tec. Logística y Transporte', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/LOGISTICA-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Fundamentos de Logística'), new Materia('Geografía del Transporte'),
        new Materia('Matemática Aplicada'), new Materia('Transporte Carretero'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Operaciones de Almacenamiento'), new Materia('Estadística Aplicada'),
        new Materia('Gestión de Stocks'), new Materia('Distribución y Ruteo'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Logística Portuaria'), new Materia('Comercio Internacional'),
        new Materia('Sistemas WMS/TMS'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Seguridad Logística'), new Materia('Logística Inversa y Sustentabilidad'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre Final', [
        new Materia('Práctica Profesionalizante'), new Materia('Trabajo Final'),
      ]),
    ]),
  ]),

  /* ── 15. Tec. PRÓTESIS DENTAL ──────────────────────────────── */
  new Carrera(15, 'Tec. Prótesis Dental', 'tec',
    'https://www.unab.edu.ar/wp-content/uploads/2025/03/Protesis-Dental-PE-2023.pdf', [
    new AnioAcademico('Primer Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Anatomía Dental'), new Materia('Materiales Dentales I'),
        new Materia('Oclusión'), new Materia('Histología y Embriología Oral'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Laboratorio de Prótesis I'), new Materia('Bioseguridad'),
        new Materia('Prótesis Completa'), new Materia('Prótesis Parcial Removible'),
      ]),
    ]),
    new AnioAcademico('Segundo Año', [
      new Cuatrimestre('Cuatrimestre 1', [
        new Materia('Materiales Dentales II'), new Materia('Laboratorio de Prótesis II'),
        new Materia('Prótesis Fija'),
      ]),
      new Cuatrimestre('Cuatrimestre 2', [
        new Materia('Ortodoncia de Laboratorio'), new Materia('Prótesis sobre Implantes'),
        new Materia('Estética Dental'),
      ]),
    ]),
    new AnioAcademico('Tercer Año', [
      new Cuatrimestre('Cuatrimestre Final', [
        new Materia('Práctica Profesionalizante'), new Materia('Trabajo Final'),
      ]),
    ]),
  ]),
];

/* ══════════════════════════════════════════
   CLASE: Recurso  — apuntes biblioteca
══════════════════════════════════════════ */
class Recurso {
  constructor(icono, categoria, titulo, materia, desc, driveUrl) {
    this.icono     = icono;
    this.categoria = categoria;
    this.titulo    = titulo;
    this.materia   = materia;
    this.desc      = desc;
    this.driveUrl  = driveUrl || DRIVE_ROOT;
  }
  coincideCon(q) {
    const lq = q.toLowerCase();
    return [this.titulo, this.categoria, this.materia, this.desc]
      .some(f => f.toLowerCase().includes(lq));
  }
}

/* Apuntes de la biblioteca — enlazados a la carpeta Drive UNAB */
const RECURSOS = [
  new Recurso('📘','Programación',   'Algoritmos y Estructuras de Datos', 'Algoritmos y Estructuras de Datos', 'Guía teórico-práctica con ejercicios resueltos.', DRIVE_ROOT),
  new Recurso('📗','Programación',   'Programación Avanzada',             'Programación Avanzada',             'Apuntes de clase y trabajos prácticos.',           DRIVE_ROOT),
  new Recurso('📙','Programación',   'Desarrollo de Software',            'Desarrollo de Software',            'Metodologías y herramientas de desarrollo.',       DRIVE_ROOT),
  new Recurso('📓','Programación',   'Gestión de Datos',                  'Gestión de Datos',                  'SQL, modelado y bases de datos relacionales.',     DRIVE_ROOT),
  new Recurso('📒','Programación',   'Redes de computadoras',             'Redes de computadoras',             'Protocolos, capas OSI y TCP/IP.',                  DRIVE_ROOT),
  new Recurso('📕','Enfermería',     'Farmacología Básica',               'Farmacología Básica',               'Manual de fármacos para enfermería.',               DRIVE_ROOT),
  new Recurso('📔','Enfermería',     'Anatomía y Fisiología I y II',      'Anatomía y Fisiología',             'Atlas ilustrado y apuntes de cátedra.',            DRIVE_ROOT),
  new Recurso('📗','Enfermería',     'Enfermería Médico-Quirúrgica I',    'Enfermería Médico-Quirúrgica I',    'Protocolos clínicos y guías de práctica.',         DRIVE_ROOT),
  new Recurso('📓','Matemáticas',    'Análisis Matemático I',             'Análisis Matemático I',             'Cálculo diferencial e integral con ejercicios.',   DRIVE_ROOT),
  new Recurso('📒','Matemáticas',    'Álgebra y Geometría Analítica',     'Álgebra y Geometría Analítica',     'Matrices, vectores y geometría analítica.',        DRIVE_ROOT),
  new Recurso('📘','Matemáticas',    'Probabilidad y Estadística',        'Probabilidad y Estadística',        'Teoría y resolución de problemas estadísticos.',   DRIVE_ROOT),
  new Recurso('📙','Administración', 'Administración',                    'Administración',                    'Teorías clásicas y modernas de administración.',   DRIVE_ROOT),
  new Recurso('📕','Administración', 'Sistemas contables I y II',         'Sistemas contables',                'Contabilidad general y de costos.',                DRIVE_ROOT),
  new Recurso('📔','Administración', 'Marketing y Comercialización',      'Gestión de la comercialización',    'Estrategias de marketing y comercio.',             DRIVE_ROOT),
  new Recurso('📗','Ciencia de Datos','Machine Learning I y II',          'Machine Learning',                  'Algoritmos supervisados y no supervisados.',       DRIVE_ROOT),
  new Recurso('📓','Ciencia de Datos','Visualización de la información',  'Visualización de la información',   'Herramientas y buenas prácticas de dataviz.',      DRIVE_ROOT),
  new Recurso('📒','Ciencia Política','Teoría Política Clásica',          'Teoría Política Clásica',           'Textos fundamentales de la teoría política.',      DRIVE_ROOT),
  new Recurso('📘','Logística',       'Gestión de Cadena de Suministro',  'Gestión de Cadena de Suministro',   'Modelos y gestión logística integral.',            DRIVE_ROOT),
  new Recurso('📙','Logística',       'Transporte Multimodal',            'Transporte Multimodal',             'Modos, operadores y documentación de transporte.', DRIVE_ROOT),
];

const CATEGORIAS = ['Todas','Programación','Enfermería','Matemáticas','Administración','Ciencia de Datos','Ciencia Política','Logística'];

/* ══════════════════════════════════════════
   CLASE: Toast
══════════════════════════════════════════ */
class Toast {
  static show(msg, tipo = 'ok') {
    const wrap = document.getElementById('toast-wrap');
    const el   = document.createElement('div');
    el.className   = `toast-item t-${tipo}`;
    el.textContent = msg;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 350); }, 3400);
  }
}

/* ══════════════════════════════════════════
   CLASE: ApiService
══════════════════════════════════════════ */
class ApiService {
  static async _req(method, path, body = null, token = null) {
    const h = { 'Content-Type': 'application/json' };
    if (token) h['Authorization'] = `Bearer ${token}`;
    const cfg = { method, headers: h };
    if (body) cfg.body = JSON.stringify(body);
    const r = await fetch(`${API_BASE}${path}`, cfg);
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Error del servidor');
    return d;
  }
  static post(p, b, t) { return this._req('POST', p, b, t); }
  static get(p, t)     { return this._req('GET',  p, null, t); }
  static put(p, b, t)  { return this._req('PUT',  p, b, t); }
}

/* ══════════════════════════════════════════
   CLASE: Sesion
══════════════════════════════════════════ */
class Sesion {
  static guardar(token, user) {
    localStorage.setItem('unab_tok',  token);
    localStorage.setItem('unab_user', JSON.stringify(user));
  }
  static borrar() {
    localStorage.removeItem('unab_tok');
    localStorage.removeItem('unab_user');
  }
  static get token()   { return localStorage.getItem('unab_tok'); }
  static get usuario() { try { return JSON.parse(localStorage.getItem('unab_user')); } catch { return null; } }
  static get activa()  { return !!(this.token && this.usuario); }
}

/* ══════════════════════════════════════════
   CLASE: NavbarAuth
══════════════════════════════════════════ */
class NavbarAuth {
  static render() {
    const area     = document.getElementById('nav-auth');
    const admItem  = document.getElementById('nav-admin-item');
    const secAdmin = document.getElementById('sec-admin');

    if (!Sesion.activa) {
      area.innerHTML = `
        <button class="btn btn-outline-light btn-sm fw-semibold"
                onclick="ModalAuth.abrir('login')">Iniciar sesión</button>
        <button class="btn btn-light btn-sm fw-bold text-primary"
                onclick="ModalAuth.abrir('register')">Registrarse</button>`;
      admItem.classList.add('d-none');
      secAdmin.style.display = 'none';
    } else {
      const u = Sesion.usuario;
      area.innerHTML = `
        <div class="nav-user-chip" onclick="ModalAuth.abrirPerfil()">
          <i class="bi bi-person-circle"></i>
          <span class="user-name">${u.name.split(' ')[0]}</span>
          <span class="role-badge ${u.role}">${u.role}</span>
        </div>
        <button class="btn btn-outline-light btn-sm" onclick="Auth.cerrarSesion()" title="Cerrar sesión">
          <i class="bi bi-box-arrow-right"></i>
        </button>`;
      if (u.role === 'admin') {
        admItem.classList.remove('d-none');
        secAdmin.style.display = '';
        PanelAdmin.cargar();
      } else {
        admItem.classList.add('d-none');
        secAdmin.style.display = 'none';
      }
    }
  }
}

/* ══════════════════════════════════════════
   CLASE: ModalAuth
══════════════════════════════════════════ */
class ModalAuth {
  static _bsModal    = null;
  static _resetToken = null;

  static _get() {
    if (!this._bsModal)
      this._bsModal = new bootstrap.Modal(document.getElementById('modal-auth'));
    return this._bsModal;
  }
  static abrir(vista) { this._renderizar(vista); this._get().show(); }

  static abrirPerfil() {
    if (!Sesion.activa) return;
    const u = Sesion.usuario;
    document.getElementById('auth-title').textContent = 'Mi perfil';
    document.getElementById('auth-body').innerHTML = `
      <div class="text-center py-2">
        <div style="width:60px;height:60px;border-radius:50%;background:#0d6efd;color:#fff;
                    font-size:1.5rem;font-weight:700;display:flex;align-items:center;
                    justify-content:center;margin:0 auto 12px;">${u.name.charAt(0)}</div>
        <div class="fw-bold fs-5">${u.name}</div>
        <div class="text-muted small">${u.email}</div>
        <span class="badge mt-2 ${u.role === 'admin' ? 'bg-warning text-dark' : 'bg-primary'} px-3">${u.role}</span>
        ${u.carrera ? `<div class="mt-1 small text-muted">${u.carrera}</div>` : ''}
        <hr/>
        <button class="btn btn-outline-danger btn-sm"
          onclick="Auth.cerrarSesion(); bootstrap.Modal.getInstance(document.getElementById('modal-auth')).hide()">
          <i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión
        </button>
      </div>`;
    this._get().show();
  }

  static _renderizar(vista) {
    const titulos = { login:'Iniciar sesión', register:'Crear cuenta', forgot:'Recuperar contraseña', resetpass:'Nueva contraseña' };
    document.getElementById('auth-title').textContent = titulos[vista] || 'Acceder';

    const opts = CARRERAS.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');

    const html = {
      login: `
        <div id="m-err" class="msg-error"></div>
        <div class="mb-3"><label class="form-label">Email institucional</label>
          <input id="f-email" type="email" class="form-control" placeholder="tumail@unab.edu.ar"
                 onkeydown="if(event.key==='Enter') Auth.login()" /></div>
        <div class="mb-3"><label class="form-label">Contraseña</label>
          <input id="f-pass" type="password" class="form-control" placeholder="••••••••"
                 onkeydown="if(event.key==='Enter') Auth.login()" /></div>
        <button id="m-btn" class="btn-primary-full mb-3" onclick="Auth.login()">Iniciar sesión</button>
        <div class="d-flex justify-content-between mt-1">
          <span class="auth-link" onclick="ModalAuth._renderizar('forgot')">¿Olvidaste tu contraseña?</span>
          <span class="auth-link" onclick="ModalAuth._renderizar('register')">Registrarme</span>
        </div>`,
      register: `
        <div id="m-err" class="msg-error"></div>
        <div class="mb-3"><label class="form-label">Nombre completo</label>
          <input id="f-name" type="text" class="form-control" placeholder="Tu nombre" /></div>
        <div class="mb-3"><label class="form-label">Email</label>
          <input id="f-email" type="email" class="form-control" placeholder="tumail@unab.edu.ar" /></div>
        <div class="mb-3"><label class="form-label">Carrera</label>
          <select id="f-carrera" class="form-select">
            <option value="">-- Seleccioná tu carrera --</option>${opts}
          </select></div>
        <div class="mb-3"><label class="form-label">Contraseña <small class="fw-normal text-muted">(mín. 8 caracteres)</small></label>
          <input id="f-pass" type="password" class="form-control" placeholder="••••••••" /></div>
        <button id="m-btn" class="btn-primary-full mb-3" onclick="Auth.registrar()">Registrarme</button>
        <div class="text-center"><span class="auth-link" onclick="ModalAuth._renderizar('login')">← Ya tengo cuenta</span></div>`,
      forgot: `
        <div id="m-err" class="msg-error"></div>
        <div id="m-ok" class="msg-ok"></div>
        <p class="text-muted small mb-3">Ingresá tu email y te enviaremos instrucciones para restablecer tu contraseña.</p>
        <div class="mb-3"><label class="form-label">Email institucional</label>
          <input id="f-email" type="email" class="form-control" placeholder="tumail@unab.edu.ar" /></div>
        <button id="m-btn" class="btn-primary-full mb-3" onclick="Auth.olvideClave()">Enviar instrucciones</button>
        <div class="text-center"><span class="auth-link" onclick="ModalAuth._renderizar('login')">← Volver al login</span></div>`,
      resetpass: `
        <div id="m-err" class="msg-error"></div>
        <p class="text-muted small mb-3">Ingresá tu nueva contraseña (mínimo 8 caracteres).</p>
        <div class="mb-3"><label class="form-label">Nueva contraseña</label>
          <input id="f-pass" type="password" class="form-control" placeholder="••••••••" /></div>
        <button id="m-btn" class="btn-primary-full mb-3" onclick="Auth.resetearClave()">Cambiar contraseña</button>`,
    };
    document.getElementById('auth-body').innerHTML = html[vista] || html.login;
  }

  static _err(msg)   { const e = document.getElementById('m-err'); if(e){ e.textContent = msg; e.classList.toggle('show', !!msg); } }
  static _ok(msg)    { const e = document.getElementById('m-ok');  if(e){ e.textContent = msg; e.classList.toggle('show', !!msg); } }
  static _load(on)   {
    const b = document.getElementById('m-btn');
    if (!b) return;
    b.disabled = on;
    if (!b.dataset.orig) b.dataset.orig = b.textContent;
    b.textContent = on ? 'Procesando…' : b.dataset.orig;
  }
}

/* ══════════════════════════════════════════
   CLASE: Auth
══════════════════════════════════════════ */
class Auth {
  static async login() {
    const email = document.getElementById('f-email')?.value.trim();
    const pass  = document.getElementById('f-pass')?.value;
    ModalAuth._err('');
    if (!email || !pass) return ModalAuth._err('Completá todos los campos.');
    ModalAuth._load(true);
    try {
      const d = await ApiService.post('/api/auth/login', { email, password: pass });
      Sesion.guardar(d.token, d.user);
      bootstrap.Modal.getInstance(document.getElementById('modal-auth')).hide();
      NavbarAuth.render();
      Toast.show(`¡Bienvenido, ${d.user.name.split(' ')[0]}! 👋`);
    } catch(e) { ModalAuth._err(e.message); }
    finally    { ModalAuth._load(false); }
  }
  static async registrar() {
    const name    = document.getElementById('f-name')?.value.trim();
    const email   = document.getElementById('f-email')?.value.trim();
    const carrera = document.getElementById('f-carrera')?.value;
    const pass    = document.getElementById('f-pass')?.value;
    ModalAuth._err('');
    if (!name || !email || !pass) return ModalAuth._err('Completá nombre, email y contraseña.');
    if (pass.length < 8)          return ModalAuth._err('La contraseña debe tener al menos 8 caracteres.');
    ModalAuth._load(true);
    try {
      const d = await ApiService.post('/api/auth/register', { name, email, password: pass, carrera });
      Sesion.guardar(d.token, d.user);
      bootstrap.Modal.getInstance(document.getElementById('modal-auth')).hide();
      NavbarAuth.render();
      Toast.show('¡Cuenta creada exitosamente! 🎉');
    } catch(e) { ModalAuth._err(e.message); }
    finally    { ModalAuth._load(false); }
  }
  static async olvideClave() {
    const email = document.getElementById('f-email')?.value.trim();
    ModalAuth._err(''); ModalAuth._ok('');
    if (!email) return ModalAuth._err('Ingresá tu email.');
    ModalAuth._load(true);
    try {
      const d = await ApiService.post('/api/auth/forgot-password', { email });
      if (d.reset_token) { ModalAuth._resetToken = d.reset_token; ModalAuth._renderizar('resetpass'); Toast.show('Email encontrado. Ingresá tu nueva contraseña.'); }
      else                { ModalAuth._ok(d.message); }
    } catch(e) { ModalAuth._err(e.message); }
    finally    { ModalAuth._load(false); }
  }
  static async resetearClave() {
    const pass = document.getElementById('f-pass')?.value;
    ModalAuth._err('');
    if (!pass || pass.length < 8) return ModalAuth._err('Mínimo 8 caracteres.');
    ModalAuth._load(true);
    try {
      const d = await ApiService.post('/api/auth/reset-password', { token: ModalAuth._resetToken, password: pass });
      Toast.show(d.message);
      bootstrap.Modal.getInstance(document.getElementById('modal-auth')).hide();
      ModalAuth._renderizar('login');
    } catch(e) { ModalAuth._err(e.message); }
    finally    { ModalAuth._load(false); }
  }
  static cerrarSesion() { Sesion.borrar(); NavbarAuth.render(); Toast.show('Sesión cerrada correctamente.'); }
}

/* ══════════════════════════════════════════
   CLASE: VistaCarreras
══════════════════════════════════════════ */
class VistaCarreras {
  static renderizar() {
    // Dropdown navbar
    document.getElementById('dropdown-carreras').innerHTML =
      CARRERAS.map(c => `<li><a class="dropdown-item" href="#carreras" onclick="VistaCarreras.abrirPlan(${c.id})">${c.nombre}</a></li>`).join('');

    // Grid de cards
    document.getElementById('grid-carreras').innerHTML = CARRERAS.map(c => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="carrera-card" onclick="VistaCarreras.abrirPlan(${c.id})">
          <div class="card-body">
            <div class="mb-2"><span class="tipo-badge ${c.tipoBadgeClass}">${c.tipoLabel}</span></div>
            <div class="card-title">${c.nombre}</div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted"><i class="bi bi-list-ul me-1"></i>Plan por cuatrimestre</small>
              <button class="btn-ver-plan" onclick="event.stopPropagation(); VistaCarreras.abrirPlan(${c.id})">
                Ver materias →
              </button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  static abrirPlan(id) {
    const c = CARRERAS.find(x => x.id === id);
    if (!c) return;

    document.getElementById('plan-nombre').textContent = c.nombre;
    const badge = document.getElementById('plan-badge');
    badge.textContent = c.tipoLabel;
    badge.className   = `tipo-badge ${c.tipoBadgeClass} me-2`;
    document.getElementById('plan-pdf').href = c.pdfUrl;

    // Renderizar por año → cuatrimestres en 2 columnas
    document.getElementById('plan-body').innerHTML = c.anios.map(anio => `
      <div class="year-block">
        <div class="year-title">
          <i class="bi bi-calendar3"></i>${anio.label}
        </div>
        <div class="cuatri-cols">
          ${anio.cuatrimestres.map(cuatri => `
            <div class="cuatri-block${cuatri.anual ? ' anual' : ''}">
              <div class="cuatri-label">${cuatri.label}</div>
              ${cuatri.materias.map(m => `
                <div class="mat-row">
                  <span class="mat-dot"></span>
                  <span class="mat-name">${m.nombre}</span>
                  <a href="${m.driveUrl}" target="_blank" class="mat-apunte">
                    <i class="bi bi-folder2-open"></i>Apuntes
                  </a>
                </div>`).join('')}
            </div>`).join('')}
        </div>
      </div>`).join('');

    new bootstrap.Modal(document.getElementById('modal-plan')).show();
  }
}

/* ══════════════════════════════════════════
   CLASE: Biblioteca
══════════════════════════════════════════ */
class Biblioteca {
  static _cat   = 'Todas';
  static _query = '';

  static inicializar() {
    document.getElementById('bib-cats').innerHTML = CATEGORIAS.map(cat => `
      <span class="cat-btn${cat === 'Todas' ? ' active' : ''}" data-cat="${cat}"
            onclick="Biblioteca._filtrarCat('${cat}')">${cat}</span>`).join('');
    document.getElementById('bib-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') Biblioteca.buscar();
    });
    this._renderizar();
  }

  static _filtrarCat(cat) {
    this._cat = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
    this._renderizar();
  }

  static buscar() {
    this._query = document.getElementById('bib-input').value.trim();
    this._renderizar();
  }

  static _renderizar() {
    let lista = RECURSOS;
    if (this._cat !== 'Todas') lista = lista.filter(r => r.categoria === this._cat);
    if (this._query)           lista = lista.filter(r => r.coincideCon(this._query));

    const grid = document.getElementById('grid-recursos');
    if (!lista.length) {
      grid.innerHTML = `<div class="col-12 text-center py-5 text-muted">
        <i class="bi bi-search fs-2 d-block mb-2"></i>
        Sin resultados para "<strong>${this._query || this._cat}</strong>"
      </div>`;
      return;
    }
    grid.innerHTML = lista.map(r => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="recurso-card">
          <div class="recurso-head">
            <div class="recurso-icon">${r.icono}</div>
            <div>
              <div class="recurso-cat">${r.categoria}</div>
              <div class="recurso-title">${r.titulo}</div>
            </div>
          </div>
          <div class="recurso-materia"><i class="bi bi-book me-1"></i>Materia: ${r.materia}</div>
          <div class="recurso-desc">${r.desc}</div>
          <div class="recurso-footer">
            <a href="${r.driveUrl}" target="_blank" class="btn-apunte">
              <i class="bi bi-folder2-open"></i>Ver apuntes en Drive
            </a>
          </div>
        </div>
      </div>`).join('');
  }
}

/* ══════════════════════════════════════════
   CLASE: PanelAdmin
══════════════════════════════════════════ */
class PanelAdmin {
  static async cargar() {
    if (!Sesion.activa || Sesion.usuario.role !== 'admin') return;
    const tbody = document.getElementById('admin-tbody');
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">
      <div class="spinner-border spinner-border-sm me-2"></div>Cargando usuarios…
    </td></tr>`;
    try {
      const usuarios = await ApiService.get('/api/admin/users', Sesion.token);
      tbody.innerHTML = usuarios.map(u => `
        <tr>
          <td class="text-muted">#${u.id}</td>
          <td class="fw-semibold">${u.name}</td>
          <td class="text-muted small">${u.email}</td>
          <td class="small">${u.carrera || '—'}</td>
          <td><span class="badge ${u.role === 'admin' ? 'bg-warning text-dark' : 'bg-primary'}">${u.role}</span></td>
          <td>
            <select class="form-select form-select-sm d-inline-block w-auto" id="rs-${u.id}">
              <option value="estudiante" ${u.role === 'estudiante' ? 'selected' : ''}>Estudiante</option>
              <option value="admin"      ${u.role === 'admin'      ? 'selected' : ''}>Admin</option>
            </select>
            <button class="btn btn-sm btn-outline-primary ms-1" onclick="PanelAdmin.cambiarRol(${u.id})">
              Guardar
            </button>
          </td>
        </tr>`).join('');
    } catch(e) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-danger p-3">${e.message}</td></tr>`;
    }
  }

  static async cambiarRol(uid) {
    const rol = document.getElementById(`rs-${uid}`).value;
    try {
      const d = await ApiService.put(`/api/admin/users/${uid}/role`, { role: rol }, Sesion.token);
      Toast.show(d.message);
      PanelAdmin.cargar();
    } catch(e) { Toast.show(e.message, 'err'); }
  }
}

/* ══════════════════════════════════════════
   INICIALIZACIÓN
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  VistaCarreras.renderizar();
  Biblioteca.inicializar();
  NavbarAuth.render();
});
