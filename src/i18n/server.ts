import type { Locale } from './config';

/** API replies rendered for the visitor, in the language they submitted from. */
const messages = {
  en: {
    wrongOrigin: 'Please submit from this website.',
    useForm: 'Use the product form.',
    tooLong: 'Your request is too long.',
    incomplete: 'Please complete the form.',
    checkForm: 'Please check your form and try again.',
    invalid: 'Please complete every required field with valid details.',
    rateLimited: 'Too many attempts. Please try again in ten minutes.',
    received:
      'Request received. We’ll review the fit and contact you by email.',
    unverifiedDev:
      'The sender domain is not verified in Resend. Verify the domain used in RESEND_FROM, then try again. Your details have not been sent.',
    unverified:
      'Email delivery is temporarily unavailable. Your details have not been sent. Please try again later.',
    notOpen:
      'Requests are not open yet. Your details have not been sent. Please try again later.',
    unconfirmed:
      'We could not confirm delivery. Please try again later. Your entries are still here.',
  },
  es: {
    wrongOrigin: 'Envía la solicitud desde esta web.',
    useForm: 'Usa el formulario del producto.',
    tooLong: 'Tu solicitud es demasiado larga.',
    incomplete: 'Completa el formulario.',
    checkForm: 'Revisa el formulario e inténtalo de nuevo.',
    invalid: 'Completa todos los campos obligatorios con datos válidos.',
    rateLimited: 'Demasiados intentos. Inténtalo de nuevo en diez minutos.',
    received:
      'Solicitud recibida. Revisaremos si encaja y te contactaremos por email.',
    unverifiedDev:
      'El dominio remitente no está verificado en Resend. Verifica el dominio de RESEND_FROM e inténtalo otra vez. Tus datos no se han enviado.',
    unverified:
      'El envío de emails no está disponible temporalmente. Tus datos no se han enviado. Inténtalo más tarde.',
    notOpen:
      'Todavía no aceptamos solicitudes. Tus datos no se han enviado. Inténtalo más tarde.',
    unconfirmed:
      'No hemos podido confirmar el envío. Inténtalo más tarde. Tus datos siguen aquí.',
  },
} as const;

export type ApiMessage = keyof (typeof messages)['en'];

/**
 * The submitted locale is trusted only after validation; before that, and for
 * transport-level rejections, fall back to the request's Accept-Language.
 */
export function localeFromRequest(request: Request): Locale {
  return /\bes\b/i.test(
    (request.headers.get('accept-language') || '').split(',')[0] || '',
  )
    ? 'es'
    : 'en';
}

export const apiMessage = (locale: Locale, key: ApiMessage) =>
  messages[locale][key];
