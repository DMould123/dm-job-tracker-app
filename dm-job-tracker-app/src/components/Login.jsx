import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [createAccount, setCreateAccount] = useState(false)
  const [userCreds, setUserCreds] = useState({ email: '', password: '' })

  const { signup, login } = useAuth()

  function updateEmail(e) {
    setUserCreds({ ...userCreds, email: e.target.value })
  }

  function updatePassword(e) {
    setUserCreds({ ...userCreds, password: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // prevents signup if form not completed
    if (!userCreds.email || !userCreds.password) {
      return
    }

    if (createAccount) {
      // recommended to add password regex check in here
      console.log('Registering')
      signup(userCreds.email, userCreds.password)
    } else {
      console.log('Logging in')
      login(userCreds.email, userCreds.password)
    }
  }

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Email"
        value={userCreds.email}
        onChange={(e) => updateEmail(e)}
      ></input>
      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        value={userCreds.password}
        onChange={(e) => updatePassword(e)}
      ></input>
      <button style={styles.button} onClick={handleSubmit}>
        <p style={styles.buttonText}>Submit</p>
      </button>
      <button
        style={styles.toggleButton}
        onClick={() => setCreateAccount(!createAccount)}
      >
        <p style={styles.buttonText}>{createAccount ? 'Sign In' : 'Sign Up'}</p>
      </button>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '300px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center'
  },
  input: {
    margin: '10px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#1a1a1a',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box'
  },
  toggleButton: {
    backgroundColor: '#646cff',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box'
  },
  buttonText: {
    margin: 0
  }
}
