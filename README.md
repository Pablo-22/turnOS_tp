# TurnOS

Bienvenido a la documentación del proyecto de la Clínica OnLine. En esta guía, encontrarás descripciones detalladas de las pantallas y funcionalidades de la aplicación web desarrollada en Angular, utilizando Firebase como backend. La Clínica OnLine es un sistema especializado en la gestión de consultorios médicos, laboratorios y turnos para pacientes y especialistas.

# Índice
- Introducción
- Pantallas
  - Página de Bienvenida
  - Registro
  - Login
  - Sección Usuarios
  - Mis Turnos (Paciente)
  - Mis Turnos (Especialista)
  - Turnos (Administrador)
  - Solicitar Turno
  - Mi Perfil
  - Mis Horarios
  - Requerimientos Mínimos
  - Captcha
  
# Introducción
La Clínica OnLine es una plataforma diseñada para facilitar la gestión de consultorios médicos y la programación de turnos entre pacientes y especialistas. Permite a los usuarios registrarse, acceder al sistema y realizar diversas tareas según su perfil (Paciente, Especialista o Administrador).

La aplicación se ha desarrollado utilizando Angular como framework de frontend y Firebase como backend. Firebase proporciona la infraestructura necesaria para almacenar y gestionar los datos de los usuarios, los turnos, las reseñas y otra información relevante para el funcionamiento de la clínica.

A continuación, se describirán en detalle las diferentes pantallas y funcionalidades de la aplicación.

# Pantallas
## Página de Bienvenida
La pantalla de bienvenida es la primera pantalla que se muestra al acceder a la aplicación. Proporciona una introducción a la Clínica OnLine y presenta los accesos al login y registro del sistema. Desde aquí, los usuarios pueden iniciar sesión si ya tienen una cuenta o registrarse si son nuevos en la plataforma.

[imagen]

# Registro
La pantalla de registro permite a los usuarios crear una cuenta en la Clínica OnLine. Hay dos tipos de registro disponibles: para Pacientes y para Especialistas.

# Registro de Pacientes
En esta sección, los usuarios pueden proporcionar la siguiente información para completar su registro como pacientes:

- Nombre
- Apellido
- Edad
- DNI
- Obra Social
- Correo electrónico
- Contraseña
- 2 imágenes para el perfil

[imagen]

## Registro de Especialistas
En esta sección, los usuarios pueden proporcionar la siguiente información para completar su registro como especialistas:

- Nombre
- Apellido
- Edad
- DNI
- Especialidad (pueden seleccionar una existente o agregar una nueva)
- Correo electrónico
- Contraseña
- Imagen de perfil
- 
[imagen]

## Login
La pantalla de inicio de sesión permite a los usuarios ingresar al sistema. Aquí, los usuarios pueden proporcionar sus credenciales de inicio de sesión y acceder a la plataforma.


**Pacientes:** Solo pueden ingresar si han verificado su correo electrónico al momento de registrarse.

**Especialistas:** Solo pueden ingresar si un usuario administrador ha aprobado su cuenta y ha verificado su correo electrónico.
La pantalla de inicio de sesión también muestra botones de acceso rápido para facilitar el inicio de sesión.

[imagen]

## Sección Usuarios
La sección de usuarios solo es visible para los usuarios con perfil de Administrador. Aquí, el administrador puede ver información detallada de los usuarios registrados y administrar su acceso al sistema. Además, desde esta sección, el administrador puede generar nuevos usuarios, incluyendo usuarios administradores.

Los campos requeridos para el registro de usuarios administradores son:

- Nombre
- Apellido
- Edad
- DNI
- Correo electrónico
- Contraseña
- Imagen de perfil
- 
[imagen]

## Mis Turnos (Paciente)
En la sección "Mis Turnos", los pacientes pueden ver y administrar los turnos que han solicitado. La pantalla presenta un filtro único que permite a los pacientes filtrar los turnos por especialidad y especialista. La lista de turnos muestra información relevante sobre cada turno, como la fecha, la hora y el estado actual.

Desde esta sección, los pacientes pueden realizar las siguientes acciones:

**Cancelar turno:** Solo visible si el turno no ha sido realizado. El paciente debe proporcionar un comentario explicando por qué se cancela el turno.

**Ver reseña:** Solo visible si el turno tiene un comentario o reseña cargado.

**Completar encuesta:** Solo visible si el especialista ha marcado el turno como realizado y ha dejado una reseña.

[imagen]

## Mis Turnos (Especialista)
En la sección "**Mis Turnos**", los especialistas pueden ver los turnos asignados a ellos. La pantalla también incluye un filtro único que permite a los especialistas filtrar los turnos por especialidad y paciente. La lista de turnos muestra información relevante sobre cada turno, como la fecha, la hora y el estado actual.

Desde esta sección, los especialistas pueden realizar las siguientes acciones:

**Cancelar turno:** Solo visible si el turno no ha sido aceptado, realizado o rechazado. El especialista debe proporcionar un comentario explicando por qué se cancela el turno.
<br>

**Rechazar turno:** Solo visible si el turno no ha sido aceptado, realizado o cancelado. El especialista debe proporcionar un comentario explicando por qué se rechaza el turno.
<br>

**Aceptar turno:** Solo visible si el turno no ha sido realizado, cancelado o rechazado.

**Finalizar turno:** Solo visible si el turno ha sido aceptado. El especialista debe dejar una reseña o comentario sobre la consulta y el diagnóstico realizado.

**Ver reseña:** Solo visible si el turno tiene un comentario o reseña cargado.

[imagen]

## Turnos (Administrador)
La sección "Turnos" es accesible solo para el administrador. Muestra los turnos de la clínica y permite filtrarlos por especialidad y especialista. La lista de turnos proporciona información detallada sobre cada turno, como la fecha, la hora, el paciente y el estado actual.

Desde esta sección, el administrador puede realizar las siguientes acciones:

**Cancelar turno:** Solo visible si el turno no ha sido aceptado, realizado o rechazado. El administrador debe proporcionar un comentario explicando por qué se cancela el turno.

**Solicitar turno:** Tanto el paciente como el administrador pueden acceder a esta sección para solicitar la carga de un nuevo turno. Se deben seleccionar la especialidad, el especialista y la fecha y hora del turno. Los pacientes pueden elegir un turno dentro de los próximos 15 días, y las fechas disponibles deben estar relacionadas con el especialista seleccionado y su disponibilidad horaria.

**Marcar paciente:** Solo visible para el administrador. Permite asignar un paciente a un turno.

[imagen]

## Mi perfil
La sección **"Mi perfil"** muestra los datos del usuario, como nombre, apellido, imágenes de perfil, etc. Esta sección está disponible para todos los usuarios.

[imagen]

## Mis horarios (Especialista)
La sección **"Mis horarios"** solo es visible para los usuarios con perfil de especialista. Aquí, los especialistas pueden marcar su disponibilidad horaria. Es importante tener en cuenta que un especialista puede tener más de una especialidad asociada.

[imagen]