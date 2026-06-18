export type Sector = 'Salud' | 'Finanzas' | 'Educación'
export type ProjectStatus = 'En riesgo' | 'En progreso' | 'Completado'
export type TaskStatus = 'todo' | 'inProgress' | 'review' | 'done'
export type WorkloadLevel = 'sobrecarga' | 'optimo' | 'subutilizado'
export type View = 'dashboard' | 'resources' | 'kanban'


export interface ProgressPoint {
  time: string
  avgProgress: number
}
export interface Project {
  id: string
  name: string
  client: string
  sector: Sector
  region: string
  status: ProjectStatus
  progress: number
  budgetTotal: number
  budgetSpent: number
  compliance: string[]
}

export interface Resource {
  id: string
  name: string
  role: string
  region: string
  capacityHours: number
  allocatedHours: number
}

export interface Task {
  id: string
  title: string
  status: TaskStatus
}

export type TasksByProject = Record<string, Task[]>

export interface Column {
  key: TaskStatus
  label: string
}

export interface Summary {
 avgProgress: number
  totalBudget: number
  totalSpent: number
  budgetPercent: number
  atRisk: number
  overloadedPercent: number
  underusedPercent: number
  optimoPercent: number
}