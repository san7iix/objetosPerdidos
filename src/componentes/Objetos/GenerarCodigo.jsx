import { doc, getDoc, runTransaction } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import db from '../../base'

export default function GenerarCodigo() {
  const { id } = useParams()

  let history = useHistory()

  const [objeto, setobjeto] = useState([])
  const [codigo, setcodigo] = useState(-10000)
  const [error, seterror] = useState('')

  useEffect(() => {
    setcodigo(getRandomInt(100000, 999999))
    if (!id) {
      history.push('/objetos')
    }
  }, [])

  useEffect(() => {
    if (id && codigo > 0) {
      actualizarDatos(codigo)
    }
  }, [codigo])

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const actualizarDatos = async (codigo) => {
    try {
      const objRef = doc(db, 'objetos', id)
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(objRef)
        if (!sfDoc.exists()) {
          throw 'Document does not exist!'
        }
        transaction.update(objRef, { codigo: codigo, estado: 2 })
      })
      alert(
        'Tu codigo ha sido generado correctamente, te recomendamos anotarlo en un lugar seguro.',
      )
    } catch (e) {
      alert(
        'Ha ocurrido un error al generar tu codigo, por favor intenta de nuevo.',
      )
      console.err('Transaction failed: ', e)
    }
  }

  return (
    <div className="flex flex-col shadow-sm w-2/12">
      <div className="p-10 flex flex-col text-center space-y-4">
        <div>Su codigo para reclamar es:</div>
        <div className="bg-gray-200 rounded-lg font-semibold">{codigo}</div>
        <Link to="/objetos" className="font-semibold">
          Volver
        </Link>
      </div>
    </div>
  )
}
