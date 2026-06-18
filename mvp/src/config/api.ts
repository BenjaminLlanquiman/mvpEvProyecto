/**
 * API_BASE — URLs base de los microservicios del backend.
 * Usa rutas relativas para que Nginx haga el proxy
 * al microservicio correspondiente según el path.
 *
 * /api/recursos  → ms-recursos (puerto 8081)
 * /api/tareas    → ms-tareas   (puerto 8082)
 * /api/dashboard → ms-dashboard (puerto 8083)
 */
export const API_BASE = {
  recursos: '/api/recursos',   // CRUD de integrantes del equipo
  tareas: '/api/tareas',       // CRUD de tareas del Kanban
  dashboard: '/api/dashboard', // Agrega datos de recursos y tareas
}