import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password )
  }

  function logout() {
    return auth.signOut()
  }

  function ForgotPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmailUser(email) {
    return updateEmail(currentUser, email)
  }

  function updatePassUser(password) {
    return updatePassword(currentUser, password)
  }

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unSub
  },[])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    ForgotPassword,
    updateEmailUser,
    updatePassUser
  }
  return (
    <AuthContext.Provider value={value}>
        { !loading && children }
    </AuthContext.Provider>
  )
}
