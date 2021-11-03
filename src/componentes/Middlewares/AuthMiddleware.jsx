import { getAuth } from '@firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../base'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null)

  useEffect(() => {
    getAuth(app).onAuthStateChanged(setcurrentUser)
  })

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
