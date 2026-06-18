import { useEffect, useState } from 'react'
import { API_BASE } from '../config/api'
import type { Resource, Summary, TasksByProject, ProgressPoint } from '../types'

const TICK_MS = 5000

function timeLabel(): string {
  return new Date().toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export default function useLiveData() {
  const [resources, setResources] = useState<Resource[]>([])
  const [tasksByProject, setTasksByProject] = useState<TasksByProject>({})
  const [summary, setSummary] = useState<Summary>({
    avgProgress: 0,
    totalBudget: 0,
    totalSpent: 0,
    budgetPercent: 0,
    atRisk: 0,
    overloadedPercent: 0,
    underusedPercent: 0,
    optimoPercent: 0,
  })
  const [history, setHistory] = useState<ProgressPoint[]>([])
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now())
  const [connected, setConnected] = useState(false)

  async function fetchDashboard() {
    try {
      const res = await fetch(API_BASE.dashboard)
      if (!res.ok) throw new Error('Error al obtener dashboard')
      const data = await res.json()

      // Recursos
      const recursos: Resource[] = (data.recursos || []).map((r: any) => ({
        id: String(r.id),
        name: r.nombre,
        role: r.rol,
        region: r.region,
        capacityHours: r.capacidadHoras,
        allocatedHours: r.horasAsignadas,
      }))
      setResources(recursos)

      // Tareas por proyecto
      const tareas: TasksByProject = {}
      for (const [proyectoId, lista] of Object.entries(data.tareasPorProyecto || {})) {
        tareas[proyectoId] = (lista as any[]).map((t) => ({
          id: String(t.id),
          title: t.titulo,
          status: t.estado,
        }))
      }
      setTasksByProject(tareas)

      // Summary desde backend
      const s = data.summary
      const overloadedPct = recursos.length > 0
        ? (s.recursosSobrecargados / recursos.length) * 100
        : 0
      const optimoPct = recursos.length > 0
        ? (s.recursosOptimos / recursos.length) * 100
        : 0
      const underusedPct = recursos.length > 0
        ? (s.recursosSubutilizados / recursos.length) * 100
        : 0

      setSummary({
        avgProgress: s.porcentajeCompletado,
        totalBudget: 0,
        totalSpent: 0,
        budgetPercent: 0,
        atRisk: 0,
        overloadedPercent: overloadedPct,
        underusedPercent: underusedPct,
        optimoPercent: optimoPct,
      })

      // Historial
      setHistory((prev) => {
        const updated = [
          ...prev,
          { time: timeLabel(), avgProgress: s.porcentajeCompletado },
        ]
        return updated.length > 12 ? updated.slice(updated.length - 12) : updated
      })

      setLastUpdated(Date.now())
      setConnected(true)
    } catch (err) {
      console.error('Error conectando con el backend:', err)
      setConnected(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
    const id = setInterval(fetchDashboard, TICK_MS)
    return () => clearInterval(id)
  }, [])

  return {
    resources,
    tasksByProject,
    summary,
    history,
    lastUpdated,
    connected,
    refetch: fetchDashboard,
  }
}