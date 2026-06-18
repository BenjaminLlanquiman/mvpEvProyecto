// Vistas disponibles en el sistema
export type View = 'dashboard' | 'resources' | 'kanban'

// Estados posibles de una tarea en el Kanban
export type TaskStatus = 'todo' | 'inProgress' | 'review' | 'done'

// Nivel de carga laboral de un recurso
export type WorkloadLevel = 'sobrecarga' | 'optimo' | 'subutilizado'

// Punto del historial de avance para el gráfico de línea
export interface ProgressPoint {
  time: string        // Hora en formato HH:MM:SS
  avgProgress: number // Porcentaje de tareas completadas en ese momento
}

// Recurso humano del equipo de Innovatech
export interface Resource {
  id: string
  name: string
  role: string
  region: string          // Silicon Valley | Europa | Asia
  capacityHours: number   // Horas disponibles por semana
  allocatedHours: number  // Horas actualmente asignadas
}

// Tarea del tablero Kanban
export interface Task {
  id: string
  title: string
  status: TaskStatus
}

// Tareas agrupadas por ID de proyecto cliente
export type TasksByProject = Record<string, Task[]>

// Columna del tablero Kanban
export interface Column {
  key: TaskStatus // Identificador interno del estado
  label: string   // Nombre visible en la UI
}

// KPIs calculados por el ms-dashboard
export interface Summary {
  avgProgress: number       // Porcentaje de tareas completadas
  overloadedPercent: number // % de recursos con carga > 100%
  underusedPercent: number  // % de recursos con carga < 60%
  optimoPercent: number     // % de recursos con carga balanceada
}