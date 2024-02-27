import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function JobApplication() {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('applied')
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('all')
  const { currentUser } = useAuth()

  useEffect(() => {
    const storedApplications = localStorage.getItem('applications')
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications))
  }, [applications])

  function handleSubmit(e) {
    e.preventDefault()
    if (company.trim() === '' || position.trim() === '') return

    const newApplication = {
      id: applications.length + 1,
      company,
      position,
      status
    }

    setApplications([...applications, newApplication])
    setCompany('')
    setPosition('')
  }

  function handleDeleteApplication(id) {
    setApplications(applications.filter((app) => app.id !== id))
  }

  function handleStatusChange(id, newStatus) {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    )
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true
    return app.status === filter
  })

  return (
    <div className="app-container">
      <h1>Job Application Tracker</h1>
      <p>Welcome, {currentUser.email}!</p>
      <form onSubmit={handleSubmit} className="new-application-form">
        <div className="new-application-form-row">
          <label htmlFor="company">Company:</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            id="company"
            required
          />
        </div>
        <div className="new-application-form-row">
          <label htmlFor="position">Position:</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            id="position"
            required
          />
        </div>
        <div className="new-application-form-row">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button className="btn">Add Application</button>
      </form>

      {/* Application Filter Buttons */}
      <div className="application-filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('applied')}>Applied</button>
        <button onClick={() => setFilter('interview')}>Interview</button>
        <button onClick={() => setFilter('offer')}>Offer</button>
        <button onClick={() => setFilter('rejected')}>Rejected</button>
      </div>

      {/* Application List */}
      <h1 className="header">Job Applications</h1>
      <ul className="application-list">
        {filteredApplications.length === 0 && (
          <li>No applications to display.</li>
        )}
        {filteredApplications.map((app) => (
          <li key={app.id}>
            <div>
              <strong>Company:</strong> {app.company}
            </div>
            <div>
              <strong>Position:</strong> {app.position}
            </div>
            <div>
              <strong>Status:</strong>{' '}
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app.id, e.target.value)}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteApplication(app.id)}
            >
              <MdDelete /> Delete
            </button>

            <button
              className="btn btn-edit"
              onClick={() => {
                const newTitle = prompt('Edit Task:', task.title)
                if (newTitle !== null && newTitle.trim() !== '') {
                  handleEditTask(task.id, newTitle)
                }
              }}
            >
              <FiEdit /> Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
