import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    clearError
} from '../redux/firestoreSlice';

const FirestoreManager = () => {
    const dispatch = useDispatch();
    const { documents, isLoading, error, lastOperation } = useSelector((state) => state.firestore);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'personal'
    });

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const collectionName = 'tasks'; // Nombre de la colección en Firestore

    // Cargar documentos al montar el componente
    useEffect(() => {
        dispatch(getDocuments(collectionName));
    }, [dispatch]);

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // CREATE - Agregar nuevo documento
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        await dispatch(addDocument({
            collectionName,
            data: formData
        }));

        // Limpiar formulario
        setFormData({
            title: '',
            description: '',
            category: 'personal'
        });
    };

    // UPDATE - Iniciar edición
    const startEdit = (doc) => {
        setEditingId(doc.id);
        setEditData({
            title: doc.title,
            description: doc.description,
            category: doc.category
        });
    };

    // UPDATE - Guardar cambios
    const handleUpdate = async (docId) => {
        await dispatch(updateDocument({
            collectionName,
            docId,
            data: editData
        }));
        setEditingId(null);
        setEditData({});
    };

    // DELETE - Eliminar documento
    const handleDelete = async (docId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            await dispatch(deleteDocument({
                collectionName,
                docId
            }));
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    const refreshData = () => {
        dispatch(getDocuments(collectionName));
    };

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                padding: '30px',
                marginBottom: '30px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1 style={{
                        margin: 0,
                        color: '#333',
                        fontSize: '28px'
                    }}>
                        🔥 Challenge 12 - Firestore CRUD
                    </h1>
                    <button
                        onClick={refreshData}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        🔄 Actualizar
                    </button>
                </div>

                {/* Status */}
                {lastOperation && (
                    <div style={{
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '20px',
                        backgroundColor:
                            lastOperation === 'error' ? '#fee' :
                                lastOperation.includes('adding') || lastOperation.includes('updating') || lastOperation.includes('deleting') ? '#fff3cd' :
                                    '#d4edda',
                        color:
                            lastOperation === 'error' ? '#721c24' :
                                lastOperation.includes('adding') || lastOperation.includes('updating') || lastOperation.includes('deleting') ? '#856404' :
                                    '#155724'
                    }}>
                        {lastOperation === 'adding' && '⏳ Agregando documento...'}
                        {lastOperation === 'added' && '✅ Documento agregado exitosamente'}
                        {lastOperation === 'updating' && '⏳ Actualizando documento...'}
                        {lastOperation === 'updated' && '✅ Documento actualizado exitosamente'}
                        {lastOperation === 'deleting' && '⏳ Eliminando documento...'}
                        {lastOperation === 'deleted' && '✅ Documento eliminado exitosamente'}
                        {lastOperation === 'loading' && '⏳ Cargando documentos...'}
                        {lastOperation === 'loaded' && '✅ Documentos cargados exitosamente'}
                        {lastOperation === 'error' && `❌ Error: ${error}`}
                    </div>
                )}

                {/* Add Form */}
                <form onSubmit={handleAdd}>
                    <h3 style={{ color: '#333', marginBottom: '15px' }}>➕ Agregar Nueva Tarea</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Título de la tarea"
                            required
                            style={{
                                padding: '12px',
                                border: '2px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '14px'
                            }}
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Descripción (opcional)"
                            style={{
                                padding: '12px',
                                border: '2px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '14px',
                                resize: 'vertical',
                                minHeight: '45px'
                            }}
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            style={{
                                padding: '12px',
                                border: '2px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '14px'
                            }}
                        >
                            <option value="personal">Personal</option>
                            <option value="trabajo">Trabajo</option>
                            <option value="estudio">Estudio</option>
                            <option value="urgente">Urgente</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !formData.title.trim()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            opacity: (isLoading || !formData.title.trim()) ? 0.6 : 1
                        }}
                    >
                        {isLoading ? '⏳ Agregando...' : '➕ Agregar Tarea'}
                    </button>
                </form>
            </div>

            {/* Documents List */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                padding: '30px'
            }}>
                <h3 style={{ color: '#333', marginBottom: '20px' }}>
                    📋 Lista de Tareas ({documents.length})
                </h3>

                {documents.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#666',
                        padding: '40px',
                        fontSize: '16px'
                    }}>
                        📝 No hay tareas creadas. ¡Agrega tu primera tarea!
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                style={{
                                    border: '2px solid #e9ecef',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    backgroundColor: '#f8f9fa'
                                }}
                            >
                                {editingId === doc.id ? (
                                    // Modo de edición
                                    <div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '10px', marginBottom: '15px' }}>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editData.title || ''}
                                                onChange={handleEditInputChange}
                                                style={{
                                                    padding: '8px',
                                                    border: '2px solid #007bff',
                                                    borderRadius: '4px',
                                                    fontSize: '14px'
                                                }}
                                            />

                                            <textarea
                                                name="description"
                                                value={editData.description || ''}
                                                onChange={handleEditInputChange}
                                                style={{
                                                    padding: '8px',
                                                    border: '2px solid #007bff',
                                                    borderRadius: '4px',
                                                    fontSize: '14px',
                                                    resize: 'vertical',
                                                    minHeight: '60px'
                                                }}
                                            />

                                            <select
                                                name="category"
                                                value={editData.category || 'personal'}
                                                onChange={handleEditInputChange}
                                                style={{
                                                    padding: '8px',
                                                    border: '2px solid #007bff',
                                                    borderRadius: '4px',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                <option value="personal">Personal</option>
                                                <option value="trabajo">Trabajo</option>
                                                <option value="estudio">Estudio</option>
                                                <option value="urgente">Urgente</option>
                                            </select>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => handleUpdate(doc.id)}
                                                disabled={isLoading}
                                                style={{
                                                    padding: '8px 16px',
                                                    backgroundColor: '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                ✅ Guardar
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                style={{
                                                    padding: '8px 16px',
                                                    backgroundColor: '#6c757d',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Modo de visualización
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '10px'
                                        }}>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{
                                                    margin: '0 0 5px 0',
                                                    color: '#333',
                                                    fontSize: '18px'
                                                }}>
                                                    {doc.title}
                                                </h4>
                                                {doc.description && (
                                                    <p style={{
                                                        margin: '0 0 10px 0',
                                                        color: '#666',
                                                        fontSize: '14px'
                                                    }}>
                                                        {doc.description}
                                                    </p>
                                                )}
                                                <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#888' }}>
                                                    <span>
                                                        🏷️ {doc.category}
                                                    </span>
                                                    <span>
                                                        📅 Creado: {doc.createdAt ? new Date(doc.createdAt).toLocaleString() : 'N/A'}
                                                    </span>
                                                    {doc.updatedAt && doc.updatedAt !== doc.createdAt && (
                                                        <span>
                                                            ✏️ Actualizado: {new Date(doc.updatedAt).toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                                                <button
                                                    onClick={() => startEdit(doc)}
                                                    disabled={isLoading}
                                                    style={{
                                                        padding: '8px 12px',
                                                        backgroundColor: '#ffc107',
                                                        color: '#212529',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(doc.id)}
                                                    disabled={isLoading}
                                                    style={{
                                                        padding: '8px 12px',
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FirestoreManager; 