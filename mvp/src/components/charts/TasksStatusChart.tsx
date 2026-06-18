import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import { columns } from '../../data/mockData'
import type { TasksByProject } from '../../types'

interface Props {
  tasksByProject: TasksByProject
}

export default function TasksStatusChart({ tasksByProject }: Props) {
  const allTasks = Object.values(tasksByProject).flat()
  const data = columns.map((col) => ({
    name: col.label,
    total: allTasks.filter((t) => t.status === col.key).length,
  }))

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Tareas por estado (todos los proyectos)</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: CHART_COLORS.muted }} axisLine={false} tickLine={false} width={28} />
            <Tooltip />
            <Bar dataKey="total" fill={CHART_COLORS.teal} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}