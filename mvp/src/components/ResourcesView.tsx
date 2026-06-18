import { computeWorkload, LEVEL_LABEL } from '../utils'
import type { Resource } from '../types'
import { API_BASE } from '../config/api'
import { useState } from 'react'

const ROLES = [
  'Project Manager',
  'Desarrollador Backend',
  'Desarrolladora Backend',
  'Desarrollador Frontend',
  'Full-stack Developer',
  'QA Analyst',
  'UX Designer',
]

const REGIONES = ['Silicon Valley', 'Europa', 'Asia']

interface ResourcesViewProps {
  resources: Resource[]
  onRefetch: () => Promise<void>
}

export default function ResourcesView({ resources, onRefetch }: ResourcesViewProps) {
  const regions = [...new Set(resources.map((r) => r.region))]
  const [form, setForm] = useState({
    nombre: '',
    rol: ROLES[0],
    region: REGIONES[0],
    capacidadHoras: 40,
    horasAsignadas: 0,
  })
  const [loading, setLoading] = useState(false)

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
      setForm({ nombre: '', rol: ROLES[0], region: REGIONES[0], capacidadHoras: 40, horasAsignadas: 0 })
      await onRefetch()
    } finally {
      setLoading(false)
    }
  }

  async function handleEliminar(id: string) {
    await fetch(`${API_BASE.recursos}/${id}`, { method: 'DELETE' })
    await onRefetch()
  }

  return (
    <div className="view">
      <section className="form-card">
        <h2 className="section-title">Agregar recurso</h2>
        <div className="form-grid">
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

          <div className="form-field form-field--action">
            <label className="form-label">&nbsp;</label>
            <button className="btn-primary" onClick={handleCrear} disabled={loading}>
              {loading ? 'Guardando...' : '+ Agregar recurso'}
            </button>
          </div>
        </div>
      </section>

      {resources.length === 0 && (
        <p className="empty-state">No hay recursos aún. Agrega el primero usando el formulario.</p>
      )}

      {regions.map((region) => (
        <section key={region} className="resource-group">
          <h2 className="section-title">{region}</h2>
          <div className="resource-list">
            {resources.filter((r) => r.region === region).map((r) => {
              const { percent, level } = computeWorkload(r)
              return (
                <div className="resource-row" key={r.id}>
                  <div className="resource-row__info">
                    <p className="resource-row__name">{r.name}</p>
                    <p className="resource-row__role">{r.role}</p>
                  </div>
                  <div className="resource-row__hours">
                    <span className="resource-row__hours-text">
                      {r.allocatedHours}h / {r.capacityHours}h
                    </span>
                  </div>
                  <div className="resource-row__bar">
                    <div className="progress-track progress-track--wide">
                      <div
                        className={`progress-fill progress-fill--${level}`}
                        style={{ width: `${Math.min(100, percent)}%` }}
                      />
                    </div>
                    <span className="mono">{percent}%</span>
                  </div>
                  <span className={`badge badge--${level}`}>{LEVEL_LABEL[level]}</span>
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