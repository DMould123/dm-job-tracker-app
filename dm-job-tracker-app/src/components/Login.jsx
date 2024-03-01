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
