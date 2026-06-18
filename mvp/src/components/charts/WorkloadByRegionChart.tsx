import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import { computeWorkload } from '../../utils'
import type { Resource } from '../../types'

interface Props {
  resources: Resource[] // Lista de recursos del equipo
}

export default function WorkloadByRegionChart({ resources }: Props) {

  // Obtiene las regiones únicas (Silicon Valley, Europa, Asia)
  const regions = [...new Set(resources.map((r) => r.region))]

  // Calcula el porcentaje de carga promedio por región
  const data = regions.map((region) => {
    const group = resources.filter((r) => r.region === region)
    const avg = group.reduce((acc, r) => acc + computeWorkload(r).percent, 0) / group.length
    return { region, workload: Math.round(avg) }
  })

  // Color de la barra según nivel de carga:
  // >100% = sobrecarga (rojo), <60% = subutilizado (amber), resto = óptimo (teal)
  function colorFor(value: number) {
    if (value > 100) return CHART_COLORS.red
    if (value < 60) return CHART_COLORS.amber
    return CHART_COLORS.teal
  }

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Carga laboral promedio por región</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>

            {/* Cuadrícula horizontal de referencia */}
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />

            {/* Eje X: nombre de la región */}
            <XAxis dataKey="region" tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} />

            {/* Eje Y: porcentaje de carga */}
            <YAxis tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} width={32} unit="%" />

            {/* Valor exacto al pasar el mouse */}
            <Tooltip formatter={(value) => [`${value}%`, 'Carga promedio']} />

            {/* Línea roja punteada en 100% — indica límite de sobrecarga */}
            <ReferenceLine y={100} stroke={CHART_COLORS.red} strokeDasharray="4 4" />

            {/* Barra por región con color dinámico según nivel de carga */}
            <Bar dataKey="workload" radius={[6, 6, 0, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={colorFor(d.workload)} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}