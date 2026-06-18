import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import type { ProgressPoint } from '../../types'

interface Props {
  data: ProgressPoint[] // Historial de avance (máximo 12 puntos, 1 cada 5 segundos)
}

/**
 * ProgressTrendChart — gráfico de línea que muestra la evolución
 * del porcentaje de tareas completadas en el tiempo.
 * Se actualiza automáticamente cada vez que useLiveData recibe nuevos datos.
 */
export default function ProgressTrendChart({ data }: Props) {
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Evolución del avance promedio</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>

            {/* Cuadrícula horizontal de referencia */}
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />

            {/* Eje X: hora de cada actualización */}
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} />

            {/* Eje Y: porcentaje de avance (0-100%) */}
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} width={32} />

            {/* Valor exacto al pasar el mouse */}
            <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Avance']} />

            {/* Línea de tendencia sin puntos individuales */}
            <Line type="monotone" dataKey="avgProgress" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}