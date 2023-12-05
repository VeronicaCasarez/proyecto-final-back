# Proyecto Final: Desarrollo Backend

## Estructura de Directorios

El proyecto sigue una organización específica de directorios que facilita la comprensión y el mantenimiento del código. A continuación, se detalla la estructura general:

- **src/public**: Archivos públicos de la aplicación, como estilos CSS, imágenes y scripts JavaScript.

- **public/upload**: Repositorio de archivos subidos por los usuarios.

- **src/config**: Configuración de la aplicación, incluyendo configuraciones para `multer` y `passport`.

- **src/controller**: Directorio que alberga los controladores de la aplicación.

- **src/dao**: Configuración de persistencia de datos y modelos de datos.

- **src/docs**: Documentación relevante para el proyecto.

- **src/repositories**: Capas de acceso a datos.

- **src/routes**: Definición de rutas de la aplicación.

- **src/views**: Directorio que contiene todas las vistas del proyecto.

- **app.js**: Punto de entrada principal para la ejecución de la aplicación.


# Variables de Entorno

Para configurar y ejecutar la aplicación, se requiere el uso de variables de entorno. A continuación se detallan las variables necesarias y sus descripciones:

# Variables de Entorno

Para configurar correctamente la aplicación, debes definir las siguientes variables de entorno:

- **MONGO_URL**: URL de conexión a MongoDB para el entorno de desarrollo.

- **PORT**: Puerto en el que se ejecutará la aplicación (sugerido: 8080).

- **NAME_COOKIE**: Nombre de la cookie.

- **SECRET_COOKIE**: Clave secreta para cookies.

- **GITHUB_CLIENT_ID**: ID de cliente de la API de autenticación de GitHub.

- **GITHUB_CLIENT_SECRET**: Clave o secreto de la API de autenticación de GitHub.

- **GITHUB_CALLBACK_URL**: URL de devolución de llamada de GitHub.

- **USER_ADMIN**: Email del administrador (para propósitos de autenticación).

- **PASS_ADMIN**: Contraseña del administrador (para propósitos de autenticación).

- **NODE_ENV**: Entorno de ejecución de la aplicación (sugerido: development).

- **MAILING_USER**: Usuario del servicio de correo electrónico (para configuración de mailing).

- **MAILING_PASSWORD**: Contraseña del servicio de correo electrónico (para configuración de mailing).

- **MAILING_SERVICE**: Servicio de correo electrónico utilizado.


# Requisitos

Antes de comenzar a trabajar con la aplicación, asegúrate de tener los siguientes requisitos instalados en tu entorno de desarrollo:

- **Node.js**
- **MongoDB**

## Credenciales de Usuarios con Roles Asignados para Testing

### Productos Creados

Se han creado 16 productos con propietarios asignados.

### Usuarios y Roles

#### Credenciales de Administrador (Rol: "admin")

- **Email:** admin@gmail.com
- **Password:** 123

- **Email:** adminCoder@coder.com
- **Password:** 123

#### Credenciales de Usuario (Rol: "user")

- **Email:** alex@gmail.com
- **Password:** 123

#### Credenciales de Usuario Premium (Rol: "premium")

- **Email:** casaresveronica54@gmail.com
- **Password:** 123

Estas credenciales pueden ser utilizadas para realizar pruebas y verificar funcionalidades en diferentes roles dentro de la aplicación.

Asegúrate de utilizar las credenciales correspondientes al rol que necesites probar.
Tener en cuenta que el sistema puede eliminar usuarios por inactividad. Se estableció que los administradores no son eliminados por inactividad.

