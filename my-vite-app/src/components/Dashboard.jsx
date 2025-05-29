import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import FirestoreManager from './FirestoreManager';
import RealtimeChat from './RealtimeChat';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = () => {
        dispatch(logout());
    };

    const tabStyle = (isActive) => ({
        padding: '12px 20px',
        margin: '0 3px',
        border: 'none',
        backgroundColor: isActive ? '#007bff' : '#f8f9fa',
        color: isActive ? 'white' : '#333',
        cursor: 'pointer',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.3s ease'
    });

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
                        🔥 Challenge 11, 12 & 13 - Firebase App
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

            {/* Tab Navigation */}
            <div style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #dee2e6',
                padding: '15px 0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '5px'
                }}>
                    <button
                        style={tabStyle(activeTab === 'profile')}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Mi Perfil
                    </button>
                    <button
                        style={tabStyle(activeTab === 'firestore')}
                        onClick={() => setActiveTab('firestore')}
                    >
                        🔥 Firestore CRUD
                    </button>
                    <button
                        style={tabStyle(activeTab === 'chat')}
                        onClick={() => setActiveTab('chat')}
                    >
                        💬 Chat en Tiempo Real
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: activeTab === 'chat' ? '20px 20px' : '40px 20px'
            }}>
                {activeTab === 'profile' ? (
                    // Profile Tab Content
                    <>
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
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                                        📧 Challenge 11: Autenticación
                                    </h4>
                                    <p style={{
                                        margin: 0,
                                        color: '#495057',
                                        fontSize: '14px'
                                    }}>
                                        Login con email/contraseña, Google Sign-In y logout seguro con Firebase Auth y Redux.
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
                                        🔥 Challenge 12: Firestore CRUD
                                    </h4>
                                    <p style={{
                                        margin: 0,
                                        color: '#495057',
                                        fontSize: '14px'
                                    }}>
                                        Operaciones completas de Create, Read, Update y Delete en Firestore con Redux.
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
                                        💬 Challenge 13: Chat en Tiempo Real
                                    </h4>
                                    <p style={{
                                        margin: 0,
                                        color: '#495057',
                                        fontSize: '14px'
                                    }}>
                                        Sistema de mensajería instantánea usando Firebase Realtime Database.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeTab === 'firestore' ? (
                    // Firestore Tab Content
                    <FirestoreManager />
                ) : (
                    // Chat Tab Content
                    <RealtimeChat />
                )}
            </div>
        </div>
    );
};

export default Dashboard; 