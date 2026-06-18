import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import type { ProgressPoint } from '../../types'

interface Props {
  data: ProgressPoint[]
}

export default function ProgressTrendChart({ data }: Props) {
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Evolución del avance promedio</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} width={32} />
            <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Avance']} />
            <Line type="monotone" dataKey="avgProgress" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}