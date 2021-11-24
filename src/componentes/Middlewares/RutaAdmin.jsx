import { doc, getDoc } from '@firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router'
import db from '../../base'
import { AuthContext } from './AuthMiddleware'


const AdminRoute = async({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  
  const obtenerPermisos = async () => {
    try {
      const docRef = doc(db, 'admins', currentUser.email);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(error);
    }
  }
  
  const admin = await obtenerPermisos();





  return (
    <Route
      {...rest}
      render={() => (!!currentUser && admin ? children : <Redirect to="/" />)}
    />
  )
}

export default AdminRoute;
