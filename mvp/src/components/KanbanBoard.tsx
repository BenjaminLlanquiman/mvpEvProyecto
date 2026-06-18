import { useState } from 'react'
import { columns } from '../data/mockData'
import { API_BASE } from '../config/api'
import type { TasksByProject, TaskStatus } from '../types'

// Proyectos reales de Innovatech Solutions (Opción C — Implementación Híbrida)
// Cada proyecto corresponde a un cliente en una región distinta
const PROYECTOS = [
  { id: 'GestionPacientes', label: 'Gestión de Pacientes' }, // Red Hospitalaria — Silicon Valley
  { id: 'BancaMovil', label: 'Banca Móvil' },                // Banco Regional — Europa
  { id: 'ELearning', label: 'E-Learning' },                  // Universidad — Asia
]

interface KanbanBoardProps {
  tasksByProject: TasksByProject
  onMoveTask: (projectId: string, taskId: string, status: TaskStatus) => void
  onRefetch: () => Promise<void>
}

export default function KanbanBoard({ tasksByProject, onMoveTask, onRefetch }: KanbanBoardProps) {
  // Proyecto activo seleccionado en los tabs
  const [activeProject, setActiveProject] = useState<string>(PROYECTOS[0].id)

  // ID de la tarea que se está arrastrando en el Kanban
  const [dragId, setDragId] = useState<string | null>(null)

  // Texto del formulario para nueva tarea
  const [newTitle, setNewTitle] = useState('')

  // Estado de carga al guardar una tarea
  const [loading, setLoading] = useState(false)

  // Tareas del proyecto activo (vacío si no hay ninguna aún)
  const tasks = tasksByProject[activeProject] || []

  // Mueve una tarea a otra columna al soltar el drag
  function handleDrop(status: TaskStatus) {
    if (dragId) {
      onMoveTask(activeProject, dragId, status)
      setDragId(null)
    }
  }

  // Crea una nueva tarea en el backend y recarga los datos
  async function handleCrearTarea() {
    if (!newTitle.trim()) return
    setLoading(true)
    try {
      await fetch(API_BASE.tareas, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: newTitle.trim(),
          estado: 'todo',
          proyectoId: activeProject,
        }),
      })
      setNewTitle('')
      await onRefetch()
    } finally {
      setLoading(false)
    }
  }

  // Elimina una tarea del backend y recarga los datos
  async function handleEliminarTarea(id: string) {
    await fetch(`${API_BASE.tareas}/${id}`, { method: 'DELETE' })
    await onRefetch()
  }

  return (
    <div className="view">

      {/* Tabs — selector de proyecto cliente */}
      <div className="tabs">
        {PROYECTOS.map((p) => (
          <button
            key={p.id}
            className={`tabs__item ${activeProject === p.id ? 'is-active' : ''}`}
            onClick={() => setActiveProject(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Formulario para agregar nueva tarea al proyecto activo */}
      <div className="form-card form-card--inline">
        <input
          className="form-input form-input--grow"
          placeholder="Escribe el nombre de la nueva tarea..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCrearTarea()}
        />
        <button className="btn-primary" onClick={handleCrearTarea} disabled={loading}>
          {loading ? 'Guardando...' : '+ Agregar tarea'}
        </button>
      </div>

      {/* Tablero Kanban con 4 columnas: Por hacer / En progreso / En revisión / Completado */}
      <div className="kanban">
        {columns.map((col) => (
          <div
            className="kanban__column"
            key={col.key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.key)}
          >
            <h3 className="kanban__column-title">
              {col.label}
              <span className="kanban__count">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </h3>

            <div className="kanban__cards">
              {tasks
                .filter((t) => t.status === col.key)
                .map((t) => (
                  <div
                    className="kanban__card"
                    key={t.id}
                    draggable
                    onDragStart={() => setDragId(t.id)}
                  >
                    <div className="kanban__card-header">
                      <p className="kanban__card-id">#{t.id}</p>
                      <button
                        className="btn-icon"
                        onClick={() => handleEliminarTarea(t.id)}
                      >
                        ✕
                      </button>
                    </div>
                    <p>{t.title}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}