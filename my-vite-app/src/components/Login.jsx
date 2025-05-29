import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithEmail, registerWithEmail, loginWithGoogle, clearError } from '../redux/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (isRegisterMode) {
            if (formData.password !== formData.confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            dispatch(registerWithEmail({
                email: formData.email,
                password: formData.password
            }));
        } else {
            dispatch(loginWithEmail({
                email: formData.email,
                password: formData.password
            }));
        }
    };

    const handleGoogleLogin = () => {
        dispatch(loginWithGoogle());
    };

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        dispatch(clearError());
        setFormData({ email: '', password: '', confirmPassword: '' });
    };

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
                width: '100%',
                maxWidth: '400px'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{
                        color: '#333',
                        marginBottom: '10px',
                        fontSize: '28px'
                    }}>
                        🔥 Challenge 11
                    </h1>
                    <h2 style={{
                        color: '#666',
                        fontWeight: 'normal',
                        fontSize: '18px',
                        margin: '0'
                    }}>
                        {isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </h2>
                </div>

                {/* Error Display */}
                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        color: '#c33',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '20px',
                        border: '1px solid #fcc'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Email/Password Form */}
                <form onSubmit={handleEmailSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#333',
                            fontWeight: 'bold'
                        }}>
                            📧 Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#333',
                            fontWeight: 'bold'
                        }}>
                            🔒 Contraseña:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    {isRegisterMode && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#333',
                                fontWeight: 'bold'
                            }}>
                                🔒 Confirmar Contraseña:
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            marginBottom: '20px',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? '⏳ Procesando...' : (isRegisterMode ? '✅ Registrarse' : '🚀 Iniciar Sesión')}
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    textAlign: 'center',
                    margin: '20px 0',
                    position: 'relative'
                }}>
                    <div style={{
                        height: '1px',
                        backgroundColor: '#ddd',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0
                    }}></div>
                    <span style={{
                        backgroundColor: 'white',
                        padding: '0 15px',
                        color: '#666',
                        fontSize: '14px'
                    }}>
                        o
                    </span>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: '#db4437',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        marginBottom: '20px',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? '⏳ Conectando...' : '🔍 Continuar con Google'}
                </button>

                {/* Toggle Mode */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={toggleMode}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#007bff',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px'
                        }}
                    >
                        {isRegisterMode
                            ? '¿Ya tienes cuenta? Inicia sesión'
                            : '¿No tienes cuenta? Regístrate'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login; 