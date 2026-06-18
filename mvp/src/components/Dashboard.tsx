import KpiCard from './KpiCard'
import ObjectiveCard from './ObjectiveCard'
import ProgressTrendChart from './charts/ProgressTrendChart'
import TasksStatusChart from './charts/TasksStatusChart'
import WorkloadByRegionChart from './charts/WorkloadByRegionChart'
import { IconTrendUp, IconUsers, IconAlertTriangle } from './icons'
import type { Resource, Summary, TasksByProject, ProgressPoint } from '../types'

interface DashboardProps {
  projects: never[]       // No se usa — la Opción C no gestiona proyectos directamente
  resources: Resource[]   // Equipo distribuido en las 3 regiones
  summary: Summary        // KPIs calculados por el backend
  tasksByProject: TasksByProject // Tareas agrupadas por proyecto cliente
  history: ProgressPoint[]      // Historial de avance para el gráfico de línea
}

export default function Dashboard({ resources, summary, tasksByProject, history }: DashboardProps) {

  // Aplana todas las tareas de los 3 proyectos
  const allTasks = Object.values(tasksByProject).flat()
  const totalTareas = allTasks.length
  const tareasCompletadas = allTasks.filter(t => t.status === 'done').length

  // Porcentaje de tareas completadas sobre el total
  const porcentajeCompletado = totalTareas === 0 ? 0 : Math.round((tareasCompletadas / totalTareas) * 100)

  // Genera alertas automáticas para recursos con carga > 100%
  const alerts: string[] = []
  resources.forEach((r) => {
    const percent = Math.round((r.allocatedHours / r.capacityHours) * 100)
    if (percent > 100) {
      alerts.push(`${r.name} (${r.region}): carga de ${percent}% — sobrecarga crítica.`)
    }
  })

  return (
    <div className="view">

      {/* KPIs — métricas principales del sistema */}
      <section className="kpi-grid">
        <KpiCard label="Tareas completadas" value={porcentajeCompletado} suffix="%" icon={IconTrendUp} tone="primary" />
        <KpiCard label="Total recursos" value={resources.length} icon={IconUsers} tone="teal" />
        <KpiCard label="Recursos en sobrecarga" value={Math.round(summary.overloadedPercent)} suffix="%" icon={IconAlertTriangle} tone="red" />
        <KpiCard label="Equipos en carga óptima" value={Math.round(summary.optimoPercent)} suffix="%" icon={IconUsers} tone="amber" />
      </section>

      {/* Alertas — solo se muestran si hay recursos en sobrecarga */}
      {alerts.length > 0 && (
        <section className="alerts">
          <h2 className="section-title">Alertas automáticas</h2>
          <ul className="alerts__list">
            {alerts.map((a, i) => (
              <li key={i} className="alerts__item">
                <IconAlertTriangle className="alerts__icon" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Objetivos — progreso hacia las metas del sistema */}
      <section className="objectives-grid">
        {/* Avance global de tareas completadas */}
        <ObjectiveCard
          title="Avance de tareas"
          value={`${porcentajeCompletado}%`}
          objectiveLabel="Meta: 100% de tareas completadas"
          percent={porcentajeCompletado}
          tone="primary"
        />
        {/* Porcentaje del equipo con carga balanceada */}
        <ObjectiveCard
          title="Equipos en carga óptima"
          value={`${Math.round(summary.optimoPercent)}%`}
          objectiveLabel="Meta: 100% del equipo en carga balanceada"
          percent={summary.optimoPercent}
          tone={summary.optimoPercent >= 60 ? 'teal' : 'amber'}
        />
        {/* Total de personas activas en el sistema */}
        <ObjectiveCard
          title="Recursos activos"
          value={`${resources.length}`}
          objectiveLabel="Equipo distribuido en 3 regiones"
          percent={resources.length > 0 ? 100 : 0}
          tone="teal"
        />
      </section>

      {/* Gráficos — evolución del avance y estado de tareas */}
      <section className="charts-grid">
        {/* Línea de evolución del % completado en el tiempo */}
        <ProgressTrendChart data={history} />
        {/* Barras con cantidad de tareas por estado (global) */}
        <TasksStatusChart tasksByProject={tasksByProject} />
      </section>

      {/* Gráfico de carga laboral por región */}
      <section className="charts-grid">
        <WorkloadByRegionChart resources={resources} />
      </section>

    </div>
  )
}