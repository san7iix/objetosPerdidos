import React from 'react'
import { Link } from 'react-router-dom'

export default function CardNoButton({ data }) {
  return (
    <div className="p-10">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="h-72 w-full object-cover"
          src={data.imagen}
          alt="Mountain"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.nombre}</div>
          <p className="text-gray-700 text-base">
            Descripcion: {data.descripcion}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {data.etiquetas.map((etiqueta) => (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {etiqueta}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
