---
title: '¿Qué cambia cuando tu prototipo recibe usuarios reales?'
description: 'Los usuarios reales traen otros datos, otros tiempos y otras expectativas. Así puedes preparar tu producto sin rehacerlo antes de haber aprendido.'
category: 'Pensamiento de producto'
published: '2026-09-07'
order: 3
draft: false
translationKey: 'real-users'
---

Un prototipo suele tener una usuaria extraordinariamente colaboradora: la persona que lo ha construido. Sabes qué espera cada campo, qué secuencia funciona y qué asperezas conviene esquivar.

Los usuarios reales no traen nada de ese contexto. Lo que sí traen son otros dispositivos, información incompleta y la expectativa razonable de que el producto haga lo que dice.

Este cambio no exige automáticamente una arquitectura nueva. Exige mejor evidencia sobre los recorridos que la gente usa de verdad.

## Tu conocimiento deja de tapar los huecos

Tú entiendes que una pantalla vacía significa «crea tu primer proyecto». Una persona nueva puede pensar que la aplicación no ha cargado. Tú sabes qué ajustes son opcionales. Ella puede detenerse porque no sabe qué responder en un campo.

Prueba a escribir un estado vacío con tres cosas: qué va aquí, por qué importa y una acción clara. Después observa si una persona nueva realiza esa acción sin ayuda.

En el onboarding, cuenta las decisiones que hay antes del primer resultado útil. Retrasa las que la persona todavía no puede responder bien. Un panel lleno de opciones suele ser menos útil que un camino corto hacia un resultado con éxito.

## El tiempo se vuelve impredecible

En una demo, ejecutas las acciones en el orden previsto. Los usuarios reales abren dos pestañas, vuelven a un enlace de ayer y pulsan un botón dos veces cuando parece que no pasa nada.

Coge una operación principal y escribe sus estados: sin empezar, en curso, con éxito y fallida. Después pregúntate qué pasa si el navegador desaparece entre dos estados cualesquiera. ¿Qué sistema sabe si la operación se completó?

En una herramienta de documentos, la preocupación puede ser el guardado duplicado. En una reserva de pago, puede ser cobrar dos veces o confirmar una plaza que ya no existe. Dedica esfuerzo en proporción a la consecuencia.

## «La usuaria» pasa a ser varias personas distintas

La cuenta de fundador suele tener permiso para hacerlo todo. La primera clienta no debería. La segunda clienta no debería heredar los datos de la primera.

Construye una matriz de roles pequeña. Pon las acciones en las filas y los roles en las columnas. En cada celda, escribe permitir o denegar. Incluye el acceso directo a los registros, no solo a las páginas que los contienen.

Prueba la matriz con cuentas separadas en un entorno controlado. Si una regla de acceso no está clara en la matriz, probablemente tampoco lo esté en el producto. Aclara el comportamiento deseado antes de tocar la implementación.

## Los datos adquieren un coste de estar mal

Perder un proyecto de ejemplo durante el desarrollo es una molestia. Perder el trabajo de una clienta cambia la relación. Un dato incorrecto puede ser peor que un error visible, porque alguien puede tomar decisiones con él.

Identifica los registros que a una persona le costaría mucho, o le sería imposible, volver a crear. Decide qué nivel de recuperación necesita la siguiente etapa. Eso puede significar probar la restauración de una copia, poner más difícil disparar una acción destructiva o guardar suficiente histórico para diagnosticar un cambio.

No copies información real de clientes a los entornos de prueba solo para que las pruebas sean realistas. Crea registros sintéticos representativos, con nombres largos, campos opcionales vacíos y entradas inusualmente grandes.

## El soporte pasa a formar parte del producto

Una forma clara de pedir ayuda forma parte de operar un software. La primera versión puede ser sencilla, pero alguien tiene que vigilarla.

Cuando llegue una incidencia, anota el recorrido, la hora aproximada, el resultado esperado y el resultado real. Pide solo la información necesaria para investigar. Un proceso de soporte que pide contraseñas o conjuntos completos de datos de clientes crea otro problema.

Fíjate en la confusión que se repite. Si varias personas hacen la misma pregunta, puede que la respuesta deba estar en la interfaz. Si varias personas chocan con el mismo fallo, prioriza la causa de fondo por encima de redactar una disculpa mejor.

## Escalar no es lo primero que hay que arreglar

Es tentador prepararse para un millón de usuarios cuando los diez primeros aún no han terminado el onboarding. Los problemas operativos tempranos suelen venir de suposiciones equivocadas, no de la carga.

Primero establece si los caminos importantes funcionan correctamente. Después observa qué partes se vuelven lentas o caras con el patrón de uso real. Un informe que se genera una vez al mes se comporta de forma muy distinta a uno que se genera con cada pulsación, aunque haya el mismo número de cuentas.

Pon límites básicos de gasto donde tus proveedores lo permitan y ten claro qué acciones disparan llamadas externas. Esto es especialmente relevante cuando una función llama a un modelo de pago. Ten a mano una forma sencilla de desactivar una función que resulte inesperadamente cara.

## Una rutina práctica para los primeros usuarios

Antes del primer grupo, escribe la promesa del lanzamiento y las limitaciones conocidas. Durante las primeras sesiones, observa dónde se detiene la gente y dónde le sorprende el sistema. Después de cada sesión, separa los hallazgos en tres listas:

1. **Corrección:** el producto hizo algo incorrecto o no hizo lo prometido.
2. **Comprensión:** puede que el producto funcione, pero la persona no sabe qué hacer ni qué ha pasado.
3. **Mejora:** una adición útil que no bloquea la promesa actual.

Arregla primero los problemas de corrección con consecuencias. Después mejora los momentos que impiden entender. Deja que la tercera lista compita con lo que aprendas de los siguientes usuarios.

La transición a producto real no es una única ceremonia. Es una secuencia de promesas, evidencia y ajustes. Mantén el siguiente paso lo bastante pequeño como para aprender de él y lo bastante sólido como para responder por él.

Usa [la checklist de lanzamiento](/es/notas/checklist-de-lanzamiento-para-productos-con-ia) para preparar ese siguiente paso, o [mira qué cubre un Reality Check](/es/reality-check) si quieres ayuda para valorar la evidencia.
