import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { Alert } from 'react-bootstrap'
import './login.css'

function Login() {
  const emailref = useRef()
  const passref = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()

    try{
        setError('')
        setLoading(true)
        await login(emailref.current.value, passref.current.value)
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
                <h2>Login</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='Email Id' ref={emailref}/>
                </div>
                <div className="inputField">
                    <label htmlFor="pass">Password</label>
                    <input type="password" id='pass' placeholder='Password' ref={passref}/>
                </div>
                <button onClick={handleLogin} disabled={loading}>Login</button>
                <div className="forgotPassword">
                    <Link to="/forgotPass">Forgot Password?</Link>
                </div>
            </div>
            <div className='noAccount' style={{color:"white"}}>
                 Don't Have an Account? <Link to='/register'>Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default Login