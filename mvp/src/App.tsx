import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import ResourcesView from './components/ResourcesView'
import KanbanBoard from './components/KanbanBoard'
import useLiveData from './hooks/useLiveData'
import { API_BASE } from './config/api'
import type { TaskStatus, View } from './types'

/**
 * App — componente raíz del sistema InnovaGest.
 * Gestiona la vista activa y orquesta la comunicación
 * entre el hook de datos y los componentes de UI.
 */
export default function App() {

  // Vista activa del sistema (dashboard | resources | kanban)
  const [view, setView] = useState<View>('dashboard')

  // Datos en tiempo real desde el backend
  const {
    resources,       // Equipo distribuido en las 3 regiones
    tasksByProject,  // Tareas agrupadas por proyecto cliente
    summary,         // KPIs calculados por ms-dashboard
    history,         // Historial de avance para el gráfico de línea
    lastUpdated,     // Timestamp de la última actualización
    connected,       // Estado de conexión con el backend
    refetch,         // Fuerza una actualización manual
  } = useLiveData()

  // Mueve una tarea a otro estado en el backend y recarga los datos
  async function handleMoveTask(_projectId: string, taskId: string, status: TaskStatus) {
    try {
      await fetch(`${API_BASE.tareas}/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: status }),
      })
      await refetch()
    } catch (err) {
      console.error('Error actualizando tarea:', err)
    }
  }

  return (
    <div className="app">

      {/* Navegación lateral — cambia la vista activa */}
      <Sidebar view={view} onChangeView={setView} />

      <main className="app__main">

        {/* Barra superior — título, reloj mundial e indicador de conexión */}
        <TopBar view={view} lastUpdated={lastUpdated} connected={connected} />

        {/* Vista Dashboard — KPIs, alertas, objetivos y gráficos */}
        {view === 'dashboard' && (
          <Dashboard
            projects={[]}
            resources={resources}
            summary={summary}
            tasksByProject={tasksByProject}
            history={history}
          />
        )}

        {/* Vista Recursos — gestión del equipo por región */}
        {view === 'resources' && (
          <ResourcesView resources={resources} onRefetch={refetch} />
        )}

        {/* Vista Proyectos — tablero Kanban por proyecto cliente */}
        {view === 'kanban' && (
          <KanbanBoard
            tasksByProject={tasksByProject}
            onMoveTask={handleMoveTask}
            onRefetch={refetch}
          />
        )}

      </main>
    </div>
  )
}