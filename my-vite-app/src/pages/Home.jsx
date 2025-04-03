import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center transform transition duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-4">
          Bienvenido a ConexiónX
        </h1>
        <p className="text-lg text-gray-300">
          Conéctate, comparte y descubre contenido increíble en una comunidad vibrante.
        </p>
        <p className="mt-3 text-gray-400">
          Inicia sesión para acceder a todas las funciones.
        </p>

        <Button text="Acceder Ahora" handleFunction={handleNavigate} />
      </div>
    </div>
  );
};

export default Home;
