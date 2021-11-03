import React, { useEffect, useState } from 'react'
import CardObjeto from './CardObjeto'
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export default function ListaObjetos() {
  const [objetos, setobjetos] = useState([])


  useEffect(() => {
    const data = obtenerObjetos(db).then((data)=>{
      return data;
    });

    data.then((data)=>{
      setobjetos(data)
    })
  }, [objetos])
  

  const obtenerObjetos = async (db) => {
    const objetos = collection(db, 'objetos');
    const objetosSnapshot = await getDocs(objetos);
    const listaObjetos = objetosSnapshot.docs.map(doc => doc.data());
    return listaObjetos;
  }

  return (
    <div class="flex">
      {objetos.map((objeto) => (
        <CardObjeto data={objeto} />
      ))}
    </div>
  );
}
