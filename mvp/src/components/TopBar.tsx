import WorldClock from './WorldClock'
import { IconPulse } from './icons'
import type { View } from '../types'

const TITLES: Record<View, [string, string]> = {
  dashboard: ['Dashboard', 'Visibilidad en tiempo real de los proyectos activos'],
  resources: ['Recursos', 'Carga de trabajo por equipo y región'],
  kanban: ['Proyectos', 'Estado de avance por tarea (vista Kanban)'],
}

interface TopBarProps {
  view: View
  lastUpdated: number
  connected: boolean
}

export default function TopBar({ view, lastUpdated, connected }: TopBarProps) {
  const [title, subtitle] = TITLES[view]
  const seconds = Math.max(0, Math.round((Date.now() - lastUpdated) / 1000))

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{title}</h1>
        <p className="topbar__subtitle">{subtitle}</p>
      </div>

      <div className="topbar__right">
        <WorldClock />
        <div className={`live-indicator ${connected ? '' : 'live-indicator--offline'}`}>
          <IconPulse className="live-indicator__icon" />
          <span>{connected ? 'En vivo' : 'Reconectando…'}</span>
          {connected && <span className="live-indicator__time">· hace {seconds}s</span>}
        </div>
      </div>
    </header>
  )
}