# Angular Universal 13 - Banco Azteca

Este proyecto es una aplicación Angular Universal (SSR) basada en Angular 13, que simula una pantalla de bienvenida para usuarios de Banco Azteca, permitiendo ingresar el nombre por voz o teclado, con validaciones y cifrado.

## Estructura del Proyecto

```
src/
  ├── app/
  │   ├── app.component.ts        # Componente principal, lógica de formulario y voz
  │   ├── app.component.html      # Vista principal, formulario y botones
  │   ├── app.component.scss      # Estilos del componente principal
  │   ├── app.module.ts           # Módulo raíz de la aplicación
  │   ├── app-routing.module.ts   # Rutas principales
  │   ├── services/
  │   │   ├── voice-recognition.service.ts  # Servicio para reconocimiento de voz
  │   │   └── encryption.service.ts         # Servicio para cifrado de datos
  │   └── shared/
  │       └── models/
  │           └── http.model.ts   # Modelos de datos compartidos
  ├── assets/                     # Imágenes y recursos estáticos
  ├── environments/               # Configuración de entornos
  ├── main.ts                     # Entrada principal del cliente
  ├── main.server.ts              # Entrada principal del servidor (SSR)
  └── styles.scss                 # Estilos globales
```

## Funcionalidad Principal

- **Pantalla de bienvenida**: Permite al usuario ingresar su nombre (máx. 15 caracteres alfanuméricos) por teclado o por voz.
- **Reconocimiento de voz**: Utiliza un servicio personalizado para capturar el nombre mediante el micrófono.
- **Validaciones**: El nombre debe tener entre 3 y 15 caracteres alfanuméricos.
- **Cifrado**: El nombre ingresado se cifra antes de ser procesado, usando un servicio propio.
- **SSR (Server Side Rendering)**: El proyecto está preparado para renderizado en servidor con Angular Universal.

## Scripts útiles

- `npm start` o `ng serve`: Levanta el servidor de desarrollo en `http://localhost:4200/`.
- `npm run build`: Compila la aplicación para producción.
- `npm run dev:ssr`: Levanta la app en modo SSR para desarrollo.
- `npm run build:ssr`: Compila la app y el servidor para SSR.
- `npm run serve:ssr`: Sirve la app compilada en modo SSR.
- `npm test`: Ejecuta los tests unitarios.

## Dependencias principales

- Angular 13.x
- @nguniversal/express-engine (SSR)
- Express (servidor Node para SSR)
- node-forge (cifrado)
- RxJS

## Cómo contribuir

1. Clona el repositorio: https://github.com/DanielCodexp/angular-universal-13.git
2. Instala dependencias con `npm install`.
3. Usa los scripts mencionados para desarrollo y pruebas.

## Notas adicionales

- El reconocimiento de voz puede requerir permisos del navegador.
- El cifrado es solo demostrativo, no debe usarse en producción sin revisión de seguridad.

## Ejecución con Docker

Para ejecutar la aplicación usando Docker, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

2. Construye y ejecuta los contenedores:
```bash
docker-compose up --build
```

3. La aplicación estará disponible en `http://localhost:4000`

Para detener los contenedores:
```bash
docker-compose down
```

### Notas sobre Docker
- La aplicación se ejecuta en modo producción dentro del contenedor
- El puerto 4000 está expuesto para acceder a la aplicación
- Los contenedores se reiniciarán automáticamente a menos que se detengan manualmente
