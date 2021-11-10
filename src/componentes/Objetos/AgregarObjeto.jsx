import React, { useEffect, useRef, useState } from 'react'
import db from '../../base'
import { collection, addDoc } from 'firebase/firestore/'
import { useHistory } from 'react-router'
import { useContext } from 'react/cjs/react.development'
import { AuthContext } from '../Middlewares/AuthMiddleware'

export default function AgregarObjeto() {
  let history = useHistory()

  const { currentUser } = useContext(AuthContext)
  const et = useRef(null)

  const [datos, setdatos] = useState({
    descripcion: '',
    nombre: '',
    etiquetas: '',
    imagen: '',
  })

  const [enviar, setenviar] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target

    setdatos((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  useEffect(() => {
    if (enviar) {
      reportar()
      setenviar(false)
    }
  }, [enviar])

  const reportar = async () => {
    const docRef = await addDoc(collection(db, 'objetos'), datos)
    if (docRef) {
      alert('Objeto agregado correctamente')
      history.push('/objetos')
    }
  }

  const separarEtiquetas = () => {
    setdatos((prevState) => ({
      ...prevState,
      etiquetas: et.current.value.split(','),
      creado: Date.now(),
      estado: 0
    }))
    setenviar(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased py-6 flex flex-col justify-center sm:py-3">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-2/3">
        <span className="text-2xl font-light">Reportar objeto perdido</span>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-primary-ligth rounded-t-md"></div>
          <div className="px-8 py-6">
            <label htmlFor="nombre" className="block font-semibold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre del objeto"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              id="nombre"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="imagen" className="block font-semibold">
              Imagen
            </label>
            <input
              type="text"
              placeholder="URL"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              id="imagen"
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="descripcion" className="block font-semibold">
              Descripcion
            </label>
            <textarea
              type="text"
              placeholder="Descripcion"
              className="border w-full px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              id="descripcion"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="etiquetas" className="block font-semibold">
              Etiquetas
            </label>
            <input
              type="text"
              placeholder="Etiquetas (separadas por coma)"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              id="etiquetas"
              ref={et}
            />
            <div className="flex justify-between items-baseline">
              <button
                className="mt-4 bg-primary-ligth text-white py-2 px-6 rounded-md hover:bg-primary-dark"
                onClick={separarEtiquetas}
              >
                Reportar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
