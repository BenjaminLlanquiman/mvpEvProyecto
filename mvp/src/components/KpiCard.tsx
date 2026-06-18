import type { FC, SVGProps } from 'react'

// Props del componente
interface KpiCardProps {
  label: string                          // Texto descriptivo bajo el valor
  value: string | number                 // Valor principal a mostrar
  suffix?: string                        // Unidad opcional (ej: "%")
  tone?: 'primary' | 'teal' | 'red' | 'amber' // Color del ícono según contexto
  icon?: FC<SVGProps<SVGSVGElement>>     // Ícono SVG opcional
}

/**
 * KpiCard — tarjeta de indicador clave de rendimiento.
 * Se usa en el Dashboard para mostrar métricas como
 * tareas completadas, recursos en sobrecarga, etc.
 */
export default function KpiCard({ label, value, suffix = '', tone = 'primary', icon: Icon }: KpiCardProps) {
  return (
    <div className={`kpi-card kpi-card--${tone}`}>

      {/* Ícono con color según tono (primary/teal/red/amber) */}
      <div className="kpi-card__icon">{Icon && <Icon />}</div>

      <div>
        {/* Valor principal + sufijo opcional */}
        <p className="kpi-card__value">
          {value}
          {suffix && <span className="kpi-card__suffix">{suffix}</span>}
        </p>

        {/* Etiqueta descriptiva */}
        <p className="kpi-card__label">{label}</p>
      </div>

    </div>
  )
}