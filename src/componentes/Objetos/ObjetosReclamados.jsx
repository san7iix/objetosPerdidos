import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../base'
import CardNoButton from './Cards/CardNoButton'
import CardObjeto from './Cards/CardObjeto'

export default function ObjetosReclamados() {
  const [objetos, setobjetos] = useState([])

  useEffect(() => {
    obtenerObjetos()
  }, [])

  const obtenerObjetos = async () => {
    const objetosRef = collection(db, 'objetos')
    const q = query(objetosRef, where('estado', '==', 4))
    getDocs(q).then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const obj = { id: doc.id.toString() }
        return Object.assign({}, doc.data(), obj)
      })
      setobjetos(data)
    })
  }

  return (
    <div>
      <div className="flex flex-row flex-wrap">
        {objetos.map((objeto) => (
          <CardNoButton key={objeto.id} data={objeto} />
        ))}
      </div>
    </div>
  )
}
