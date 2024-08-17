# Aplicación Ejecutable de Gestión de Tareas

Esta aplicación de escritorio ayuda a los usuarios a organizar y gestionar sus actividades diarias de manera eficiente. Permite a los usuarios añadir, visualizar, organizar y planificar sus tareas con facilidad, integrando funcionalidades como un calendario y filtros personalizados.

### Funcionalidades Principales

#### 1. **Añadir y Gestionar Tareas**

La funcionalidad central de esta aplicación es la gestión de tareas. Los usuarios pueden añadir nuevas tareas proporcionando un título, fecha límite y categoría. Estas tareas se muestran en una lista.

#### 2. **Integración con Calendario**

Para mejorar la planificación y organización, la aplicación incluye un calendario interactivo, construido con **FullCalendar**. Este calendario muestra las tareas programadas, permitiendo a los usuarios tener una visión clara de sus actividades mensuales, semanales y diarias.

- **Visualización de Tareas en el Calendario**: Las tareas se muestran en el calendario según su fecha límite, proporcionando una vista global de las actividades planificadas.
- **Interacción Directa**: Los usuarios pueden hacer clic en las fechas del calendario para ver o añadir tareas directamente desde esta vista.

#### 3. **Filtrado por Categorías**

Para facilitar la gestión de las tareas, la aplicación permite filtrar las tareas por categorías personalizadas. Esta funcionalidad es especialmente útil para usuarios que manejan múltiples proyectos o tipos de tareas, permitiendo una organización más estructurada.

#### 4. **Persistencia de Datos**

La aplicación guarda todas las tareas en un archivo JSON (`tasks.json`), lo que asegura que los datos se mantengan entre sesiones. Esta característica garantiza que las tareas no se pierdan al cerrar la aplicación.

### Tecnologías Utilizadas

- **Electron**: Framework para construir aplicaciones de escritorio multiplataforma con tecnologías web.
- **JavaScript**: Lenguaje de programación que maneja la lógica y las interacciones dentro de la aplicación.
- **HTML/CSS**: Para la estructura y el estilo de la interfaz de usuario.
- **FullCalendar**: Biblioteca de JavaScript para la gestión y visualización de calendarios interactivos.
- **Node.js**: Entorno de ejecución para manejar las funcionalidades del backend y la manipulación de archivos JSON.
- **JSON**: Formato de almacenamiento de datos para guardar las tareas de manera persistente.

2024
