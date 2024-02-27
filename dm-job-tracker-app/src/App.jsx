import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import JobApplication from './components/JobApplication'
import './App.css'

function App() {
  const { currentUser } = useAuth()
  return <div>{currentUser ? <JobApplication /> : <Login />}</div>
}

export default App
