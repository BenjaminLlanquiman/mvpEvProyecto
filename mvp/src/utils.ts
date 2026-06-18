import type { Project, Resource, Summary, WorkloadLevel } from './types'

export function formatCLP(value: number): string {
  return '$' + Math.round(value).toLocaleString('es-CL')
}

export function computeWorkload(resource: Resource): { percent: number; level: WorkloadLevel } {
  const percent = Math.round((resource.allocatedHours / resource.capacityHours) * 100)
  let level: WorkloadLevel = 'optimo'
  if (percent > 100) level = 'sobrecarga'
  else if (percent < 60) level = 'subutilizado'
  return { percent, level }
}

export const LEVEL_LABEL: Record<WorkloadLevel, string> = {
  sobrecarga: 'Sobrecarga',
  optimo: 'Óptimo',
  subutilizado: 'Subutilizado',
}

export function computeSummary(projects: Project[], resources: Resource[]): Summary {
  const avgProgress = projects.reduce((a, p) => a + p.progress, 0) / projects.length
  const totalBudget = projects.reduce((a, p) => a + p.budgetTotal, 0)
  const totalSpent = projects.reduce((a, p) => a + p.budgetSpent, 0)
  const atRisk = projects.filter((p) => p.status === 'En riesgo').length

  const workloads = resources.map(computeWorkload)
  const overloaded = workloads.filter((w) => w.level === 'sobrecarga').length
  const underused = workloads.filter((w) => w.level === 'subutilizado').length
  const optimo = workloads.filter((w) => w.level === 'optimo').length

  return {
    avgProgress,
    totalBudget,
    totalSpent,
    budgetPercent: (totalSpent / totalBudget) * 100,
    atRisk,
    overloadedPercent: (overloaded / resources.length) * 100,
    underusedPercent: (underused / resources.length) * 100,
    optimoPercent: (optimo / resources.length) * 100,
  }
}