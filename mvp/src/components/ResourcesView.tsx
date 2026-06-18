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
          <input
            className="form-input"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
          <select
            className="form-input"
            value={form.rol}
            onChange={e => setForm(f => ({ ...f, rol: e.target.value }))}
          >
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <select
            className="form-input"
            value={form.region}
            onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
          >
            {REGIONES.map(r => <option key={r}>{r}</option>)}
          </select>
          <input
            className="form-input"
            type="number"
            placeholder="Capacidad horas"
            value={form.capacidadHoras}
            onChange={e => setForm(f => ({ ...f, capacidadHoras: Number(e.target.value) }))}
          />
          <input
            className="form-input"
            type="number"
            placeholder="Horas asignadas"
            value={form.horasAsignadas}
            onChange={e => setForm(f => ({ ...f, horasAsignadas: Number(e.target.value) }))}
          />
          <button className="btn-primary" onClick={handleCrear} disabled={loading}>
            {loading ? 'Guardando...' : '+ Agregar'}
          </button>
        </div>
      </section>

      {resources.length === 0 && (
        <p className="empty-state">No hay recursos aún. Agrega el primero.</p>
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