import { useEffect, useState } from 'react'
import { API_BASE } from '../config/api'
import type { Resource, Summary, TasksByProject, ProgressPoint } from '../types'

// Intervalo de actualización automática en milisegundos (5 segundos)
const TICK_MS = 5000

// Genera una etiqueta de tiempo legible para el historial del gráfico
function timeLabel(): string {
  return new Date().toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

/**
 * useLiveData — hook principal de datos en tiempo real.
 * Consulta el ms-dashboard cada 5 segundos y actualiza
 * recursos, tareas, KPIs e historial de avance.
 * Expone `connected` para mostrar el estado de conexión en el TopBar.
 */
export default function useLiveData() {

  // Lista de recursos del equipo distribuido
  const [resources, setResources] = useState<Resource[]>([])

  // Tareas agrupadas por proyecto (GestionPacientes, BancaMovil, ELearning)
  const [tasksByProject, setTasksByProject] = useState<TasksByProject>({})

  // KPIs calculados por el backend (sobrecarga, óptimo, subutilizado)
  const [summary, setSummary] = useState<Summary>({
    avgProgress: 0,
    overloadedPercent: 0,
    underusedPercent: 0,
    optimoPercent: 0,
  })

  // Historial de avance para el gráfico de línea (máximo 12 puntos)
  const [history, setHistory] = useState<ProgressPoint[]>([])

  // Timestamp de la última actualización exitosa
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now())

  // true si el backend respondió correctamente en el último ciclo
  const [connected, setConnected] = useState(false)

  async function fetchDashboard() {
    try {
      const res = await fetch(API_BASE.dashboard)
      if (!res.ok) throw new Error('Error al obtener dashboard')
      const data = await res.json()

      // Mapea los recursos del backend (español) al modelo del frontend (inglés)
      const recursos: Resource[] = (data.recursos || []).map((r: any) => ({
        id: String(r.id),
        name: r.nombre,
        role: r.rol,
        region: r.region,
        capacityHours: r.capacidadHoras,
        allocatedHours: r.horasAsignadas,
      }))
      setResources(recursos)

      // Mapea las tareas agrupadas por proyectoId
      const tareas: TasksByProject = {}
      for (const [proyectoId, lista] of Object.entries(data.tareasPorProyecto || {})) {
        tareas[proyectoId] = (lista as any[]).map((t) => ({
          id: String(t.id),
          title: t.titulo,
          status: t.estado,
        }))
      }
      setTasksByProject(tareas)

      // Calcula los porcentajes de carga laboral desde el summary del backend
      const s = data.summary
      const overloadedPct = recursos.length > 0 ? (s.recursosSobrecargados / recursos.length) * 100 : 0
      const optimoPct     = recursos.length > 0 ? (s.recursosOptimos / recursos.length) * 100 : 0
      const underusedPct  = recursos.length > 0 ? (s.recursosSubutilizados / recursos.length) * 100 : 0

      setSummary({
        avgProgress: s.porcentajeCompletado,
        overloadedPercent: overloadedPct,
        underusedPercent: underusedPct,
        optimoPercent: optimoPct,
      })

      // Agrega el punto actual al historial (mantiene máximo 12 puntos)
      setHistory((prev) => {
        const updated = [...prev, { time: timeLabel(), avgProgress: s.porcentajeCompletado }]
        return updated.length > 12 ? updated.slice(updated.length - 12) : updated
      })

      setLastUpdated(Date.now())
      setConnected(true)

    } catch (err) {
      // Si falla la conexión, marca como desconectado (TopBar muestra "Reconectando…")
      console.error('Error conectando con el backend:', err)
      setConnected(false)
    }
  }

  // Ejecuta la primera carga y luego cada TICK_MS milisegundos
  useEffect(() => {
    fetchDashboard()
    const id = setInterval(fetchDashboard, TICK_MS)
    return () => clearInterval(id) // Limpia el intervalo al desmontar
  }, [])

  return {
    resources,
    tasksByProject,
    summary,
    history,
    lastUpdated,
    connected,
    refetch: fetchDashboard, // Permite forzar una actualización manual
  }
}