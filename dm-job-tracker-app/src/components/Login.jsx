import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'

export default function Login() {
  const [createAccount, setCreateAccount] = useState(false)
  const [userCreds, setUserCreds] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const { signup, login } = useAuth()

  function updateEmail(e) {
    setUserCreds({ ...userCreds, email: e.target.value })
  }

  function updatePassword(e) {
    setUserCreds({ ...userCreds, password: e.target.value })
  }

  function generateRandomPassword(length = 12) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'

    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }

    return password
  }

  function generateStrongPassword() {
    const strongPassword = generateRandomPassword()
    setUserCreds({ ...userCreds, password: strongPassword })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!userCreds.email || !userCreds.password) {
      return
    }

    if (createAccount) {
      console.log('Registering')
      signup(userCreds.email, userCreds.password)
    } else {
      console.log('Logging in')
      login(userCreds.email, userCreds.password)
    }
  }

  return (
    <div className={createAccount ? 'login-page create-account' : 'login-page'}>
      <h2>{createAccount ? 'Create Account' : 'Login'}</h2>
      <input
        className="input"
        placeholder="Email"
        value={userCreds.email}
        onChange={(e) => updateEmail(e)}
      />
      <div className="password-container">
        <input
          className="input password-input"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={userCreds.password}
          onChange={(e) => updatePassword(e)}
        />
        <div
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
        </div>
      </div>
      {createAccount && (
        <button
          className="generate-password-button"
          onClick={generateStrongPassword}
        >
          Generate Strong Password
        </button>
      )}
      <button className="button" onClick={handleSubmit}>
        {createAccount ? 'Create Account' : 'Login'}
      </button>
      <button
        className="toggleButton"
        onClick={() => setCreateAccount(!createAccount)}
      >
        {createAccount
          ? 'Already have an account? Sign in'
          : 'Create an account'}
      </button>
    </div>
  )
}
