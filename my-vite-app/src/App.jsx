import React from 'react';
import { useSelector } from 'react-redux';
import { useAuthState } from './hooks/useAuthState';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  // Hook personalizado para manejar el estado de autenticación
  useAuthState();

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Mostrar pantalla de carga mientras se verifica el estado de autenticación
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '50px',
            marginBottom: '20px'
          }}>
            🔄
          </div>
          <h2 style={{
            color: '#333',
            margin: '0 0 10px 0'
          }}>
            Cargando...
          </h2>
          <p style={{
            color: '#666',
            margin: 0
          }}>
            Verificando estado de autenticación
          </p>
        </div>
      </div>
    );
  }

  // Renderizar componente basado en el estado de autenticación
  return (
    <div>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
