import type { FC, SVGProps } from 'react'
import { IconGauge, IconUsers, IconLayoutGrid, IconPulse } from './icons'
import type { View } from '../types'

interface NavItem {
  key: View
  label: string
  icon: FC<SVGProps<SVGSVGElement>>
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: IconGauge },
  { key: 'resources', label: 'Recursos', icon: IconUsers },
  { key: 'kanban', label: 'Proyectos', icon: IconLayoutGrid },
]

interface SidebarProps {
  view: View
  onChangeView: (view: View) => void
}

export default function Sidebar({ view, onChangeView }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">IG</span>
        <div>
          <p className="sidebar__title">InnovaGest</p>
          <p className="sidebar__subtitle">Innovatech Solutions</p>
        </div>
      </div>

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