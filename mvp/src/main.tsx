import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/layout.css'
import './styles/sidebar.css'
import './styles/topbar.css'
import './styles/kpi.css'
import './styles/resources.css'
import './styles/kanban.css'
import './styles/charts.css'
import './styles/forms.css'
import './styles/utils.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)