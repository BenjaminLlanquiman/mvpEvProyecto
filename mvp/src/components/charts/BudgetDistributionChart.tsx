import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import { formatCLP } from '../../utils'
import type { Project } from '../../types'

interface Props {
  projects: Project[]
}

const COLORS = [CHART_COLORS.primary, CHART_COLORS.teal, CHART_COLORS.amber, CHART_COLORS.red]

export default function BudgetDistributionChart({ projects }: Props) {
  const data = projects.map((p) => ({ name: `Proyecto ${p.id}`, value: p.budgetTotal }))

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Distribución del presupuesto por proyecto</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCLP(Number(value))} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}