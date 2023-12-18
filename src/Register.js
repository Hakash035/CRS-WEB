import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './login.css'

function Register() {
  const emailref = useRef()
  const passref = useRef()
  const confirmPassref = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()

    if(passref.current.value !== confirmPassref.current.value){
      return setError("Password do not match")
    }

    try{
      setError('')
      setLoading(true)
      await signup(emailref.current.value, passref.current.value)
      navigate('/')
    }catch(error){
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="login-container">
        <div className="login-content">
            <div className="login-card">
                <h2>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='Email Id' ref={emailref}/>
                </div>
                <div className="inputField">
                    <label htmlFor="pass">Password</label>
                    <input type="password" id='pass' placeholder='Password' ref={passref}/>
                </div>
                <div className="inputField">
                    <label htmlFor="conpass">Confirm Password</label>
                    <input type="password" id='conpass' placeholder='Confirm Password' ref={confirmPassref}/>
                </div>
                <button onClick={handleSignup} disabled={loading}>Sign Up</button>
            </div>
            <div className='noAccount' style={{color:"white"}}>
                 Already have an Account? <Link to='/login'>Log In</Link>
            </div>
        </div>
    </div>
  )
}

export default Register