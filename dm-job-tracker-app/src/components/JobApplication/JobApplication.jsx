import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { FiEdit, FiUser, FiPlus } from 'react-icons/fi'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../../firebase'
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  getDoc
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export default function JobApplication() {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('applied')
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const [editedNotes, setEditedNotes] = useState('')
  const { currentUser, logout } = useAuth()

  useEffect(() => {
    const fetchApplications = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {
            const userData = docSnap.data()
            if (userData.applications) {
              setApplications(userData.applications)
            }
          } else {
            // If the document doesn't exist, create it
            await setDoc(userRef, { applications: [] })
          }
        } catch (error) {
          console.error('Error fetching applications: ', error)
        }
      }
    }

    fetchApplications()
  }, [currentUser])

  // Add application function
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (company.trim() === '' || position.trim() === '') return

    const newApplication = {
      id: uuidv4(), // Generate unique ID
      company,
      position,
      status,
      timestamp: new Date().toISOString(), // Add timestamp
      notes: 'New application added' // Add initial note
    }

    try {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid)
        await updateDoc(userRef, {
          applications: arrayUnion(newApplication)
        })
        setApplications([...applications, newApplication]) // Update local state
      }
    } catch (error) {
      console.error('Error adding document: ', error)
    }

    setCompany('')
    setPosition('')
  }

  // Delete application function
  const handleDeleteApplication = async (id) => {
    try {
      if (currentUser) {
        const updatedApplications = applications.filter((app) => app.id !== id)
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(
          userRef,
          { applications: updatedApplications },
          { merge: true }
        ) // Use setDoc with merge option
        setApplications(updatedApplications)
      }
    } catch (error) {
      console.error('Error deleting document: ', error)
    }
  }

  // Update status function
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedApplications = applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              timestamp: new Date().toISOString(),
              notes: app.notes ? app.notes : 'Application status updated'
            }
          : app
      )
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid)
        await updateDoc(userRef, {
          applications: updatedApplications
        })
        setApplications(updatedApplications)
      }
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

  // Edit application function
  const handleEditApplication = async (
    id,
    newCompany,
    newPosition,
    newStatus,
    newNotes
  ) => {
    try {
      const updatedApplications = applications.map((app) =>
        app.id === id
          ? {
              ...app,
              company: newCompany,
              position: newPosition,
              status: newStatus,
              timestamp: new Date().toISOString(),
              notes: newNotes
            }
          : app
      )
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid)
        await updateDoc(userRef, {
          applications: updatedApplications
        })
        setApplications(updatedApplications)
      }
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

  // Sort applications function
  const sortedApplications = applications.slice().sort((a, b) => {
    const dateA = new Date(a.timestamp)
    const dateB = new Date(b.timestamp)
    if (sort === 'newest') {
      return dateB - dateA
    } else {
      return dateA - dateB
    }
  })

  // Filtered applications
  const filteredApplications = sortedApplications.filter((app) => {
    if (filter === 'all') return true
    return app.status === filter
  })

  // Group applications by month
  const applicationsByMonth = filteredApplications.reduce((acc, curr) => {
    const month = new Date(curr.timestamp).toLocaleString('default', {
      month: 'long'
    })
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(curr)
    return acc
  }, {})

  // JSX rendering
  return (
    <div className="job-application-container">
      <button className="btn logout-btn" onClick={logout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
      <h1>Job Application Tracker</h1>
      <p className="logged-in-user">
        <FiUser className="user-icon" /> Welcome, {currentUser.email}!
      </p>

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
        <button className="btn btn-add">
          <FiPlus className="icon" /> Add Application
        </button>
      </form>

      {/* Application Filter Buttons */}
      <div className="application-filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('applied')}>Applied</button>
        <button onClick={() => setFilter('interview')}>Interview</button>
        <button onClick={() => setFilter('offer')}>Offer</button>
        <button onClick={() => setFilter('rejected')}>Rejected</button>
        {/* Sort Buttons */}
        <button onClick={() => setSort('newest')}>Newest</button>
        <button onClick={() => setSort('oldest')}>Oldest</button>
      </div>

      {/* Application List */}
      <h1 className="header">Job Applications</h1>
      {Object.entries(applicationsByMonth).map(([month, apps]) => (
        <div key={month}>
          <h2>{month}</h2>
          <ul className="application-list">
            {apps.map((app, index) => (
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
                <div>
                  <strong>Timestamp:</strong>{' '}
                  {new Date(app.timestamp).toLocaleString()}
                </div>
                <div>
                  <strong>Notes:</strong> {app.notes || 'No notes'}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteApplication(app.id)}
                >
                  <MdDelete /> Delete
                </button>
                <button
                  className="btn btn-edit"
                  onClick={() =>
                    handleEditApplication(
                      app.id,
                      app.company,
                      app.position,
                      app.status,
                      app.notes
                    )
                  }
                >
                  <FiEdit /> Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
