import KpiCard from './KpiCard'
import ProjectCard from './ProjectCard'
import ObjectiveCard from './ObjectiveCard'
import ProgressTrendChart from './charts/ProgressTrendChart'
import TasksStatusChart from './charts/TasksStatusChart'
import BudgetDistributionChart from './charts/BudgetDistributionChart'
import WorkloadByRegionChart from './charts/WorkloadByRegionChart'
import { IconTrendUp, IconWallet, IconAlertTriangle, IconUsers } from './icons'
import { formatCLP } from '../utils'
import type { Project, Resource, Summary, TasksByProject, ProgressPoint } from '../types'

interface DashboardProps {
  projects: Project[]
  resources: Resource[]
  summary: Summary
  tasksByProject: TasksByProject
  history: ProgressPoint[]
}

export default function Dashboard({ projects, resources, summary, tasksByProject, history }: DashboardProps) {
  const alerts: string[] = []

  projects.forEach((p) => {
    if (p.status === 'En riesgo') {
      alerts.push(`Proyecto ${p.id} — ${p.name}: avance por debajo de lo planificado.`)
    }
  })

  resources.forEach((r) => {
    const percent = Math.round((r.allocatedHours / r.capacityHours) * 100)
    if (percent > 110) {
      alerts.push(`${r.name} (${r.region}): carga de ${percent}% — sobrecarga crítica.`)
    }
  })

  const budgetTone: 'red' | 'teal' = summary.budgetPercent > 90 ? 'red' : 'teal'
  const balanceTone: 'teal' | 'amber' = summary.optimoPercent >= 60 ? 'teal' : 'amber'

  return (
    <div className="view">
      <section className="kpi-grid">
        <KpiCard label="Avance promedio" value={Math.round(summary.avgProgress)} suffix="%" icon={IconTrendUp} tone="primary" />
        <KpiCard label="Presupuesto consumido" value={formatCLP(summary.totalSpent)} icon={IconWallet} tone="teal" />
        <KpiCard label="Proyectos en riesgo" value={summary.atRisk} icon={IconAlertTriangle} tone="red" />
        <KpiCard label="Equipos con sobrecarga" value={Math.round(summary.overloadedPercent)} suffix="%" icon={IconUsers} tone="amber" />
      </section>

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

      <section className="objectives-grid">
        <ObjectiveCard
          title="Avance general de proyectos"
          value={`${Math.round(summary.avgProgress)}%`}
          objectiveLabel="Meta: 100% (cierre del proyecto)"
          percent={summary.avgProgress}
          tone="primary"
        />
        <ObjectiveCard
          title="Ejecución presupuestaria"
          value={formatCLP(summary.totalSpent)}
          objectiveLabel={`Presupuesto total asignado: ${formatCLP(summary.totalBudget)}`}
          percent={summary.budgetPercent}
          tone={budgetTone}
        />
        <ObjectiveCard
          title="Equipos en carga óptima"
          value={`${Math.round(summary.optimoPercent)}%`}
          objectiveLabel="Meta: 100% del equipo en carga balanceada"
          percent={summary.optimoPercent}
          tone={balanceTone}
        />
      </section>

      <section className="charts-grid">
        <ProgressTrendChart data={history} />
        <TasksStatusChart tasksByProject={tasksByProject} />
      </section>

      <section className="charts-grid">
        <BudgetDistributionChart projects={projects} />
        <WorkloadByRegionChart resources={resources} />
      </section>

      <section>
        <h2 className="section-title">Proyectos activos</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  )
}