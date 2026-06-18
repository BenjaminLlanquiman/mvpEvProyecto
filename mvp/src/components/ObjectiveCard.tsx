interface ObjectiveCardProps {
  title: string
  value: string
  objectiveLabel: string
  percent: number
  tone?: 'primary' | 'teal' | 'amber' | 'red'
}

export default function ObjectiveCard({ title, value, objectiveLabel, percent, tone = 'primary' }: ObjectiveCardProps) {
  const width = Math.min(100, Math.max(0, percent))

  return (
    <div className="objective-card">
      <p className="objective-card__title">{title}</p>
      <p className="objective-card__value">{value}</p>
      <p className="objective-card__objective">{objectiveLabel}</p>
      <div className="progress-track progress-track--wide">
        <div className={`progress-fill progress-fill--${tone}`} style={{ width: `${width}%` }} />
      </div>
      <p className="objective-card__percent">{Math.round(percent)}% del objetivo</p>
    </div>
  )
}