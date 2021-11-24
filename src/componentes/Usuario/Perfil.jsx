import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { updatePassword, updateEmail } from "firebase/auth"
import db from '../../base'
import { AuthContext } from '../Middlewares/AuthMiddleware'
import CardObjeto from '../Objetos/Cards/CardObjeto'

export default function Perfil() {
  const [error, seterror] = useState('');
  const [enviar, setenviar] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const email = useRef('');
  const pass = useRef('');


  useEffect(() => {
    if (enviar) {
      editar();
    }
  }, [enviar])


  const verificarPass = (password) => {
    if (password.length < 7) {
      seterror('La contraseña debe tener más de 7 caracteres.')
      return false
    }
    return true
  }

  const editar = () => {
    const em = email.current.value
    const password = pass.current.value

    if (em.length > 0) {
      updateEmail(currentUser, em).then(() => {
        alert('Email cambiado correctamente.')
        email.current.value = ''
      }).catch(err => console.error(err));
    }
    
    if (password.length > 0) {
      if (verificarPass(password)) {
        updatePassword(currentUser, password).then(() => {
          alert('Contraseña cambiada correctamente.')
          pass.current.value = ''
        }).catch(err => {
          console.error(err);
        })
      }
    }

    if (enviar) {
      setenviar(false);
    }
  }



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
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
            ref={email}
          />
          <label htmlFor="" className="block font-semibold">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none rounded-md focus:ring-indigo-400"
            ref={pass}
          />
          <div className="flex justify-between items-baseline">
            <button
              onClick={() => setenviar(true)}
              className="mt-4 bg-primary-ligth text-white py-2 px-6 rounded-md hover:bg-primary-dark">
              Actualizar datos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
