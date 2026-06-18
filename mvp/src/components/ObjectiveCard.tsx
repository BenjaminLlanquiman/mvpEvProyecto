// Props del componente
interface ObjectiveCardProps {
  title: string        // Nombre del objetivo (ej: "Avance de tareas")
  value: string        // Valor actual visible (ej: "65%")
  objectiveLabel: string // Descripción de la meta (ej: "Meta: 100% completadas")
  percent: number      // Porcentaje para la barra de progreso (0-100)
  tone?: 'primary' | 'teal' | 'amber' | 'red' // Color de la barra
}

/**
 * ObjectiveCard — tarjeta de objetivo con barra de progreso.
 * Se usa en el Dashboard para mostrar el avance hacia metas
 * clave del sistema InnovaGest (tareas, carga óptima, recursos).
 */
export default function ObjectiveCard({ title, value, objectiveLabel, percent, tone = 'primary' }: ObjectiveCardProps) {

  // Limita el ancho de la barra entre 0% y 100%
  const width = Math.min(100, Math.max(0, percent))

  return (
    <div className="objective-card">

      {/* Nombre del objetivo */}
      <p className="objective-card__title">{title}</p>

      {/* Valor actual destacado */}
      <p className="objective-card__value">{value}</p>

      {/* Descripción de la meta */}
      <p className="objective-card__objective">{objectiveLabel}</p>

      {/* Barra de progreso con color según tono */}
      <div className="progress-track progress-track--wide">
        <div className={`progress-fill progress-fill--${tone}`} style={{ width: `${width}%` }} />
      </div>

      {/* Porcentaje numérico al final */}
      <p className="objective-card__percent">{Math.round(percent)}% del objetivo</p>

    </div>
  )
}