import React from 'react';

const Sidebar = ({
    menuTree,
    visibleNodes,
    selectedNodeId,
    onNodeClick,
    onToggleExpand
}) => {

    // Renderizar un elemento individual del menú
    const renderMenuItem = (node) => {
        const isSelected = selectedNodeId === node.id;
        const indentLevel = node.depth;
        const paddingLeft = 20 + (indentLevel * 15); // Indentación basada en profundidad

        return (
            <div key={node.id}>
                {/* Elemento del menú */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 15px',
                        paddingLeft: `${paddingLeft}px`,
                        backgroundColor: isSelected ? '#007bff' : 'transparent',
                        color: isSelected ? 'white' : '#333',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        margin: '2px 10px',
                        transition: 'all 0.2s ease',
                        border: isSelected ? '2px solid #0056b3' : '2px solid transparent',
                        fontWeight: isSelected ? 'bold' : 'normal'
                    }}
                    onClick={() => onNodeClick(node)}
                    onMouseEnter={(e) => {
                        if (!isSelected) {
                            e.target.style.backgroundColor = '#f8f9fa';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSelected) {
                            e.target.style.backgroundColor = 'transparent';
                        }
                    }}
                >
                    {/* Icono de expansión/colapso */}
                    {node.hasChildren && (
                        <span
                            style={{
                                marginRight: '8px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                userSelect: 'none',
                                minWidth: '16px',
                                textAlign: 'center'
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleExpand(node.id);
                            }}
                        >
                            {node.isExpanded ? '▼' : '▶'}
                        </span>
                    )}

                    {/* Espaciado para elementos sin hijos */}
                    {!node.hasChildren && (
                        <span style={{ marginRight: '8px', minWidth: '16px' }}></span>
                    )}

                    {/* Icono del elemento */}
                    <span style={{ marginRight: '10px', fontSize: '16px' }}>
                        {node.icon || '📄'}
                    </span>

                    {/* Título del elemento */}
                    <span style={{
                        flex: 1,
                        fontSize: '14px',
                        fontWeight: isSelected ? 'bold' : 'normal'
                    }}>
                        {node.title}
                    </span>

                    {/* Indicador de enlace */}
                    {node.link !== '#' && (
                        <span style={{
                            fontSize: '12px',
                            opacity: 0.7,
                            marginLeft: '5px'
                        }}>
                            🔗
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div style={{
            width: '300px',
            height: '100vh',
            backgroundColor: 'white',
            borderRight: '2px solid #e9ecef',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1000
        }}>
            {/* Header del sidebar */}
            <div style={{
                padding: '20px 15px',
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #e9ecef',
                position: 'sticky',
                top: 0,
                zIndex: 1001
            }}>
                <h3 style={{
                    margin: 0,
                    color: '#333',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    🌲 Menú de Navegación
                </h3>
                <p style={{
                    margin: '5px 0 0 0',
                    color: '#666',
                    fontSize: '12px'
                }}>
                    Árbol N-ario • {menuTree?.getTotalNodeCount() || 0} elementos
                </p>
            </div>

            {/* Contenido del menú */}
            <div style={{ padding: '10px 0' }}>
                {visibleNodes.length === 0 ? (
                    <div style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#666'
                    }}>
                        <p>🌳 No hay elementos en el menú</p>
                        <p style={{ fontSize: '12px' }}>
                            Los elementos se cargarán automáticamente
                        </p>
                    </div>
                ) : (
                    visibleNodes.map(node => renderMenuItem(node))
                )}
            </div>

            {/* Footer del sidebar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #e9ecef',
                fontSize: '12px',
                color: '#666',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '5px' }}>
                    <strong>🌳 Challenge 15</strong>
                </div>
                <div>Árboles N-arios en React</div>
            </div>
        </div>
    );
};

export default Sidebar; 