import React from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import JobApplication from './components/JobApplication'
import Footer from './components/Footer'
import './App.css'
import logo from './img/job-tracker-logo.png'

function App() {
  const { currentUser } = useAuth()

  return (
    <div className="app-container">
      <img src={logo} alt="Job Tracker Logo" className="app-logo" />
      {/* Conditionally render components based on authentication */}
      {currentUser ? <JobApplication /> : <Login />}
      <Footer />
    </div>
  )
}

export default App
