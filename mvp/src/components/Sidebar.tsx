import type { FC, SVGProps } from 'react'
import { IconGauge, IconUsers, IconLayoutGrid, IconPulse } from './icons'
import type { View } from '../types'

// Estructura de cada ítem de navegación
interface NavItem {
  key: View                          // Identificador de la vista
  label: string                      // Texto visible en el menú
  icon: FC<SVGProps<SVGSVGElement>>  // Ícono SVG asociado
}

// Ítems de navegación principal del sistema InnovaGest
const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: IconGauge },    // Vista de KPIs y gráficos
  { key: 'resources', label: 'Recursos', icon: IconUsers },      // Gestión del equipo
  { key: 'kanban', label: 'Proyectos', icon: IconLayoutGrid },   // Tablero de tareas
]

interface SidebarProps {
  view: View                          // Vista activa actual
  onChangeView: (view: View) => void  // Cambia la vista al hacer clic
}

/**
 * Sidebar — barra de navegación lateral del sistema.
 * Muestra el logo, los ítems de navegación y el pie
 * con la información del MVP (Opción C — Híbrida).
 */
export default function Sidebar({ view, onChangeView }: SidebarProps) {
  return (
    <aside className="sidebar">

      {/* Logo e identidad del sistema */}
      <div className="sidebar__brand">
        <span className="sidebar__logo">IG</span>
        <div>
          <p className="sidebar__title">InnovaTech</p>
          <p className="sidebar__subtitle">Innovatech Solutions</p>
        </div>
      </div>

      {/* Navegación principal — resalta el ítem activo */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`sidebar__link ${view === key ? 'is-active' : ''}`}
            onClick={() => onChangeView(key)}
          >
            <Icon className="sidebar__icon" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Pie del sidebar — identifica la versión del MVP */}
      <div className="sidebar__footer">
        <IconPulse className="sidebar__pulse" />
        <div>
          <p className="sidebar__footer-title">MVP · InnovaGest</p>
          <p className="sidebar__footer-subtitle">Opción C — Híbrida</p>
        </div>
      </div>

    </aside>
  )
}