import { computeWorkload, LEVEL_LABEL } from '../utils'
import type { Resource } from '../types'
import { API_BASE } from '../config/api'
import { useState } from 'react'

// Roles disponibles para el equipo de Innovatech
const ROLES = [
  'Project Manager',
  'Desarrollador Backend',
  'Desarrolladora Backend',
  'Desarrollador Frontend',
  'Full-stack Developer',
  'QA Analyst',
  'UX Designer',
]

// Regiones donde opera Innovatech (un proyecto por región)
const REGIONES = ['Silicon Valley', 'Europa', 'Asia']

interface ResourcesViewProps {
  resources: Resource[]          // Lista de recursos desde el backend
  onRefetch: () => Promise<void> // Recarga los datos tras crear o eliminar
}

/**
 * ResourcesView — vista de gestión de recursos humanos.
 * Permite agregar personas al equipo, ver su carga laboral
 * por región y eliminarlas si es necesario.
 */
export default function ResourcesView({ resources, onRefetch }: ResourcesViewProps) {

  // Regiones únicas presentes en los recursos actuales
  const regions = [...new Set(resources.map((r) => r.region))]

  // Estado del formulario de nuevo recurso
  const [form, setForm] = useState({
    nombre: '',
    rol: ROLES[0],
    region: REGIONES[0],
    capacidadHoras: 40,
    horasAsignadas: 0,
  })

  // Indica si se está guardando un recurso
  const [loading, setLoading] = useState(false)

  // Crea un nuevo recurso en el backend y recarga la lista
  async function handleCrear() {
    if (!form.nombre.trim()) return
    setLoading(true)
    try {
      await fetch(API_BASE.recursos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          rol: form.rol,
          region: form.region,
          capacidadHoras: form.capacidadHoras,
          horasAsignadas: form.horasAsignadas,
        }),
      })
      // Limpia el formulario tras guardar
      setForm({ nombre: '', rol: ROLES[0], region: REGIONES[0], capacidadHoras: 40, horasAsignadas: 0 })
      await onRefetch()
    } finally {
      setLoading(false)
    }
  }

  // Elimina un recurso del backend y recarga la lista
  async function handleEliminar(id: string) {
    await fetch(`${API_BASE.recursos}/${id}`, { method: 'DELETE' })
    await onRefetch()
  }

  return (
    <div className="view">

      {/* Formulario para agregar un nuevo integrante al equipo */}
      <section className="form-card">
        <h2 className="section-title">Agregar recurso</h2>
        <div className="form-grid">

          {/* Nombre — solo acepta letras y espacios */}
          <div className="form-field">
            <label className="form-label">Nombre completo</label>
            <input
              className="form-input"
              placeholder="Ej: Ana Torres"
              value={form.nombre}
              onChange={e => {
                const valor = e.target.value
                if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(valor)) {
                  setForm(f => ({ ...f, nombre: valor }))
                }
              }}
            />
          </div>

          {/* Rol — selección desde lista predefinida */}
          <div className="form-field">
            <label className="form-label">Rol</label>
            <select
              className="form-input"
              value={form.rol}
              onChange={e => setForm(f => ({ ...f, rol: e.target.value }))}
            >
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Región — determina a qué equipo pertenece */}
          <div className="form-field">
            <label className="form-label">Región</label>
            <select
              className="form-input"
              value={form.region}
              onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
            >
              {REGIONES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Capacidad máxima de horas por semana */}
          <div className="form-field">
            <label className="form-label">Horas/semana</label>
            <input
              className="form-input"
              type="number"
              min={1}
              max={60}
              value={form.capacidadHoras}
              onChange={e => setForm(f => ({ ...f, capacidadHoras: Number(e.target.value) }))}
            />
          </div>

          {/* Horas actualmente asignadas al recurso */}
          <div className="form-field">
            <label className="form-label">Horas asignadas</label>
            <input
              className="form-input"
              type="number"
              min={0}
              max={60}
              value={form.horasAsignadas}
              onChange={e => setForm(f => ({ ...f, horasAsignadas: Number(e.target.value) }))}
            />
          </div>

          {/* Botón de acción alineado al fondo del campo */}
          <div className="form-field form-field--action">
            <label className="form-label">&nbsp;</label>
            <button className="btn-primary" onClick={handleCrear} disabled={loading}>
              {loading ? 'Guardando...' : '+ Agregar recurso'}
            </button>
          </div>

        </div>
      </section>

      {/* Mensaje cuando no hay recursos registrados */}
      {resources.length === 0 && (
        <p className="empty-state">No hay recursos aún. Agrega el primero usando el formulario.</p>
      )}

      {/* Lista de recursos agrupados por región */}
      {regions.map((region) => (
        <section key={region} className="resource-group">
          <h2 className="section-title">{region}</h2>
          <div className="resource-list">
            {resources.filter((r) => r.region === region).map((r) => {
              const { percent, level } = computeWorkload(r)
              return (
                <div className="resource-row" key={r.id}>

                  {/* Nombre y rol del recurso */}
                  <div className="resource-row__info">
                    <p className="resource-row__name">{r.name}</p>
                    <p className="resource-row__role">{r.role}</p>
                  </div>

                  {/* Horas asignadas vs capacidad total */}
                  <div className="resource-row__hours">
                    <span className="resource-row__hours-text">
                      {r.allocatedHours}h / {r.capacityHours}h
                    </span>
                  </div>

                  {/* Barra de carga con color según nivel */}
                  <div className="resource-row__bar">
                    <div className="progress-track progress-track--wide">
                      <div
                        className={`progress-fill progress-fill--${level}`}
                        style={{ width: `${Math.min(100, percent)}%` }}
                      />
                    </div>
                    <span className="mono">{percent}%</span>
                  </div>

                  {/* Badge: Óptimo / Sobrecarga / Subutilizado */}
                  <span className={`badge badge--${level}`}>{LEVEL_LABEL[level]}</span>

                  {/* Botón para eliminar el recurso */}
                  <button className="btn-danger" onClick={() => handleEliminar(r.id)}>✕</button>

                </div>
              )
            })}
          </div>
        </section>
      ))}

    </div>
  )
}