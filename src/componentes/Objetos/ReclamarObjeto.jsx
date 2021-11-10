import { doc, getDoc, runTransaction } from '@firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import db from '../../base'

export default function ReclamarObjeto() {
  let history = useHistory()
  const { id } = useParams()
  const codigo = useRef(null)
  const [enviar, setenviar] = useState(false)
  const [error, seterror] = useState('')

  useEffect(() => {
    if (enviar) {
      reclamarObjeto(id)
    }
    console.log(codigo.current.value);
  }, [enviar])

  const reclamarObjeto = async () => {
      seterror('');
      obtenerDatos();
      setenviar(false);
  }

  const obtenerDatos = async ()=>{
    const objRef = doc(db, 'objetos', id);
    const objSnapshot = getDoc(objRef);

    const data = objSnapshot.then(snapShot=>{
        if(snapShot.exists()){
            return(snapShot.data().codigo);
        }
        return null;
    })

    data.then(res=>{
        if(parseInt(codigo.current.value) === res){
            cambiarEstado();
        }else{
            seterror('El codigo ingresado es incorrecto, verifíquelo.')
        }
    })
  }

  const cambiarEstado = async () => {
    try {
      const objRef = doc(db, 'objetos', id)
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(objRef)
        if (!sfDoc.exists()) {
          throw 'Document does not exist!'
        }
        transaction.update(objRef, { codigo: -8333334, estado: 4 })
      })
      alert('El objeto ha sido reclamado correctamente')
      history.push("/")
    } catch (e) {
      alert(
        'Ha ocurrido un error al generar tu codigo, por favor intenta de nuevo.',
      )
      console.error('Transaction failed: ', e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased py-6 flex flex-col justify-center sm:py-3">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-2/3">
        <span className="text-2xl font-light">
          Ingresa el código de reclamo
        </span>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-primary-ligth rounded-t-md"></div>
          <div className="px-8 py-6">
            <label htmlFor="" className="block font-semibold">
              Código
            </label>
            <input
              type="text"
              placeholder="Ejem: 879725637"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
              ref={codigo}
            />
            <div className="text-red text-center">
                {error}
            </div>
            <div className="flex justify-between items-baseline">
              <button
                onClick={()=>setenviar(true)}
                className="mt-4 bg-primary-ligth text-white py-2 px-6 rounded-md hover:bg-primary-dark"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
