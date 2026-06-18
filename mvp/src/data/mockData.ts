import type { Column } from '../types'

// Columnas del tablero Kanban — definen los estados posibles de una tarea.
// Se usan en KanbanBoard.tsx y TasksStatusChart.tsx.
export const columns: Column[] = [
  { key: 'todo',       label: 'Por hacer'    }, // Tarea pendiente de iniciar
  { key: 'inProgress', label: 'En progreso'  }, // Tarea en desarrollo activo
  { key: 'review',     label: 'En revisión'  }, // Tarea en proceso de validación
  { key: 'done',       label: 'Completado'   }, // Tarea finalizada y aprobada
]