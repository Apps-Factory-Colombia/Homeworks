import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendMessage,
    setupRealtimeListener,
    disconnectListener,
    clearError
} from '../redux/realtimeSlice';

const RealtimeChat = () => {
    const dispatch = useDispatch();
    const { messages, isConnected, isSending, error } = useSelector((state) => state.realtime);
    const { user } = useSelector((state) => state.auth);

    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Configurar listener al montar el componente
    useEffect(() => {
        dispatch(setupRealtimeListener());

        // Cleanup al desmontar
        return () => {
            dispatch(disconnectListener());
        };
    }, [dispatch]);

    // Auto-scroll a los mensajes más recientes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!messageText.trim()) return;

        await dispatch(sendMessage({
            message: messageText.trim(),
            userName: user?.displayName || user?.email?.split('@')[0] || 'Usuario Anónimo',
            userEmail: user?.email || 'no-email'
        }));

        setMessageText('');
        inputRef.current?.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const formatTimestamp = (timestamp) => {
        try {
            const date = new Date(timestamp);
            const now = new Date();
            const isToday = date.toDateString() === now.toDateString();

            if (isToday) {
                return date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } else {
                return date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        } catch {
            return 'Ahora';
        }
    };

    const getMessageBubbleStyle = (messageUserEmail) => {
        const isMyMessage = messageUserEmail === user?.email;
        return {
            maxWidth: '70%',
            padding: '12px 16px',
            borderRadius: '18px',
            marginBottom: '4px',
            wordWrap: 'break-word',
            fontSize: '14px',
            lineHeight: '1.4',
            backgroundColor: isMyMessage ? '#007bff' : '#f1f3f4',
            color: isMyMessage ? 'white' : '#333',
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
            borderBottomRightRadius: isMyMessage ? '4px' : '18px',
            borderBottomLeftRadius: isMyMessage ? '18px' : '4px'
        };
    };

    const getUserDisplayName = (messageUserName, messageUserEmail) => {
        if (messageUserEmail === user?.email) {
            return 'Tú';
        }
        return messageUserName || 'Usuario Anónimo';
    };

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            height: 'calc(100vh - 200px)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                padding: '20px 30px',
                borderBottom: '1px solid #e9ecef'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        margin: 0,
                        color: '#333',
                        fontSize: '24px'
                    }}>
                        💬 Challenge 13 - Chat en Tiempo Real
                    </h1>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: isConnected ? '#28a745' : '#dc3545'
                        }}></div>
                        <span style={{
                            fontSize: '14px',
                            color: isConnected ? '#28a745' : '#dc3545',
                            fontWeight: 'bold'
                        }}>
                            {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
                        </span>
                    </div>
                </div>

                {error && (
                    <div style={{
                        marginTop: '15px',
                        padding: '12px',
                        backgroundColor: '#fee',
                        color: '#721c24',
                        borderRadius: '6px',
                        border: '1px solid #f5c6cb'
                    }}>
                        ⚠️ Error: {error}
                    </div>
                )}
            </div>

            {/* Messages Area */}
            <div style={{
                flex: 1,
                backgroundColor: 'white',
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: '400px',
                maxHeight: '500px'
            }}>
                {messages.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '16px',
                        marginTop: '50px'
                    }}>
                        💬 No hay mensajes aún. ¡Envía el primer mensaje!
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: message.userEmail === user?.email ? 'flex-end' : 'flex-start',
                                marginBottom: '8px'
                            }}
                        >
                            {/* Nombre del usuario y timestamp */}
                            <div style={{
                                fontSize: '12px',
                                color: '#666',
                                marginBottom: '4px',
                                paddingLeft: message.userEmail === user?.email ? '0' : '16px',
                                paddingRight: message.userEmail === user?.email ? '16px' : '0'
                            }}>
                                {getUserDisplayName(message.userName, message.userEmail)} • {formatTimestamp(message.timestamp || message.createdAt)}
                            </div>

                            {/* Burbuja del mensaje */}
                            <div style={getMessageBubbleStyle(message.userEmail)}>
                                {message.text}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0 0 12px 12px',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                padding: '20px 30px',
                borderTop: '1px solid #e9ecef'
            }}>
                <form onSubmit={handleSendMessage} style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-end'
                }}>
                    <div style={{ flex: 1 }}>
                        <textarea
                            ref={inputRef}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu mensaje..."
                            disabled={!isConnected || isSending}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #ddd',
                                borderRadius: '20px',
                                fontSize: '14px',
                                resize: 'none',
                                minHeight: '44px',
                                maxHeight: '120px',
                                fontFamily: 'Arial, sans-serif',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!messageText.trim() || !isConnected || isSending}
                        style={{
                            padding: '12px 20px',
                            backgroundColor: (!messageText.trim() || !isConnected || isSending) ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: (!messageText.trim() || !isConnected || isSending) ? 'not-allowed' : 'pointer',
                            minWidth: '100px',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        {isSending ? '📤 Enviando...' : '🚀 Enviar'}
                    </button>
                </form>

                <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#666',
                    textAlign: 'center'
                }}>
                    Presiona Enter para enviar • Shift + Enter para nueva línea
                </div>
            </div>
        </div>
    );
};

export default RealtimeChat; 