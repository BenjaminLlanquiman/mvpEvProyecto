import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import ResourcesView from './components/ResourcesView'
import KanbanBoard from './components/KanbanBoard'
import useLiveData from './hooks/useLiveData'
import { API_BASE } from './config/api'
import type { TaskStatus, View } from './types'

export default function App() {
  const [view, setView] = useState<View>('dashboard')
  const {
    resources,
    tasksByProject,
    summary,
    history,
    lastUpdated,
    connected,
    refetch,
  } = useLiveData()

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
      <Sidebar view={view} onChangeView={setView} />
      <main className="app__main">
        <TopBar view={view} lastUpdated={lastUpdated} connected={connected} />
        {view === 'dashboard' && (
          <Dashboard
            projects={[]}
            resources={resources}
            summary={summary}
            tasksByProject={tasksByProject}
            history={history}
          />
        )}
        {view === 'resources' && (
          <ResourcesView resources={resources} onRefetch={refetch} />
        )}
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