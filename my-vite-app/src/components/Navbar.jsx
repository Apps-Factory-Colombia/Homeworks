import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          NeoNet
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/profile" className="hover:text-cyan-300 transition">
            Perfil
          </Link>
          <Link to="/explore" className="hover:text-cyan-300 transition">
            Descubrir
          </Link>
          <button
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={logout}
          >
            Salir
          </button>
        </div>


      </div>

      {/* Menú desplegable en móviles */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4 space-y-4 flex flex-col items-center">
          <Link to="/profile" className="hover:text-cyan-300 transition">
            Perfil
          </Link>
          <Link to="/explore" className="hover:text-cyan-300 transition">
            Descubrir
          </Link>
          <button
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={logout}
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
