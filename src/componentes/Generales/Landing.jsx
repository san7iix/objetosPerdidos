import { collection, getDocs, limit, orderBy, query } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../base'
import CardObjeto from '../Objetos/CardObjeto'

export default function Landing() {
  const [objetos, setobjetos] = useState([])

  useEffect(() => {
    obtenerObjetos()
  }, [])

  const obtenerObjetos = async () => {
    const objetosRef = collection(db, 'objetos')
    const q = query(objetosRef, orderBy('creado', 'desc'), limit(4))
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
      <div className="flex flex-col justify-center text-center pt-6 divide-y divide-blue-100 space-y-20">
        <div className="text-blue-500 font-light text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto w-1/12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Objetos recientemente reportados
        </div>
        <div className="flex flex-row flex-wrap">
          {objetos.map((objeto) => (
            <CardObjeto key={objeto.id} data={objeto} />
          ))}
        </div>
        <div className="flex flex-col space-y-10 pt-10">
          <div className="text-blue-500 font-light text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="m-auto w-1/12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            Lorem ipsum dolor sit.
          </div>
          <div className="text-lg w-7/12 self-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            voluptatem corrupti obcaecati, assumenda atque voluptas quibusdam
            commodi aliquam ullam iste eveniet nostrum ab nesciunt ad alias quod
            quas repellat sunt? Inventore porro molestiae deleniti veniam, qui
            ipsam exercitationem est tempore eaque voluptatem rem quo, enim a
            aperiam, vero dolorum placeat quod non? Similique delectus molestias
            repudiandae aliquid aspernatur repellat odit! Rerum, ad. Incidunt,
            ea modi impedit possimus recusandae veniam magnam rem ipsa est id,
            consequatur a necessitatibus, aliquid pariatur nobis assumenda. Id,
            sapiente maxime! Laborum minima eius praesentium adipisci deleniti.
            Aut molestiae rerum ipsum expedita voluptatem numquam rem qui
            dolorem accusantium. Itaque totam quidem voluptatem qui alias optio
            eos nihil possimus expedita, iure in neque, explicabo ipsam laborum
            ipsa dolores!
          </div>
        </div>
        <footer></footer>
      </div>
    </div>
  )
}
