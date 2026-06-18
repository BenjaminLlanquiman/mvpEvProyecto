import type { FC, SVGProps } from 'react'

interface KpiCardProps {
  label: string
  value: string | number
  suffix?: string
  tone?: 'primary' | 'teal' | 'red' | 'amber'
  icon?: FC<SVGProps<SVGSVGElement>>
}

export default function KpiCard({ label, value, suffix = '', tone = 'primary', icon: Icon }: KpiCardProps) {
  return (
    <div className={`kpi-card kpi-card--${tone}`}>
      <div className="kpi-card__icon">{Icon && <Icon />}</div>
      <div>
        <p className="kpi-card__value">
          {value}
          {suffix && <span className="kpi-card__suffix">{suffix}</span>}
        </p>
        <p className="kpi-card__label">{label}</p>
      </div>
    </div>
  )
}