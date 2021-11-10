import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../base'
import CardObjetoReclamar from './CardObjetoReclamar'

export default function ObjetosEnEspera() {
  const [objetos, setobjetos] = useState([])

  useEffect(() => {
    obtenerObjetos()
  }, [])

  const obtenerObjetos = () => {
    const objetosRef = collection(db, 'objetos')
    const q = query(objetosRef, where('estado', '==', 2))
    getDocs(q).then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const obj = { id: doc.id.toString() }
        return Object.assign({}, doc.data(), obj)
      })
      setobjetos(data)
    })
  }

  return (
    <div className="flex flex-row flex-wrap">
      {objetos.map((objeto) => (
        <CardObjetoReclamar key={objeto.id} data={objeto} />
      ))}
    </div>
  )
}
