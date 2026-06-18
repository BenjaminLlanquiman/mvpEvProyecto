import type { Resource, WorkloadLevel } from './types'

/**
 * computeWorkload — calcula el porcentaje de carga de un recurso
 * y determina su nivel: sobrecarga (>100%), óptimo (60-100%)
 * o subutilizado (<60%).
 */
export function computeWorkload(resource: Resource): { percent: number; level: WorkloadLevel } {
  const percent = Math.round((resource.allocatedHours / resource.capacityHours) * 100)
  let level: WorkloadLevel = 'optimo'
  if (percent > 100) level = 'sobrecarga'
  else if (percent < 60) level = 'subutilizado'
  return { percent, level }
}

// Etiquetas visibles en la UI para cada nivel de carga
export const LEVEL_LABEL: Record<WorkloadLevel, string> = {
  sobrecarga:   'Sobrecarga',   // Carga > 100% — alerta crítica
  optimo:       'Óptimo',       // Carga entre 60% y 100% — ideal
  subutilizado: 'Subutilizado', // Carga < 60% — recurso disponible
}