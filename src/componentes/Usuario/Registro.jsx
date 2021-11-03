import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect, useHistory } from 'react-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { USER_KEY } from '../../var.config'

export default function Registro() {
  const [datos, setdatos] = useState({
    nombre: '',
    email: '',
    password: '',
  })

  let history = useHistory()
  const auth = getAuth();

  const handleChange = (e) => {
    const { id, value } = e.target

    setdatos((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const registrar = () => {
    createUserWithEmailAndPassword(auth,datos.email, datos.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          alert('Registrado correctamente')
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          history.push('/objetos')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased py-6 flex flex-col justify-center sm:py-3">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-2/3">
        <span className="text-2xl font-light">Regístrate</span>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-primary rounded-t-md"></div>
          <div className="px-8 py-6">
            <label htmlFor="" className="block font-semibold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              id="nombre"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="" className="block font-semibold">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              id="email"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="" className="block font-semibold">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              onChange={(e) => handleChange(e)}
              id="password"
            />
            <div className="flex justify-between items-baseline">
              <button
                onClick={registrar}
                className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-400"
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
