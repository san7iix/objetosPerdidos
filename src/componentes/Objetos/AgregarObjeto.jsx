import React, { useEffect, useRef, useState } from 'react'
import db, { app } from '../../base'
import { useHistory } from 'react-router'
import { useContext } from 'react/cjs/react.development'
import { AuthContext } from '../Middlewares/AuthMiddleware'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection } from '@firebase/firestore'



export default function AgregarObjeto() {
  let history = useHistory()
  let storage = getStorage(app);

  ref(storage);

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

  const handleFile = (e) => {
    const archivo = e.target.files[0]
    setdatos((prevState) => ({
      ...prevState,
      imagen: archivo,
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

  const separarEtiquetas = async () => {
    const imageref = ref(storage, 'imagenes/' + datos.imagen.name);
    const upFile = await uploadBytesResumable(imageref, datos.imagen);
    const url = await getDownloadURL(upFile.ref);

    setdatos((prevState) => ({
      ...prevState,
      etiquetas: et.current.value.split(','),
      creado: Date.now(),
      estado: 0,
      imagen: url.toString()
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
              type="file"
              placeholder="URL"
              className=" w-full py-5 mt-2"
              id="imagen"
              onChange={(e) => handleFile(e)}
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
