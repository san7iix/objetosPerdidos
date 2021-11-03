import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import db from '../../base'
import { AuthContext } from '../Middlewares/AuthMiddleware'
import CardObjeto from '../Objetos/CardObjeto'

export default function Perfil() {
  const [objetos, setobjetos] = useState([])

  const { currentUser } = useContext(AuthContext)

  const obtenerObjetos = () => {
    const { email } = currentUser

    const objetosColeccion = collection(db, 'objetos')
    const q = query(objetosColeccion, where('usuario', '==', email))
    getDocs(q).then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      setobjetos(data)
    })
  }
  
  useEffect(() => {
    obtenerObjetos()
  }, [])

  return (
    <div class="flex flex-row">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          class="w-full"
          src="https://bysperfeccionoral.com/wp-content/uploads/2020/01/136-1366211_group-of-10-guys-login-user-icon-png.jpg"
          alt="foto"
        />
        <div class="px-6 py-4">
          <label htmlFor="" className="block font-semibold">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
          />
          <label htmlFor="" className="block font-semibold">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
          />
          <label htmlFor="" className="block font-semibold">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
          />
          <div className="flex justify-between items-baseline">
            <button className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-400">
              Actualizar datos
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        {objetos.map((objeto) => (
          <CardObjeto data={objeto} />
        ))}
      </div>
    </div>
  )
}
