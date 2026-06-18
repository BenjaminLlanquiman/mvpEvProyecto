import type { FC, SVGProps } from 'react'
import { IconHeart, IconBank, IconCap } from './icons'
import { formatCLP } from '../utils'
import type { Project, Sector, ProjectStatus } from '../types'

const SECTOR_ICON: Record<Sector, FC<SVGProps<SVGSVGElement>>> = {
  Salud: IconHeart,
  Finanzas: IconBank,
  Educación: IconCap,
}

const STATUS_TONE: Record<ProjectStatus, string> = {
  'En riesgo': 'red',
  'En progreso': 'amber',
  Completado: 'teal',
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = SECTOR_ICON[project.sector]
  const budgetPercent = Math.min(100, Math.round((project.budgetSpent / project.budgetTotal) * 100))

  return (
    <article className="project-card">
      <header className="project-card__header">
        <div className="project-card__sector">
          {Icon && <Icon className="project-card__sector-icon" />}
          <span>{project.sector}</span>
        </div>
        <span className={`badge badge--${STATUS_TONE[project.status]}`}>{project.status}</span>
      </header>

      <h3 className="project-card__title">{project.name}</h3>
      <p className="project-card__client">
        {project.client} · {project.region}
      </p>

      <div className="project-card__metric">
        <div className="project-card__metric-head">
          <span>Avance</span>
          <span className="mono">{Math.round(project.progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill progress-fill--primary" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="project-card__metric">
        <div className="project-card__metric-head">
          <span>Presupuesto</span>
          <span className="mono">
            {formatCLP(project.budgetSpent)} / {formatCLP(project.budgetTotal)}
          </span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${budgetPercent > 90 ? 'progress-fill--red' : 'progress-fill--teal'}`}
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
      </div>

      <footer className="project-card__footer">
        {project.compliance.map((c) => (
          <span className="tag" key={c}>
            {c}
          </span>
        ))}
      </footer>
    </article>
  )
}