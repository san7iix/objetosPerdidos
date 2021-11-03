import React, { useEffect, useState } from 'react'

export default function CardObjeto({ data }) {
  const [datos, setdatos] = useState(data)

  useEffect(() => {})

  return (
    <div class="p-10">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src={datos.imagen} alt="Mountain" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{data.nombre}</div>
          <p class="text-gray-700 text-base">{data.descripcion}</p>
        </div>
        <div class="px-6 py-4">
          Encontrado por: <p className="font-bold">{datos.usuario}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          {datos.etiquetas.map((etiqueta) => (
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {etiqueta}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
