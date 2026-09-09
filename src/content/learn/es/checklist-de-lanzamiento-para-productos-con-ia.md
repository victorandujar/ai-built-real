---
title: 'La checklist de lanzamiento para productos hechos con IA'
description: 'Una checklist por etapas para tu primer lanzamiento: cuentas, datos, pagos, recuperación y la evidencia que conviene reunir antes de invitar usuarios.'
category: 'Guía de lanzamiento'
published: '2026-09-07'
order: 2
draft: false
translationKey: 'launch-checklist'
---

Una checklist sirve cuando cambia lo que haces. Se convierte en ruido cuando trata cada detalle sin terminar como un bloqueante de lanzamiento.

Usa esta para un producto que ya funciona y has construido con IA. Marca cada punto como **comprobado**, **necesita trabajo**, **no aplica** o **sin probar aún**. Añade evidencia. Decide qué puntos sin resolver importan para este lanzamiento concreto.

## 1. Escribe la promesa del lanzamiento

Nombra el público, el trabajo principal y el tamaño del lanzamiento. «Invitar a diez usuarios beta a crear y compartir un proyecto de prueba» es lo bastante concreto para evaluarlo. «Lanzar la plataforma» no lo es.

Enumera lo que este lanzamiento no soporta. Si los pagos no están disponibles o un flujo todavía necesita ayuda manual, díselo claramente a las personas invitadas. Un límite honesto evita que una función que falta se convierta en una promesa rota.

## 2. Verifica el primer recorrido útil

- Empieza con una cuenta nueva en un perfil de navegador limpio.
- Completa el registro y cualquier email de verificación.
- Llega al primer resultado útil sin que nadie del equipo te guíe.
- Sal, vuelve y confirma que el trabajo guardado sigue accesible.
- Prueba un estado vacío realista y una entrada inválida.
- Repite el camino esencial en una pantalla pequeña.

**Evidencia que guardar:** una grabación corta o una secuencia ordenada de pasos. Anota cualquier punto donde la interfaz dé por sabido algo que una persona nueva no sabe.

**Posible bloqueante:** la acción principal solo funciona con datos precargados por ti. Un desajuste estético suele poder esperar; no poder crear el primer resultado útil, no.

## 3. Comprueba identidad y acceso

Usa cuentas de prueba para cada rol soportado. Comprueba el inicio de sesión, el cierre de sesión, la recuperación de contraseña y las sesiones caducadas. Después prueba el acceso a los registros de otra cuenta a través de la petición de datos real, no solo desde la navegación visible.

El límite lo tiene que aplicar una política del servidor o de la base de datos. El código de cliente se entrega al navegador: no es un sitio donde esconder un secreto ni donde delegar una decisión de permisos.

Si tu producto usa Supabase, revisa las políticas de Row Level Security de las tablas expuestas, incluyendo lectura, inserción, actualización y borrado. La [guía oficial de RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) explica cómo interactúan las políticas con la autenticación. No copies una política sin entender qué filas permite.

**Posible bloqueante:** una clienta cualquiera puede leer o modificar los datos privados de otra. Corta esa exposición y busca ayuda adecuada antes de invitar a más gente.

## 4. Separa los datos de prueba de los reales

Confirma qué base de datos, qué cuenta de pagos y qué servicios externos usa cada entorno. Haz que el modo de pruebas sea visible para el equipo. Comprueba que los entornos locales o de vista previa no puedan modificar registros de producción por accidente.

Donde prometas conservar información importante, documenta cómo se respalda y cómo se restaura. Prueba la restauración en un entorno aislado. Tener activada una copia de seguridad no es lo mismo que tener evidencia de que la recuperación funciona.

**Evidencia que guardar:** un inventario de entornos sin valores secretos, más la fecha y el resultado de la última prueba de restauración relevante.

## 5. Sigue un pago más allá del checkout

Si el lanzamiento no cobra pagos, marca esta sección como no aplica. Si no, usa el modo de pruebas para comprobar:

- Un pago correcto concede el acceso previsto.
- Un pago fallido o abandonado no concede acceso.
- Un evento duplicado no repite una operación que solo debe ocurrir una vez.
- Una cancelación o un cambio de suscripción actualiza el estado del producto.
- Un evento que llega con retraso se puede procesar sin perder a la clienta.
- La clienta puede entender un intento fallido y recuperarse de él.

Stripe explica la verificación de firmas, los reintentos y el orden de los eventos en su [documentación de webhooks](https://docs.stripe.com/webhooks). Tu endpoint tiene que tratar el evento como una entrada de servidor que hay que verificar, y tu lógica tiene que contar con los reintentos. No te fíes solo de que el navegador llegue a una URL de éxito.

**Evidencia que guardar:** las referencias de los eventos de prueba y el estado correspondiente en tu aplicación. Usa los datos de prueba del proveedor, nunca la tarjeta de una clienta real.

## 6. Haz los fallos visibles y recuperables

Provoca un fallo seguro en un entorno de pruebas. Revisa el mensaje que ve la persona y la información de diagnóstico que recibes tú. ¿Puede reintentar sin duplicar un registro? ¿Se conserva el trabajo sin terminar allí donde debería?

Quita credenciales y datos personales innecesarios de los logs. Decide quién revisa los errores y cómo reporta un problema una persona usuaria. Escribe un procedimiento de respuesta breve para cuando se rompa un recorrido principal.

**Posible bloqueante:** una acción importante dice que ha ido bien mientras la operación de fondo falla en silencio.

## 7. Revisa la superficie pública

Revisa el título, la descripción, la URL canónica y la vista previa social de las páginas públicas. Mantén las páginas privadas de cuenta fuera de los resultados de búsqueda, pero recuerda que una directiva de robots no es un control de acceso.

Comprueba tu propio dominio, el HTTPS, la página de error y los enlaces de los emails de onboarding. Prueba la landing con una conexión lenta y en un móvil de verdad. Observa el comportamiento de carga y los saltos inesperados del diseño.

La [guía de iniciación al SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) es una buena referencia para que te encuentren. Los metadatos de búsqueda ayudan a que la gente llegue al producto; no sustituyen a probar el producto.

## 8. Ensaya el lanzamiento y la vuelta atrás

Ten claro qué cambio estás lanzando, cómo lo vas a verificar después de desplegar y qué harás si el recorrido principal deja de funcionar. Los cambios en la base de datos pueden necesitar un plan de recuperación distinto al del código. No des por hecho que revertir un despliegue deshace una migración de datos.

Después de desplegar, ejecuta un conjunto pequeño de comprobaciones inofensivas contra el entorno real. Observa los primeros recorridos de verdad. Aumenta la exposición a medida que crece la evidencia.

## La nota final del lanzamiento

Escribe tres listas cortas: **arreglado antes de lanzar**, **limitaciones conocidas**, **vigilar después de lanzar**. Pon a una persona responsable junto a cada punto que requiera acción.

Tu objetivo no es sacar un pleno. Es una promesa de lanzamiento que puedas cumplir, con una respuesta clara cuando la realidad te enseñe algo nuevo.

Si aún tienes que decidir qué cuenta como bloqueante, lee [cómo evaluar si estás listo para producción](/es/notas/tu-app-hecha-con-ia-esta-lista-para-produccion).
