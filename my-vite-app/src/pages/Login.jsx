import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    if (username === "user_demo" && passcode === "secure123") {
      login(username);
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Acceder a tu cuenta
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-medium shadow-sm transition-transform transform hover:scale-105 hover:bg-indigo-700 active:scale-95"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
