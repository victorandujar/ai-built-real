/**
 * Strings used by browser scripts. Kept apart from the page dictionaries so the
 * client bundle never ships the full site copy, and resolved from the `lang`
 * attribute the layout already renders.
 */
const en = {
  chooseOne: 'Choose one',
  motion: { pause: 'Pause motion', resume: 'Resume motion' },
  sculpture: {
    assemble: 'Bring it together',
    separate: 'See the parts',
    assembleLabel: 'Bring the sculpture together',
    separateLabel: 'Separate the sculpture',
    prototype: 'Prototype: separate parts.',
    product: 'Product: the parts come together.',
    pauseLabel: 'Pause 3D motion',
    resumeLabel: 'Resume 3D motion',
  },
  perspective: {
    front: 'Front perspective',
    side: 'Side perspective',
    partial: (value: number) => `Perspective ${value}%`,
  },
  findings: {
    why: 'Why it matters',
    next: 'Next action',
    items: [
      {
        why: 'A private project should stay private even when someone guesses its address.',
        next: 'Enforce ownership on the server, then repeat the same request from a second account.',
      },
      {
        why: 'A successful payment is not enough if the customer never receives access.',
        next: 'Make payment handling safe to repeat and provide a recovery path when the handoff fails.',
      },
      {
        why: 'An error that nobody sees can keep affecting people long after the first failure.',
        next: 'Capture the important failure and give the person operating the product enough context to respond.',
      },
      {
        why: 'The essential journey already helps a new user reach a useful result.',
        next: 'Keep it. Focus the next release on the blockers rather than rebuilding a working flow.',
      },
    ],
  },
  form: {
    stepNames: ['Your product', 'Your next step', 'Your details'],
    guidance: [
      'Three small steps. Start with your product.',
      'A little context helps us focus the review.',
      'One last step. Review your brief and leave your email.',
    ],
    briefCaptions: [
      '01 — Start with what you built.',
      '02 — Give it a direction.',
      '03 — Put a person behind it.',
    ],
    needsDetail: 'A little more detail needed. Check the highlighted fields.',
    reviewStage: (tool: string, next: string) =>
      `Built with ${tool} · Next: ${next}`,
    submit: 'Send my request',
    sendingLabel: 'Sending…',
    tryAgain: 'Try again',
    sending: 'Sending your request. Please keep this tab open.',
    stillSending: 'Still waiting for confirmation. Your details are safe here.',
    errors: {
      consent: 'Please agree before sending your request.',
      chooseOption: 'Choose an option to continue.',
      required: 'Please fill in this field.',
      urlCredentials: 'Use a full http or https URL without credentials.',
      url: 'Enter a full URL, like https://your-product.com.',
      email: 'Enter a valid email, like you@example.com.',
      description: 'Give us a little more detail (at least 10 characters).',
      name: 'Please enter at least 2 characters.',
      minLength: 'Add a little more detail (at least 5 characters).',
      generic: 'Please check this field.',
    },
    alerts: {
      tooMany: 'A few too many attempts.',
      unconfirmed: 'Your request has not been confirmed.',
      needsLook: 'Something needs another look.',
      undelivered: 'We couldn’t confirm delivery.',
      unavailable:
        'The service is temporarily unavailable. Your details are still here; please try again.',
      unexpected:
        'The server returned an unexpected response. Your details are still here. Please try again.',
      offline:
        'Check your connection and try again. Your details are still here; you do not need to fill them in again.',
      retry: 'Please try again in a moment. Your details are still here.',
    },
  },
};

const es: typeof en = {
  chooseOne: 'Elige una opción',
  motion: { pause: 'Pausar movimiento', resume: 'Reanudar movimiento' },
  sculpture: {
    assemble: 'Unir las piezas',
    separate: 'Ver las piezas',
    assembleLabel: 'Unir la escultura',
    separateLabel: 'Separar la escultura',
    prototype: 'Prototipo: piezas sueltas.',
    product: 'Producto: las piezas encajan.',
    pauseLabel: 'Pausar el movimiento 3D',
    resumeLabel: 'Reanudar el movimiento 3D',
  },
  perspective: {
    front: 'Perspectiva frontal',
    side: 'Perspectiva lateral',
    partial: (value: number) => `Perspectiva ${value}%`,
  },
  findings: {
    why: 'Por qué importa',
    next: 'Acción siguiente',
    items: [
      {
        why: 'Un proyecto privado debería seguir siendo privado aunque alguien adivine su dirección.',
        next: 'Comprueba la propiedad en el servidor y repite la misma petición desde una segunda cuenta.',
      },
      {
        why: 'Un pago correcto no basta si la clienta nunca recibe el acceso.',
        next: 'Haz que procesar el pago sea seguro de repetir y ofrece una vía de recuperación cuando el traspaso falle.',
      },
      {
        why: 'Un error que nadie ve puede seguir afectando a la gente mucho después del primer fallo.',
        next: 'Registra el fallo importante y da a quien opera el producto contexto suficiente para reaccionar.',
      },
      {
        why: 'El recorrido esencial ya lleva a una persona nueva a un resultado útil.',
        next: 'Déjalo como está. Dedica el próximo lanzamiento a los bloqueantes en vez de rehacer un flujo que funciona.',
      },
    ],
  },
  form: {
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
    needsDetail: 'Falta algo de detalle. Revisa los campos marcados.',
    reviewStage: (tool: string, next: string) =>
      `Hecho con ${tool} · Después: ${next}`,
    submit: 'Enviar mi solicitud',
    sendingLabel: 'Enviando…',
    tryAgain: 'Reintentar',
    sending: 'Enviando tu solicitud. Por favor, no cierres esta pestaña.',
    stillSending:
      'Seguimos esperando la confirmación. Tus datos están a salvo aquí.',
    errors: {
      consent: 'Acepta las condiciones antes de enviar tu solicitud.',
      chooseOption: 'Elige una opción para continuar.',
      required: 'Rellena este campo.',
      urlCredentials: 'Usa una URL http o https completa y sin credenciales.',
      url: 'Escribe una URL completa, como https://tu-producto.com.',
      email: 'Escribe un email válido, como tu@ejemplo.com.',
      description: 'Cuéntanos un poco más (al menos 10 caracteres).',
      name: 'Escribe al menos 2 caracteres.',
      minLength: 'Añade algo más de detalle (al menos 5 caracteres).',
      generic: 'Revisa este campo.',
    },
    alerts: {
      tooMany: 'Demasiados intentos seguidos.',
      unconfirmed: 'Tu solicitud no se ha confirmado.',
      needsLook: 'Hay algo que revisar.',
      undelivered: 'No hemos podido confirmar el envío.',
      unavailable:
        'El servicio no está disponible temporalmente. Tus datos siguen aquí; inténtalo de nuevo.',
      unexpected:
        'El servidor ha devuelto una respuesta inesperada. Tus datos siguen aquí. Inténtalo de nuevo.',
      offline:
        'Revisa tu conexión e inténtalo otra vez. Tus datos siguen aquí; no hace falta que los vuelvas a escribir.',
      retry: 'Inténtalo de nuevo en un momento. Tus datos siguen aquí.',
    },
  },
};

const dictionaries = { en, es };

export type ClientStrings = typeof en;

export function clientStrings(): ClientStrings {
  const lang = document.documentElement.lang.slice(0, 2);
  return lang === 'es' ? dictionaries.es : dictionaries.en;
}
