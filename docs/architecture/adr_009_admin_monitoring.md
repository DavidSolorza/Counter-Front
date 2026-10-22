# ADR 009: Inspección y Monitoreo de Dashboards de Clientes desde el Panel de Administrador

## Estado
Aceptado

## Contexto
El requerimiento establece que el rol de Administrador debe poder tener su propia página de administración y, a su vez, poder ingresar a los dashboards de telemetría de los usuarios para monitorear su actividad y comportamiento en tiempo real.

## Decisión
1. Extender el modelo `ManagedUser` con el atributo `siteKey`.
2. Agregar un botón de acción rápida "Monitorear" en la tabla de usuarios de `AdminPanel`.
3. Reutilizar el componente `UserAnalyticsDashboard` pasándole como parámetro la `siteKey` y el nombre del usuario inspeccionado.
4. Mostrar un banner persistente en la parte superior que identifique el modo de auditoría activa y permita volver a la lista de usuarios con un clic.

## Consecuencias
- El Administrador puede supervisar la salud de cada cuenta de cliente de forma granular.
- No se requiere cerrar sesión ni simular credenciales ajenas.
- Se mantiene el límite estricto de menos de 150 líneas por archivo.
