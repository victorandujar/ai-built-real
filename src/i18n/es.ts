import type { en } from './en';
import type { Widen } from './types';

export type Translation = Widen<typeof en>;

/** Castilian Spanish, second person singular, same editorial tone as the English. */
export const es: Translation = {
  meta: {
    siteName: 'Hecho con IA → Producto real',
    shortName: 'Real product',
    description:
      'Lo has construido con IA. Consigue una revisión humana de producto e ingeniería antes de que lleguen usuarios, datos y pagos de verdad.',
    homeTitle: 'Hecho con IA. Listo para la vida real.',
    founderRole: 'Ingeniero de producto y desarrollador full-stack',
    ogImageAlt: 'Hecho con IA. Producto real. Listo para lo que viene.',
    rssTitle: 'Notas de campo de Real product',
    serviceType: 'Revisión de preparación para productos hechos con IA',
  },
  common: {
    cta: 'Revisar mi producto',
    skipToContent: 'Saltar al contenido',
    home: 'Inicio',
    languageLabel: 'Idioma',
    pauseMotion: 'Pausar movimiento',
    resumeMotion: 'Reanudar movimiento',
  },
  nav: {
    label: 'Navegación principal',
    brandHome: 'Inicio de Hecho con IA a Producto real',
    caption: [
      'Preparación de producto independiente',
      'Para quien lo ha construido.',
    ],
    menu: 'Menú',
    cta: 'Vamos a verlo',
    items: [
      { key: 'realityCheck', label: 'Reality Check' },
      { key: 'learn', label: 'Notas de campo' },
      { key: 'about', label: 'Sobre mí' },
    ],
  },
  footer: {
    brand: 'real product.',
    tagline: 'Hecho para lo que viene después.',
    human: 'Una persona al otro lado.',
    privacy: 'Privacidad',
    terms: 'Términos',
    rss: 'RSS',
  },
  hero: {
    eyebrow: 'Hecho con IA → Listo para el mundo real',
    kicker: 'Un nuevo comienzo, después de construirlo.',
    title: ['Hecho con IA.', 'Listo para la'],
    titleEm: 'vida real.',
    intro: [
      'Has creado algo que funciona.',
      'Vamos a asegurarnos de que funciona',
    ],
    introStrong: 'ahí fuera.',
    secondary: 'Qué ocurre en un check',
    note: 'Una revisión humana. Un siguiente paso claro. Tu producto sigue siendo tuyo.',
    toolsCaption: ['Da igual con qué lo hicieras.', 'Listo para quien sea.'],
    toolsSuffix: 'y todo lo que venga después.',
  },
  sculpture: {
    index: ['Objeto 001', 'Una obra en proceso.'],
    note: ['Piezas sueltas.', 'Un producto real.'],
    assemble: 'Unir las piezas',
    separate: 'Ver las piezas',
    assembleLabel: 'Unir la escultura',
    separateLabel: 'Separar la escultura',
    statusPrototype: 'Prototipo: piezas sueltas.',
    statusProduct: 'Producto: las piezas encajan.',
    pauseLabel: 'Pausar el movimiento 3D',
    resumeLabel: 'Reanudar el movimiento 3D',
  },
  opening: {
    margin: 'UNA NOTA PARA QUIEN CONSTRUYE',
    title: ['Tuviste una idea.', 'Esta vez,'],
    titleBuilt: 'la construiste.',
    aside: ['Eso es', 'importante.'],
    copy: 'La IA ha cambiado quién puede construir. Nos parece extraordinario. Has hecho algo que funciona. Ahora llega el siguiente capítulo: dejar entrar a los demás.',
  },
  scenes: {
    chapter: ['01 / Ahí fuera', 'Una demo que funciona es solo el principio.'],
    heading: ['Y entonces entra', 'la realidad.'],
    copy: [
      'Tu producto se encuentra con lo que',
      'ningún prompt puede evitar.',
    ],
    tablist: 'Momentos reales de un producto',
    shiftPerspective: 'Cambiar la perspectiva',
    frontPerspective: 'Perspectiva frontal',
    replay: 'Repetir la escena',
    coordinate: 'MUNDO REAL / CONEXIONES EN VIVO',
    noscript:
      'También revisamos la separación entre cuentas, la recuperación de pagos y la visibilidad cuando algo falla.',
    noscriptLink: 'Descubre la revisión completa.',
    items: [
      {
        name: 'La primera desconocida.',
        title: 'Ya no estás ahí para explicarlo.',
        copy: 'Alguien abre tu producto sin contexto, sin instrucciones y con muy poca paciencia. ¿Consigue su primer resultado útil?',
        note: 'Recorre el camino con una cuenta nueva.',
      },
      {
        name: 'La segunda cuenta.',
        title: 'Dos clientes. Dos mundos separados.',
        copy: 'Un producto puede parecer privado y aun así exponer información que no debería. Comprobamos qué puede ver y cambiar realmente una segunda cuenta.',
        note: 'Comprueba los permisos donde viven los datos.',
      },
      {
        name: 'El pago interrumpido.',
        title: 'Ha pagado. ¿Pero el producto se ha enterado?',
        copy: 'El checkout es solo una parte. El pago puede salir bien y el acceso fallar, o el mismo evento puede llegar dos veces. La recuperación importa.',
        note: 'Sigue el traspaso, también por el camino que sale mal.',
      },
      {
        name: 'El martes inesperado.',
        title: 'Algo se rompe. ¿Quién se entera?',
        copy: 'Una clave caducada. Una dependencia lenta. Un despliegue que cambia una suposición pequeña. Buscamos visibilidad suficiente para entender qué ha pasado.',
        note: 'Haz visible el fallo y posible la recuperación.',
      },
    ],
  },
  bench: {
    chapter: ['02 / Sobre la mesa', 'Un producto. La imagen completa.'],
    heading: ['Un segundo par', 'de'],
    headingEm: 'ojos.',
    copy: 'Seguimos la experiencia hasta el código, los datos y la forma en que se ejecuta. Siempre en el contexto de tu próximo lanzamiento.',
    indexLabel: 'LAS SIETE LENTES',
    indexCopy: ['Detalles pequeños.', 'Consecuencias conectadas.'],
    indexLink: 'Por dentro del Reality Check',
    evidence: 'SIGUE LA EVIDENCIA',
  },
  coverage: [
    {
      category: 'Producto',
      title: '¿Alguien puede usarlo sin ti?',
      description:
        'Recorremos el camino principal desde una cuenta nueva. Onboarding, estados vacíos, estados rotos y los momentos en los que alguien necesita una vuelta atrás.',
    },
    {
      category: 'Ingeniería',
      title: '¿Puedes seguir construyendo sobre ello?',
      description:
        'Seguimos la lógica importante a través del código. Los límites, las suposiciones duplicadas y las dependencias frágiles importan más que la limpieza cosmética.',
    },
    {
      category: 'Datos',
      title: '¿Están los datos correctos en las manos correctas?',
      description:
        'Revisamos la estructura de datos, las reglas de acceso, la separación de entornos y la recuperación. Señalamos la exposición evidente; el trabajo de seguridad especializado se acuerda aparte.',
    },
    {
      category: 'Acceso',
      title: '¿Cada rol se queda en su sitio?',
      description:
        'Registro, inicio de sesión, recuperación de contraseña, sesiones y autorización en el servidor. Probamos con una segunda cuenta, no solo el camino feliz.',
    },
    {
      category: 'Pagos',
      title: '¿Qué pasa cuando el checkout se tuerce?',
      description:
        'Donde haya pagos: checkout fallido, webhooks, eventos duplicados, cambios de estado de suscripción y el vínculo entre pagar y tener acceso.',
    },
    {
      category: 'Producción',
      title: '¿Te enterarás cuando algo se rompa?',
      description:
        'Despliegue, configuración, errores, logs, dependencias externas y expectativas de copias de seguridad. Visibilidad suficiente para operar tu siguiente etapa.',
    },
    {
      category: 'Rendimiento',
      title: '¿Se siente listo en un móvil de verdad?',
      description:
        'Carga, peso de página, entrega de fuentes e imágenes, scripts innecesarios y recorridos clave en pantallas pequeñas. Bases de buscadores donde importe que te encuentren.',
    },
  ],
  report: {
    ariaLabel: 'Informe de ejemplo de un Reality Check',
    top: 'Informe de realidad',
    badge: 'Ejemplo ilustrativo',
    statusLabel: 'Tu siguiente paso',
    statusTitle: 'Lanzar tras los arreglos.',
    statusHint:
      'El recorrido principal funciona. Arregla antes el acceso y la recuperación de pagos.',
    bottom: 'Prioridades. Evidencia. Un siguiente paso claro.',
    blocker: 'Bloqueante',
    fixSoon: 'Arreglar pronto',
    fineForNow: 'Bien por ahora',
    rows: [
      'Otra cuenta puede abrir un proyecto privado',
      'Un checkout fallido no tiene forma de recuperarse',
      'Los errores no le llegan a nadie',
      'El onboarding lleva a la persona a su primer resultado',
    ],
  },
  reportChapter: {
    chapter: ['03 / Con qué te vas', 'Menos ruido. Un siguiente paso.'],
    heading: ['Claridad,'],
    headingEm: 'en tus manos.',
    copy: [
      'Un informe breve y priorizado. Qué bloquea tu próximo lanzamiento, qué arreglar pronto y qué ya está lo bastante bien.',
      'Cada hallazgo viene con su evidencia y una acción siguiente. Úsalo tú, con IA o con nosotros.',
    ],
    link: 'Consigue un siguiente paso claro',
    deskAnnotation: 'UN EJEMPLO / EXPLORA LAS PRIORIDADES',
    filterLabel: 'Explorar prioridades de ejemplo',
    filterAll: 'La imagen completa',
    filterBlockers: 'Bloqueantes de lanzamiento',
    hint: 'Abre un hallazgo para ver el razonamiento detrás.',
  },
  human: {
    question: 'UNA PREGUNTA JUSTA',
    title: ['«¿No podría', 'preguntárselo a la'],
    titleEm: 'IA?»',
    answer: ['Claro que sí.', 'Nosotros también lo hacemos.'],
    copy: 'Lo difícil es decidir qué respuesta importa para tu producto, tus usuarios y tu próximo lanzamiento. Alguien tiene que poner a prueba las suposiciones, seguir la evidencia y responder por la recomendación.',
    signoff: 'LA PERSONA DETRÁS DE REAL PRODUCT',
    link: 'Conoce a quien hace la revisión',
  },
  path: {
    chapter: [
      '04 / De aquí en adelante',
      'Tu producto sigue siendo tuyo. Siempre.',
    ],
    heading: ['Un check.'],
    headingEm: 'Un camino adelante.',
    copy: [
      '¿Primer producto? ¿Primeros usuarios? ¿Primeros clientes que pagan?',
      'Para este momento estamos aquí.',
    ],
    steps: [
      {
        label: 'ENTENDER',
        title: 'Reality Check',
        titleEm: '',
        copy: 'Enséñanos lo que has construido. Acordamos el alcance y la tarifa, revisamos el producto y después te explicamos un informe breve y priorizado.',
        link: 'Empieza con un check',
      },
      {
        label: 'DEJARLO LISTO / OPCIONAL',
        title: 'Reality Sprint',
        titleEm: '',
        copy: '¿Quieres ayuda con los arreglos? Acordamos un alcance concreto, resolvemos los problemas importantes y verificamos los cambios.',
        link: 'Descubre un sprint',
      },
      {
        label: 'SEGUIR ADELANTE',
        title: 'Lanza.',
        titleEm: 'Sigue construyendo.',
        copy: 'Da el siguiente paso sabiendo qué funciona, qué necesita atención y qué puede esperar.',
        link: '',
      },
    ],
  },
  journal: {
    label: 'LAS NOTAS DE CAMPO',
    heading: ['Un poco más de'],
    headingEm: 'perspectiva.',
    link: 'Abrir la biblioteca',
  },
  closing: {
    eyebrow: 'El siguiente paso es pequeño.',
    title: ['Lo has construido.', 'Veamos si está listo.'],
  },
  about: {
    title: 'Sobre Víctor Andújar y Real product',
    description:
      'Conoce al ingeniero de producto detrás de Real product. Criterio humano para quienes han construido con IA y se preparan para usuarios reales.',
    eyebrow: 'La persona detrás de la revisión',
    h1: ['Más gente puede construir.', 'Eso es una buena noticia.'],
    h2: ['Pensamiento de producto.', 'Criterio de ingeniería.'],
    body: [
      'Construyo productos digitales, desde la experiencia que la gente ve hasta los sistemas que la hacen funcionar.',
      'La IA ha abierto ese proceso a muchísimas más personas. Ahora se puede explorar una idea, construir algo útil y aprender de ello sin montar antes un equipo entero.',
      'Quiero que más de esos productos lleguen a manos de la gente.',
    ],
    wheelTitle: 'El volante sigue siendo tuyo.',
    wheelBody: [
      'Real product existe para la etapa posterior a la primera versión que funciona. Cuando necesitas saber si una persona desconocida sabrá usarlo, si las reglas de acceso aguantan y si los flujos importantes se recuperan cuando algo sale mal.',
      'Mi trabajo es mirar con calma, explicarte lo que encuentro y ayudarte a decidir qué hacer después. A veces eso significa arreglar algo. A veces significa dejarlo como está.',
    ],
    expectTitle: 'Qué puedes esperar',
    expect: [
      'Evidencia que puedes revisar.',
      'Lenguaje claro y límites honestos.',
      'Prioridades acordes a tu siguiente paso.',
      'Un producto que sigue siendo tuyo.',
    ],
  },
  realityCheck: {
    title: 'Reality Check para tu producto hecho con IA',
    description:
      'Una revisión humana y enfocada de tu producto hecho con IA: recorridos de usuario, datos, acceso, pagos y producción. Te vas con evidencia y un siguiente paso claro.',
    breadcrumb: 'Reality Check',
    eyebrow: 'Una revisión humana. Una respuesta práctica.',
    h1: ['¿Listo para usuarios reales?', 'Vamos a averiguarlo.'],
    lead: 'Ya has construido el producto. El Reality Check te ayuda a entender si está listo para lo siguiente que quieres hacer.',
    lookEyebrow: 'Qué miramos',
    lookTitle: ['El producto.', 'No solo el código.'],
    lookCopy:
      'Acordamos los recorridos y los riesgos importantes antes de revisar. Una beta pequeña y un producto que cobra necesitan niveles de confianza distintos.',
    lookNotice:
      'Esta es una revisión de producto e ingeniería. No es un test de intrusión, ni una certificación de seguridad, ni una garantía frente a cualquier fallo. Lo que requiera especialistas se deriva con claridad.',
    getEyebrow: 'Qué te llevas',
    getTitle: ['Evidencia.', 'Prioridades.', 'Tu siguiente paso.'],
    getLead:
      'Un informe conciso y una sesión para recorrer los hallazgos. Cada punto incluye cómo lo encontramos, por qué importa y qué hacer después.',
    getList: [
      {
        term: 'Bloqueantes:',
        copy: 'resolver antes del siguiente paso acordado.',
      },
      {
        term: 'Arreglar pronto:',
        copy: 'planificar después de los bloqueantes.',
      },
      { term: 'Bien por ahora:', copy: 'mantener lo que funciona.' },
    ],
    outcomes: [
      'Lanzar',
      'Lanzar tras arreglos',
      'Seguir probando',
      'Replantear la base',
    ],
    scopeEyebrow: 'Alcance antes de comprometerse',
    scopeTitle: ['Empieza con', 'lo que has construido.'],
    priceLabel: 'Reality Check',
    priceUnset: 'Una tarifa acordada antes de empezar.',
    scopeCopy:
      'Cuéntanos tu producto y lo que viene después. Revisamos si encaja y acordamos contigo el alcance, los plazos y la tarifa. Enviar una solicitud no inicia ningún trabajo de pago.',
    sprintTitle: '¿Necesitas ayuda para arreglarlo?',
    sprintCopy:
      'El Reality Sprint, opcional, convierte las prioridades en un trabajo concreto. También puedes coger el informe y hacer los cambios tú.',
    sprintLink: 'Pregunta por un Reality Sprint',
    faqTitle: ['Algunas respuestas', 'útiles.'],
    faq: [
      {
        q: '¿Tengo que compartir mi repositorio?',
        a: 'Para empezar no. Con la URL del producto y una descripción breve basta para la primera conversación. Si hace falta acceso al código, acordamos una forma adecuada de compartirlo. Nunca envíes contraseñas ni claves de API en el formulario.',
      },
      {
        q: '¿Me vas a decir que lo reconstruya todo?',
        a: 'Solo si la evidencia respalda esa decisión. Nos centramos en el conjunto de cambios más pequeño y útil para tu siguiente etapa.',
      },
      {
        q: '¿Puedo seguir construyendo con IA?',
        a: 'Sí. Los hallazgos deberían ayudarte a hacer mejores preguntas, probar lo correcto y mantener el control de tu producto.',
      },
      {
        q: '¿Cuánto tarda?',
        a: 'Acordamos los plazos cuando entendemos el tamaño del producto y los recorridos a revisar. No hay ninguna auditoría automática detrás de este formulario.',
      },
    ],
  },
  learn: {
    title: 'Notas de campo para quien construye con IA',
    description:
      'Guías prácticas para lanzar un producto hecho con IA: preparación para producción, comprobaciones de lanzamiento y lo que cambia cuando llegan usuarios reales.',
    eyebrow: 'Notas de campo / Antes de lanzar',
    h1: ['Menos suposiciones.', 'Más preparación.'],
    lead: 'Notas prácticas para ese espacio entre «funciona» y «la gente lo está usando».',
    breadcrumb: 'Notas de campo',
    articleCtaTitle: '¿Quieres un segundo par de ojos?',
    articleCtaCopy:
      'Un Reality Check aplica esta forma de pensar a tu producto y a tu siguiente etapa.',
    backToNotes: 'Más notas de campo',
    empty: 'Pronto habrá nuevas notas de campo.',
  },
  notFound: {
    title: 'Página no encontrada',
    eyebrow: '404 / Un pequeño desvío',
    h1: ['Esta página', 'no está aquí.'],
    lead: 'Vamos a llevarte de vuelta a algo útil.',
    backHome: 'Volver al inicio',
    readNotes: 'Leer las notas de campo',
  },
  check: {
    title: 'Empieza tu Reality Check',
    description:
      'Enséñanos tu producto hecho con IA y lo que viene después. Solicita una revisión humana y enfocada antes de lanzar.',
    eyebrow: 'El Reality Check',
    h1: ['Lo has construido.', 'Vamos a'],
    h1Em: 'echarle un vistazo.',
    lead: [
      'Cuéntanos un poco sobre tu producto.',
      'A partir de ahí seguimos juntos.',
    ],
    facts: ['Unos 3 minutos', 'Sin pagar nada'],
    founderNote:
      'Leo todas las solicitudes. Si encaja, acordamos el alcance, los tiempos y la tarifa antes de empezar cualquier trabajo.',
    privacyNote: [
      'Con el enlace al producto basta para empezar.',
      'No compartas contraseñas, claves ni datos de clientes.',
    ],
    compassCaption: 'Una imagen más clara, paso a paso.',
    compassNodes: { product: 'PRODUCTO', context: 'CONTEXTO', human: 'TÚ' },
  },
  form: {
    noscript:
      'Activa JavaScript para completar la solicitud. Tus datos solo se envían cuando pulsas Enviar mi solicitud.',
    progressLabel: 'Progreso de la solicitud',
    stepAria: [
      'Paso 1: Tu producto',
      'Paso 2: Tu siguiente paso',
      'Paso 3: Tus datos',
    ],
    stepNames: ['Tu producto', 'Tu siguiente paso', 'Tus datos'],
    guidance: [
      'Tres pasos cortos. Empieza por tu producto.',
      'Un poco de contexto nos ayuda a enfocar la revisión.',
      'Último paso. Revisa tu resumen y déjanos tu email.',
    ],
    briefCaptions: [
      '01 — Empieza por lo que has construido.',
      '02 — Dale una dirección.',
      '03 — Pon una persona detrás.',
    ],
    legends: [
      'Primero, tu producto.',
      '¿Hacia dónde vas?',
      'Pongámosle un nombre.',
    ],
    captions: [
      'Eso que has hecho. Y para quién lo has hecho.',
      'Así podemos centrarnos en lo que importa para tu siguiente paso.',
      'Te responderá una persona de verdad. Nada de listas de correo.',
    ],
    labels: {
      productUrl: 'URL del producto',
      description: '¿Qué hace tu producto?',
      tool: '¿Con qué lo has construido?',
      users: '¿Ya tienes usuarios?',
      payments: '¿Cobras pagos?',
      data: '¿Maneja datos de clientes o personales?',
      next: '¿Qué tienes planeado ahora?',
      uncertainty: '¿Qué es lo que más dudas te genera?',
      repository: 'URL del repositorio',
      optional: '(opcional)',
      name: 'Tu nombre',
      email: 'Email',
      honeypot: 'Deja este campo vacío',
    },
    hints: {
      productUrl:
        'Un enlace en vivo o una vista previa accesible públicamente.',
      repository:
        'Todavía no hace falta acceso. Nunca incluyas contraseñas, claves ni registros de clientes.',
      free: 'Enviar esta solicitud es gratis. Cualquier trabajo de pago lo acordamos contigo antes.',
    },
    placeholders: {
      productUrl: 'https://tu-producto.com',
      description: '¿Para quién es? ¿Qué les ayuda a hacer?',
      uncertainty: 'Eso sobre lo que te gustaría un segundo par de ojos.',
    },
    chooseTool: 'Elige tu herramienta principal',
    chooseOne: 'Elige una opción',
    options: {
      users: ['No', 'Usuarios beta', 'Sí'],
      payments: ['No', 'Pronto', 'Sí'],
      data: ['Sí', 'No', 'No lo sé'],
      next: [
        'Pruebas privadas',
        'Beta pública',
        'Lanzamiento',
        'Empezar a cobrar',
        'Escalar usuarios actuales',
        'Otra cosa',
      ],
    },
    brief: 'Tu resumen',
    editBrief: 'Editar datos',
    consent: {
      before: 'He leído el ',
      link: 'aviso de privacidad',
      after: ' y acepto que me contactéis sobre esta solicitud.',
    },
    errorTitle: 'Vamos a revisar eso.',
    sending: 'Enviando tu solicitud. Por favor, no cierres esta pestaña.',
    back: 'Atrás',
    continue: 'Continuar',
    submit: 'Enviar mi solicitud',
    success: {
      eyebrow: 'A salvo, al otro lado.',
      title: ['Recibido.', 'Ahora nos toca a nosotros.'],
      body: {
        before:
          'Tu solicitud ya está aquí. Víctor revisará el producto y responderá a ',
        fallback: 'el email que has compartido',
        after: '.',
      },
      nextTitle: '¿Qué pasa ahora?',
      nextCopy:
        'Una conversación sobre encaje, alcance y tiempos. Ningún trabajo de pago empieza sin que lo acuerdes.',
      link: 'Un poco de claridad mientras tanto',
    },
  },
  legal: {
    eyebrow: 'Real product / Legal',
    updated: 'Última actualización:',
  },
};
