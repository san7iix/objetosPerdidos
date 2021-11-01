import react, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth'

const AuthContext = createContext()
const auth = getAuth()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = (props) => {
  const [currentUser, setcurrentUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setcurrentUser(user)
    })
  }, [])

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => signOut(auth)

  const value = { signUp, login, logout, currentUser }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
