import KpiCard from './KpiCard'
import ObjectiveCard from './ObjectiveCard'
import ProgressTrendChart from './charts/ProgressTrendChart'
import TasksStatusChart from './charts/TasksStatusChart'
import WorkloadByRegionChart from './charts/WorkloadByRegionChart'
import { IconTrendUp, IconUsers, IconAlertTriangle } from './icons'
import type { Resource, Summary, TasksByProject, ProgressPoint } from '../types'

interface DashboardProps {
  projects: never[]
  resources: Resource[]
  summary: Summary
  tasksByProject: TasksByProject
  history: ProgressPoint[]
}

export default function Dashboard({ resources, summary, tasksByProject, history }: DashboardProps) {
  const allTasks = Object.values(tasksByProject).flat()
  const totalTareas = allTasks.length
  const tareasCompletadas = allTasks.filter(t => t.status === 'done').length
  const porcentajeCompletado = totalTareas === 0 ? 0 : Math.round((tareasCompletadas / totalTareas) * 100)

  const alerts: string[] = []
  resources.forEach((r) => {
    const percent = Math.round((r.allocatedHours / r.capacityHours) * 100)
    if (percent > 100) {
      alerts.push(`${r.name} (${r.region}): carga de ${percent}% — sobrecarga crítica.`)
    }
  })

  return (
    <div className="view">
      {/* KPIs */}
      <section className="kpi-grid">
        <KpiCard label="Tareas completadas" value={porcentajeCompletado} suffix="%" icon={IconTrendUp} tone="primary" />
        <KpiCard label="Total recursos" value={resources.length} icon={IconUsers} tone="teal" />
        <KpiCard label="Recursos en sobrecarga" value={Math.round(summary.overloadedPercent)} suffix="%" icon={IconAlertTriangle} tone="red" />
        <KpiCard label="Equipos en carga óptima" value={Math.round(summary.optimoPercent)} suffix="%" icon={IconUsers} tone="amber" />
      </section>

      {/* Alertas */}
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

      {/* Objetivos */}
      <section className="objectives-grid">
        <ObjectiveCard
          title="Avance de tareas"
          value={`${porcentajeCompletado}%`}
          objectiveLabel="Meta: 100% de tareas completadas"
          percent={porcentajeCompletado}
          tone="primary"
        />
        <ObjectiveCard
          title="Equipos en carga óptima"
          value={`${Math.round(summary.optimoPercent)}%`}
          objectiveLabel="Meta: 100% del equipo en carga balanceada"
          percent={summary.optimoPercent}
          tone={summary.optimoPercent >= 60 ? 'teal' : 'amber'}
        />
        <ObjectiveCard
          title="Recursos activos"
          value={`${resources.length}`}
          objectiveLabel="Equipo distribuido en 3 regiones"
          percent={resources.length > 0 ? 100 : 0}
          tone="teal"
        />
      </section>

      {/* Gráficos */}
      <section className="charts-grid">
        <ProgressTrendChart data={history} />
        <TasksStatusChart tasksByProject={tasksByProject} />
      </section>

      <section className="charts-grid">
        <WorkloadByRegionChart resources={resources} />
      </section>
    </div>
  )
}