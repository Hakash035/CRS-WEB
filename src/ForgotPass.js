import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useAuth } from './context/AuthContext'

function ForgotPass() {
  const emailref = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const { ForgotPassword } = useAuth()

  async function handleForgotPass(e){
    e.preventDefault()

    try{
        setError('')
        setLoading(true)
        await ForgotPassword(emailref.current.value)
        setMsg("Check Your Mail Inbox")
        // navigate('/login')
    }catch(error){
        setError(error.message)
    }
    setLoading(false)
  }
  return (
    <div className="login-container">
        <div className="login-content">
            <div className="login-card">
                <h2>Forgot Password</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {msg && <Alert variant='info'>{msg}</Alert>}
                <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='Email Id' ref={emailref}/>
                </div>
                <button onClick={handleForgotPass} disabled={loading}>Reset Password</button>
            </div>
            <div className='noAccount' style={{color:"white"}}>
                <Link to='/login'>Log In</Link>
            </div>
        </div>
    </div>
  )
}

export default ForgotPass