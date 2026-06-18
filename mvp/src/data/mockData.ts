import type { Project, Resource, Column, TasksByProject } from '../types'

export const projects: Project[] = [
  {
    id: 'A',
    name: 'Sistema de Gestión de Pacientes',
    client: 'Red Hospitalaria (Proyecto A)',
    sector: 'Salud',
    region: 'Silicon Valley',
    status: 'En riesgo',
    progress: 68,
    budgetTotal: 45000000,
    budgetSpent: 34000000,
    compliance: ['HIPAA'],
  },
  {
    id: 'B',
    name: 'Banca Móvil',
    client: 'Banco Regional (Proyecto B)',
    sector: 'Finanzas',
    region: 'Europa',
    status: 'En progreso',
    progress: 45,
    budgetTotal: 60000000,
    budgetSpent: 22000000,
    compliance: ['PCI-DSS', 'GDPR'],
  },
  {
    id: 'C',
    name: 'Plataforma E-Learning',
    client: 'Universidad (Proyecto C)',
    sector: 'Educación',
    region: 'Asia',
    status: 'En progreso',
    progress: 82,
    budgetTotal: 35000000,
    budgetSpent: 30000000,
    compliance: ['GDPR'],
  },
]

export const resources: Resource[] = [
  // Silicon Valley — Proyecto A
  { id: 'r1', name: 'Ana Torres', role: 'Project Manager', region: 'Silicon Valley', capacityHours: 40, allocatedHours: 46 },
  { id: 'r2', name: 'Carlos Méndez', role: 'Desarrollador Backend', region: 'Silicon Valley', capacityHours: 40, allocatedHours: 44 },
  { id: 'r3', name: 'Lucía Fernández', role: 'QA Analyst', region: 'Silicon Valley', capacityHours: 40, allocatedHours: 18 },
  // Europa — Proyecto B
  { id: 'r4', name: 'Marco Rossi', role: 'Desarrollador Frontend', region: 'Europa', capacityHours: 40, allocatedHours: 38 },
  { id: 'r5', name: 'Elena Petrova', role: 'Desarrolladora Backend', region: 'Europa', capacityHours: 40, allocatedHours: 50 },
  { id: 'r6', name: 'Sofía Dubois', role: 'QA Analyst', region: 'Europa', capacityHours: 40, allocatedHours: 20 },
  // Asia — Proyecto C
  { id: 'r7', name: 'Wei Zhang', role: 'Full-stack Developer', region: 'Asia', capacityHours: 40, allocatedHours: 42 },
  { id: 'r8', name: 'Priya Sharma', role: 'UX Designer', region: 'Asia', capacityHours: 40, allocatedHours: 16 },
  { id: 'r9', name: 'Kenji Sato', role: 'Project Manager', region: 'Asia', capacityHours: 40, allocatedHours: 36 },
]

export const columns: Column[] = [
  { key: 'todo', label: 'Por hacer' },
  { key: 'inProgress', label: 'En progreso' },
  { key: 'review', label: 'En revisión' },
  { key: 'done', label: 'Completado' },
]

export const initialTasks: TasksByProject = {
  A: [
    { id: 'A-1', title: 'Levantamiento de requerimientos con personal médico', status: 'done' },
    { id: 'A-2', title: 'Diseño de base de datos de pacientes (HIPAA)', status: 'done' },
    { id: 'A-3', title: 'Integración API laboratorio externo', status: 'inProgress' },
    { id: 'A-4', title: 'Módulo de historial clínico electrónico', status: 'inProgress' },
    { id: 'A-5', title: 'Pruebas de seguridad y cifrado (HIPAA)', status: 'review' },
    { id: 'A-6', title: 'Dashboard de ocupación de camas', status: 'todo' },
    { id: 'A-7', title: 'Capacitación a personal médico', status: 'todo' },
  ],
  B: [
    { id: 'B-1', title: 'Definición de requerimientos PCI-DSS', status: 'done' },
    { id: 'B-2', title: 'Wireframes de la app móvil', status: 'done' },
    { id: 'B-3', title: 'Desarrollo módulo de transferencias', status: 'inProgress' },
    { id: 'B-4', title: 'Autenticación biométrica', status: 'inProgress' },
    { id: 'B-5', title: 'Pruebas de carga', status: 'review' },
    { id: 'B-6', title: 'Integración pasarela de pagos', status: 'todo' },
    { id: 'B-7', title: 'Auditoría de seguridad GDPR', status: 'todo' },
  ],
  C: [
    { id: 'C-1', title: 'Arquitectura de la plataforma', status: 'done' },
    { id: 'C-2', title: 'Módulo de cursos y contenidos', status: 'done' },
    { id: 'C-3', title: 'Sistema de evaluaciones', status: 'done' },
    { id: 'C-4', title: 'Integración de videoconferencia', status: 'inProgress' },
    { id: 'C-5', title: 'Panel de analíticas para docentes', status: 'inProgress' },
    { id: 'C-6', title: 'Pruebas de accesibilidad', status: 'review' },
    { id: 'C-7', title: 'Migración de contenido piloto', status: 'todo' },
  ],
}