import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect, useHistory } from 'react-router'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'

export default function Registro() {
  const email = useRef(null)
  const pass = useRef(null)
  const nombre = useRef(null)

  let history = useHistory()

  const [error, seterror] = useState('')

  let auth = getAuth()

  const registrar = () => {
    const em = email.current.value
    const password = pass.current.value

    if (verificarPass(password)) {
      createUserWithEmailAndPassword(auth, em, password)
        .then((userCredential) => {
          const { user } = userCredential
          sendEmailVerification(user).then(()=>{
            signOut(auth);
            alert('Se ha enviado un correo de verificación al Email proporcionado.')
            history.push('/')
          })
        })
        .catch((err) => {
          seterror('Ha ocurrido un error al registrar el usuario.')
          console.error(err)
        })
    }
  }

  const verificarPass = (password) => {
    if (password.length < 7) {
      seterror('La contraseña debe tener más de 7 caracteres.')
      return false
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased py-6 flex flex-col justify-center sm:py-3">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-2/3">
        <span className="text-2xl font-light">Regístrate</span>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-primary-ligth rounded-t-md"></div>
          <div className="px-8 py-6">
            <label htmlFor="" className="block font-semibold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              ref={nombre}
            />
            <label htmlFor="" className="block font-semibold">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              ref={email}
            />
            <label htmlFor="" className="block font-semibold">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              ref={pass}
            />
            <div className="text-red-500 text-center p-2">{error}</div>

            <div className="flex justify-between items-baseline">
              <button
                onClick={registrar}
                className="mt-4 bg-primary-ligth text-white py-2 px-6 rounded-md hover:bg-primary-dark"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
