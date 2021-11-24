import { getApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db, { app } from '../../base'
import { AuthContext } from '../Middlewares/AuthMiddleware'
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  refEqual,
  where, doc
} from '@firebase/firestore'
import { ref } from '@firebase/storage'


export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [admin, setadmin] = useState(false);

  const obtenerPermisos = async () => {
    try {
      const docRef = doc(db, 'admins', currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setadmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    obtenerPermisos()
  })

  return (
    <nav className="bg-primary-ligth">
      <div className="py-4 px-8 xl:max-w-6x1 mx-auto">
        <div className="flex justify-between mr-4">
          <div className="">
            <Link to="/" className="flex items-center text-white">
              <img
                src="https://cdn.unimagdalena.edu.co/images/escudo/bg_dark/default.png"
                alt="Logo"
              />
              <span className="ml-2 hover:underline">
                Universidad del Magdalena
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <Link className="hover:underline" to="/">
              Inicio
            </Link>
            <Link className="hover:underline" to="/objetos">
              Objetos
            </Link>
            {!!currentUser && admin ? (
              <Link className="hover:underline" to="/objetos/espera">
                Objetos en espera
              </Link>
            ) : (
              ''
            )}
            {!!currentUser && admin  ? (
              <Link className="hover:underline" to="/objetos/reclamados">
                Objetos reclamados
              </Link>
            ) : (
              ''
            )}
            {!!currentUser && admin ? (
              <Link className="hover:underline" to="/objetos/reportar">
                Reportar objeto
              </Link>
            ) : (
              ''
            )}

            {!!currentUser ? (
              <Link className="hover:underline" to="/perfil">
                Perfil
              </Link>
            ) : (
              ''
            )}

            {!currentUser ? (
              <Link className="hover:underline" to="/login">
                Login
              </Link>
            ) : (
              ''
            )}
            {!!currentUser  ? (
              <button onClick={() => getAuth(app).signOut()}>Salir</button>
            ) : (
              ''
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <div>Secondary nav</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
