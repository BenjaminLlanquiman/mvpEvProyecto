import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import { computeWorkload } from '../../utils'
import type { Resource } from '../../types'

interface Props {
  resources: Resource[]
}

export default function WorkloadByRegionChart({ resources }: Props) {
  const regions = [...new Set(resources.map((r) => r.region))]
  const data = regions.map((region) => {
    const group = resources.filter((r) => r.region === region)
    const avg = group.reduce((acc, r) => acc + computeWorkload(r).percent, 0) / group.length
    return { region, workload: Math.round(avg) }
  })

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
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="region" tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} width={32} unit="%" />
            <Tooltip formatter={(value) => [`${value}%`, 'Carga promedio']} />
            <ReferenceLine y={100} stroke={CHART_COLORS.red} strokeDasharray="4 4" />
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