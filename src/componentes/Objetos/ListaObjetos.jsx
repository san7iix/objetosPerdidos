import React, { useState } from 'react'
import CardObjeto from './CardObjeto'

export default function ListaObjetos() {
  const [objetos, setobjetos] = useState([
    {
      id: 1,
      nombre: 'Objeto #1',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores et perferendis eaque,exercitationem praesentium nihil.',
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_974154-MCO46436090342_062021-O.webp'
    },
    {
      id: 2,
      nombre: 'Objeto #2',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores et perferendis eaque,exercitationem praesentium nihil.',
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_974154-MCO46436090342_062021-O.webp'
    },
    {
      id: 3,
      nombre: 'Objeto #3',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores et perferendis eaque,exercitationem praesentium nihil.',
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_974154-MCO46436090342_062021-O.webp'
    },
    {
      id: 4,
      nombre: 'Objeto #4',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores et perferendis eaque,exercitationem praesentium nihil.',
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_974154-MCO46436090342_062021-O.webp'
    },
    {
      id: 5,
      nombre: 'Objeto #5',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla! Maiores et perferendis eaque,exercitationem praesentium nihil.',
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_974154-MCO46436090342_062021-O.webp'
    },
  ])

  return (
    <div class="flex">
      {objetos.map((objeto) => (
        <CardObjeto data={objeto}/>
      ))}
    </div>
  )
}
