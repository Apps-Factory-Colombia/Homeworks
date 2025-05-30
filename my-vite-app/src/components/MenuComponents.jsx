import React from 'react';

// Componente de Perfil
export const ProfileComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            👤 Perfil de Usuario
        </h2>
        <div style={{ color: '#666' }}>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Email:</strong> juan.perez@example.com</p>
            <p><strong>Rol:</strong> Administrador</p>
            <p><strong>Último acceso:</strong> Hace 5 minutos</p>
        </div>
    </div>
);

// Componente de Configuración de Cuenta
export const AccountSettingsComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h3 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚙️ Configuración de Cuenta
        </h3>
        <div style={{ color: '#666' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                <input type="checkbox" defaultChecked /> Notificaciones por email
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                <input type="checkbox" /> Autenticación de dos factores
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                <input type="checkbox" defaultChecked /> Mantener sesión activa
            </label>
        </div>
    </div>
);

// Componente de Seguridad y Privacidad
export const SecurityPrivacyComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h3 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🔒 Seguridad y Privacidad
        </h3>
        <div style={{ color: '#666' }}>
            <p><strong>Última actualización de contraseña:</strong> Hace 30 días</p>
            <p><strong>Dispositivos activos:</strong> 3</p>
            <p><strong>Intentos de acceso fallidos:</strong> 0</p>
            <button style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                marginTop: '10px'
            }}>
                Cambiar Contraseña
            </button>
        </div>
    </div>
);

// Componente de Mensajes
export const MessagesComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            💬 Mensajes
        </h2>
        <div style={{ color: '#666' }}>
            <div style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px'
            }}>
                <h4 style={{ margin: '0 0 5px 0' }}>Nuevo proyecto disponible</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>Hace 2 horas - María González</p>
            </div>
            <div style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px'
            }}>
                <h4 style={{ margin: '0 0 5px 0' }}>Reunión programada</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>Hace 1 día - Carlos López</p>
            </div>
        </div>
    </div>
);

// Componente de Bandeja de Entrada
export const InboxComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h3 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            📥 Bandeja de Entrada
        </h3>
        <div style={{ color: '#666' }}>
            <p><strong>Mensajes nuevos:</strong> 3</p>
            <p><strong>Mensajes leídos:</strong> 15</p>
            <p><strong>Archivados:</strong> 42</p>
        </div>
    </div>
);

// Componente de Notificaciones
export const NotificationsComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h3 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🔔 Notificaciones
        </h3>
        <div style={{ color: '#666' }}>
            <div style={{
                backgroundColor: '#d4edda',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '10px'
            }}>
                ✅ Sistema actualizado correctamente
            </div>
            <div style={{
                backgroundColor: '#fff3cd',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '10px'
            }}>
                ⚠️ Mantenimiento programado para mañana
            </div>
        </div>
    </div>
);

// Componente de Configuración
export const SettingsComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚙️ Configuración
        </h2>
        <div style={{ color: '#666' }}>
            <p>Aquí puedes ajustar todas las configuraciones de la aplicación.</p>
            <div style={{ marginTop: '20px' }}>
                <h4>Configuraciones disponibles:</h4>
                <ul>
                    <li>Configuración de cuenta</li>
                    <li>Seguridad y privacidad</li>
                    <li>Notificaciones</li>
                </ul>
            </div>
        </div>
    </div>
);

// Componente de Dashboard
export const DashboardComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            📊 Dashboard
        </h2>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px'
        }}>
            <div style={{
                backgroundColor: '#e7f3ff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <h3 style={{ color: '#007bff', margin: '0 0 10px 0' }}>Usuarios</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>1,234</p>
            </div>
            <div style={{
                backgroundColor: '#d4edda',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <h3 style={{ color: '#28a745', margin: '0 0 10px 0' }}>Ventas</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>$45,678</p>
            </div>
            <div style={{
                backgroundColor: '#fff3cd',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <h3 style={{ color: '#ffc107', margin: '0 0 10px 0' }}>Pedidos</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>567</p>
            </div>
        </div>
    </div>
);

// Componente de Ayuda
export const HelpComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ❓ Ayuda
        </h2>
        <div style={{ color: '#666' }}>
            <h4>Preguntas frecuentes:</h4>
            <div style={{ marginBottom: '15px' }}>
                <h5>¿Cómo cambio mi contraseña?</h5>
                <p>Ve a Configuración → Seguridad y Privacidad</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <h5>¿Cómo veo mis mensajes?</h5>
                <p>Usa el menú lateral, sección Mensajes</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <h5>¿Cómo contacto soporte?</h5>
                <p>Envía un email a soporte@example.com</p>
            </div>
        </div>
    </div>
);

// Componente de FAQ
export const FAQComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
        <h3 style={{ color: '#333', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            📋 Preguntas Frecuentes
        </h3>
        <div style={{ color: '#666' }}>
            <details style={{ marginBottom: '10px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    ¿Cómo funciona el árbol N-ario?
                </summary>
                <p>Un árbol N-ario permite que cada nodo tenga múltiples hijos, no solo 2 como en los binarios.</p>
            </details>
            <details style={{ marginBottom: '10px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    ¿Puedo personalizar el menú?
                </summary>
                <p>Sí, puedes agregar, quitar y reorganizar elementos del menú dinámicamente.</p>
            </details>
        </div>
    </div>
);

// Componente por defecto cuando no se selecciona nada
export const DefaultComponent = () => (
    <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
    }}>
        <h2 style={{ color: '#333', marginTop: 0 }}>🌳 Challenge 15 - Árboles N-arios</h2>
        <p style={{ color: '#666', fontSize: '18px' }}>
            ¡Bienvenido al sistema de menús con árbol N-ario!
        </p>
        <p style={{ color: '#666' }}>
            Selecciona cualquier elemento del menú lateral para ver su contenido.
            <br />
            Los elementos con submenús se pueden expandir y colapsar.
        </p>
        <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '2px solid #007bff'
        }}>
            <strong style={{ color: '#007bff' }}>
                💡 Abre la consola del navegador (F12) para ver los logs del árbol N-ario
            </strong>
        </div>
    </div>
); 