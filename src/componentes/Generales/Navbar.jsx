import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-primary">
      <div className="py-4 px-8 xl:max-w-6x1 mx-auto">
        <div className="flex justify-between mr-4">
          <div className="">
            <Link to="/" className="flex items-center text-white">
              <img
                src="https://cdn.unimagdalena.edu.co/images/escudo/bg_dark/default.png"
                alt="Logo"
              />
              <span className="ml-2 hover:underline">
                Universidad del Magdalena
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <Link className="hover:underline" to="/">Inicio</Link>
            <Link className="hover:underline" to="/objetos">Objetos</Link>
            <Link className="hover:underline" to="/perfil">Perfil</Link>
            <Link className="hover:underline" to="/login">Login</Link>
          </div>
          <div className="sm:hidden flex items-center">
            <div>Secondary nav</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
