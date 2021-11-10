import React, { useEffect, useState } from 'react'
import CardObjeto from './Cards/CardObjeto'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import db from '../../base'

export default function ListaObjetos() {
  const [objetos, setobjetos] = useState([])
  const [buscar, setbuscar] = useState('')

  useEffect(() => {
    if (buscar === '') {
      obtenerObjetos()
    }
  }, [buscar])

  const obtenerObjetos = async () => {
    const objetosRef = collection(db, 'objetos')
    const q = query(objetosRef, where('estado', '==', 0))
    getDocs(q).then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const obj = { id: doc.id.toString() }
        return Object.assign({}, doc.data(), obj)
      })
      setobjetos(data)
    })
  }

  const buscarObjeto = () => {
    const referencia = buscar.toLowerCase()
    setobjetos(
      objetos.filter((objeto) =>
        objeto.nombre.toLowerCase().includes(referencia),
      ),
    )
  }

  const handleChange = (e) => {
    const { value } = e.target
    setbuscar(value)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center ">
        <input
          onChange={(e) => handleChange(e)}
          className="border 1/5 h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
        />
        <button
          className="text-center ml-4 items-center justify-center"
          onClick={buscarObjeto}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-row flex-wrap">
        {objetos.map((objeto) => (
          <CardObjeto key={objeto.id} data={objeto} />
        ))}
      </div>
    </div>
  )
}
