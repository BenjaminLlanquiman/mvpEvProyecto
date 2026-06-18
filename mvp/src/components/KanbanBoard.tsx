import { useState } from 'react'
import { columns } from '../data/mockData'
import { API_BASE } from '../config/api'
import type { TasksByProject, TaskStatus } from '../types'

interface KanbanBoardProps {
  tasksByProject: TasksByProject
  onMoveTask: (projectId: string, taskId: string, status: TaskStatus) => void
  onRefetch: () => Promise<void>
}

export default function KanbanBoard({ tasksByProject, onMoveTask, onRefetch }: KanbanBoardProps) {
  const allProjects = ['Recursos', 'Dashboard', 'Tareas']
  const [activeProject, setActiveProject] = useState<string>('Recursos')
  const [dragId, setDragId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const tasks = tasksByProject[activeProject] || []

  function handleDrop(status: TaskStatus) {
    if (dragId) {
      onMoveTask(activeProject, dragId, status)
      setDragId(null)
    }
  }

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

  async function handleEliminarTarea(id: string) {
    await fetch(`${API_BASE.tareas}/${id}`, { method: 'DELETE' })
    await onRefetch()
  }

  return (
    <div className="view">
      {/* Tabs proyectos */}
      <div className="tabs">
        {allProjects.map((id) => (
  <button key={id}
    className={`tabs__item ${activeProject === id ? 'is-active' : ''}`}
    onClick={() => setActiveProject(id)}>
    Módulo {id}
  </button>
    ))}
      </div>

      {/* Formulario nueva tarea */}
      <div className="form-card form-card--inline">
        <input className="form-input form-input--grow" placeholder="Nueva tarea..."
          value={newTitle} onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCrearTarea()} />
        <button className="btn-primary" onClick={handleCrearTarea} disabled={loading}>
          {loading ? 'Guardando...' : '+ Agregar tarea'}
        </button>
      </div>

      {/* Kanban */}
      <div className="kanban">
        {columns.map((col) => (
          <div className="kanban__column" key={col.key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.key)}>
            <h3 className="kanban__column-title">
              {col.label}
              <span className="kanban__count">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </h3>
            <div className="kanban__cards">
              {tasks.filter((t) => t.status === col.key).map((t) => (
                <div className="kanban__card" key={t.id} draggable
                  onDragStart={() => setDragId(t.id)}>
                  <div className="kanban__card-header">
                    <p className="kanban__card-id">{t.id}</p>
                    <button className="btn-icon" onClick={() => handleEliminarTarea(t.id)}>✕</button>
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