import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                padding: '20px 0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        margin: 0,
                        color: '#333',
                        fontSize: '24px'
                    }}>
                        🔥 Challenge 11 - Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? '⏳ Cerrando...' : '🚪 Cerrar Sesión'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 20px'
            }}>
                {/* Welcome Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    padding: '30px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="Foto de perfil"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    marginRight: '20px',
                                    objectFit: 'cover',
                                    border: '3px solid #007bff'
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: '#007bff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '20px',
                                fontSize: '30px'
                            }}>
                                👤
                            </div>
                        )}

                        <div>
                            <h2 style={{
                                margin: '0 0 5px 0',
                                color: '#333',
                                fontSize: '24px'
                            }}>
                                ¡Bienvenido! 🎉
                            </h2>
                            <p style={{
                                margin: 0,
                                color: '#666',
                                fontSize: '16px'
                            }}>
                                Has iniciado sesión exitosamente
                            </p>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6'
                    }}>
                        <h3 style={{
                            margin: '0 0 15px 0',
                            color: '#333',
                            fontSize: '18px'
                        }}>
                            📋 Información del Usuario
                        </h3>

                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>📧 Email:</strong>
                            <span style={{ marginLeft: '10px', color: '#6c757d' }}>
                                {user?.email || 'No disponible'}
                            </span>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>👤 Nombre:</strong>
                            <span style={{ marginLeft: '10px', color: '#6c757d' }}>
                                {user?.displayName || 'No especificado'}
                            </span>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#495057' }}>🆔 UID:</strong>
                            <span style={{
                                marginLeft: '10px',
                                color: '#6c757d',
                                fontFamily: 'monospace',
                                fontSize: '14px'
                            }}>
                                {user?.uid || 'No disponible'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Features Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    padding: '30px'
                }}>
                    <h3 style={{
                        margin: '0 0 20px 0',
                        color: '#333',
                        fontSize: '20px'
                    }}>
                        ✅ Funcionalidades Implementadas
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#e7f3ff',
                            borderRadius: '8px',
                            border: '2px solid #007bff'
                        }}>
                            <h4 style={{
                                margin: '0 0 10px 0',
                                color: '#007bff',
                                fontSize: '16px'
                            }}>
                                📧 Login con Email y Contraseña
                            </h4>
                            <p style={{
                                margin: 0,
                                color: '#495057',
                                fontSize: '14px'
                            }}>
                                Sistema completo de autenticación con email y contraseña usando Firebase Auth y Redux.
                            </p>
                        </div>

                        <div style={{
                            padding: '20px',
                            backgroundColor: '#fff3e0',
                            borderRadius: '8px',
                            border: '2px solid #ff9800'
                        }}>
                            <h4 style={{
                                margin: '0 0 10px 0',
                                color: '#ff9800',
                                fontSize: '16px'
                            }}>
                                🔍 Login con Google
                            </h4>
                            <p style={{
                                margin: 0,
                                color: '#495057',
                                fontSize: '14px'
                            }}>
                                Integración con Google Sign-In para autenticación rápida y segura.
                            </p>
                        </div>

                        <div style={{
                            padding: '20px',
                            backgroundColor: '#f3e5f5',
                            borderRadius: '8px',
                            border: '2px solid #9c27b0'
                        }}>
                            <h4 style={{
                                margin: '0 0 10px 0',
                                color: '#9c27b0',
                                fontSize: '16px'
                            }}>
                                🚪 Logout de Firebase
                            </h4>
                            <p style={{
                                margin: 0,
                                color: '#495057',
                                fontSize: '14px'
                            }}>
                                Cierre de sesión seguro que actualiza el estado global de Redux.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 