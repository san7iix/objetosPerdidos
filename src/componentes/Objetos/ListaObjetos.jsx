import React, { useEffect, useRef, useState } from 'react'
import CardObjeto from './CardObjeto'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../base'

export default function ListaObjetos() {
  const [objetos, setobjetos] = useState([])
  const [buscar, setbuscar] = useState('')

  useEffect(() => {
    if (buscar === '') {
      obtenerObjetos(db)
        .then((data) => {
          return data
        })
        .then((data) => {
          setobjetos(data)
        })
    }

  }, [buscar])

  const obtenerObjetos = async (db) => {
    const objetos = collection(db, 'objetos')
    const objetosSnapshot = await getDocs(objetos)
    const listaObjetos = objetosSnapshot.docs.map((doc) => doc.data())
    return listaObjetos
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
    <div class="flex flex-col">
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
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-row">
        {objetos.map((objeto) => (
          <CardObjeto data={objeto} />
        ))}
      </div>
    </div>
  )
}
