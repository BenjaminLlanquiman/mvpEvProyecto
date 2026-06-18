import WorldClock from './WorldClock'
import { IconPulse } from './icons'
import type { View } from '../types'

// Título y subtítulo por cada vista del sistema
const TITLES: Record<View, [string, string]> = {
  dashboard: ['Dashboard', 'Visibilidad en tiempo real de los proyectos activos'],
  resources: ['Recursos', 'Carga de trabajo por equipo y región'],
  kanban: ['Proyectos', 'Estado de avance por tarea (vista Kanban)'],
}

interface TopBarProps {
  view: View          // Vista activa
  lastUpdated: number // Timestamp de la última actualización del backend
  connected: boolean  // Estado de conexión con el backend
}

/**
 * TopBar — barra superior del sistema.
 * Muestra el título de la vista activa, el reloj mundial
 * de las 3 regiones y el indicador de conexión en tiempo real.
 */
export default function TopBar({ view, lastUpdated, connected }: TopBarProps) {

  const [title, subtitle] = TITLES[view]

  // Segundos transcurridos desde la última actualización
  const seconds = Math.max(0, Math.round((Date.now() - lastUpdated) / 1000))

  return (
    <header className="topbar">

      {/* Título y descripción de la vista actual */}
      <div>
        <h1 className="topbar__title">{title}</h1>
        <p className="topbar__subtitle">{subtitle}</p>
      </div>

      <div className="topbar__right">

        {/* Reloj en tiempo real para Silicon Valley, Europa y Asia */}
        <WorldClock />

        {/* Indicador de conexión — verde si conectado, rojo si no */}
        <div className={`live-indicator ${connected ? '' : 'live-indicator--offline'}`}>
          <IconPulse className="live-indicator__icon" />
          <span>{connected ? 'En vivo' : 'Reconectando…'}</span>
          {connected && <span className="live-indicator__time">· hace {seconds}s</span>}
        </div>

      </div>
    </header>
  )
}