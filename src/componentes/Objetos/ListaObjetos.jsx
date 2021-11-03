import React, { useEffect, useRef, useState } from 'react'
import CardObjeto from './CardObjeto'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../base'

export default function ListaObjetos() {
  const [objetos, setobjetos] = useState([])
  const [buscar, setbuscar] = useState('')

  useEffect(() => {
    getDocs(collection(db, 'objetos'))
      .then((data) => {
        return data
      })
      .then((data) => {
        const lista = data.docs.map((doc) => doc.data())
        setobjetos(lista)
      })
  }, [])

  useEffect(() => {
    if(buscar === ''){
      limpiar()
    }
  }, [buscar])

  const buscarObjeto = () => {
    setobjetos(
      objetos.filter((objeto) =>
        objeto.nombre
          .toLowerCase()
          .includes(buscar.toLowerCase()),
      ),
    )
  }

  const limpiar = () => {

    setbuscar('');
    getDocs(collection(db, 'objetos'))
      .then((data) => {
        return data
      })
      .then((data) => {
        const lista = data.docs.map((doc) => doc.data())
        setobjetos(lista)
      })
  }

  const handleChange = (e)=>{
    const {value} = e.target
    setbuscar(value);
  }

  return (
    <div class="flex flex-col">
      <div className="flex flex-row text-center items-center justify-center">
        <input
          type="text"
          className="border w-1/4 h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
          placeholder="Buscar objeto..."
          onChange={(e)=>handleChange(e)}
        />
        <button className="" onClick={buscarObjeto}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 my-auto mx-4"
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
      <div className="flex flex-row justify-arround">
        {objetos.map((objeto) => (
          <CardObjeto data={objeto} />
        ))}
      </div>
    </div>
  );
}
