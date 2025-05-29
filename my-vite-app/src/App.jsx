import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import BinaryTree from './utils/BinaryTree';

function App() {
  const [tree] = useState(() => new BinaryTree());
  const [treeData, setTreeData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [preorderResult, setPreorderResult] = useState([]);
  const [inorderResult, setInorderResult] = useState([]);
  const [postorderResult, setPostorderResult] = useState([]);
  const [treeStats, setTreeStats] = useState({ height: 0, nodeCount: 0 });
  const [lastOperation, setLastOperation] = useState('');

  const treeContainerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Configurar la posición inicial del árbol cuando el contenedor esté listo
  useEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 100
      });
    }
  }, [treeData]);

  // Actualizar toda la información del árbol
  const updateTreeInfo = () => {
    const d3Data = tree.toD3Format();
    setTreeData(d3Data);
    setPreorderResult(tree.preOrder());
    setInorderResult(tree.inOrder());
    setPostorderResult(tree.postOrder());
    setTreeStats({
      height: tree.getHeight(),
      nodeCount: tree.getNodeCount()
    });

    // Imprimir información en consola
    tree.printTreeInfo();
  };

  // Insertar un número en el árbol
  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Por favor, ingresa un número válido');
      return;
    }

    tree.insert(value);
    updateTreeInfo();
    setInputValue('');
    setLastOperation(`Insertado: ${value}`);
  };

  // Buscar un valor en el árbol
  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      alert('Por favor, ingresa un número válido para buscar');
      return;
    }

    const result = tree.searchWithPath(value);
    setSearchResult(result);
    setSearchValue('');
    setLastOperation(`Búsqueda: ${value} - ${result.found ? 'Encontrado' : 'No encontrado'}`);

    console.log(`🔍 Buscando ${value}:`);
    console.log(`📍 Resultado: ${result.found ? 'ENCONTRADO' : 'NO ENCONTRADO'}`);
    console.log(`🛤️ Camino recorrido: [${result.path.join(' → ')}]`);
  };

  // Insertar números de ejemplo
  const insertExampleNumbers = () => {
    const numbers = [10, 5, 15, 2, 7, 12, 20];
    console.log('🌳 Insertando números de ejemplo:', numbers);

    numbers.forEach(num => {
      tree.insert(num);
    });

    updateTreeInfo();
    setLastOperation(`Insertados números de ejemplo: [${numbers.join(', ')}]`);
  };

  // Limpiar el árbol
  const clearTree = () => {
    tree.clear();
    setTreeData(null);
    setPreorderResult([]);
    setInorderResult([]);
    setPostorderResult([]);
    setTreeStats({ height: 0, nodeCount: 0 });
    setSearchResult(null);
    setLastOperation('Árbol limpiado');
  };

  // Manejar Enter en los inputs
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Estilos personalizados para los nodos del árbol
  const nodeSize = { x: 120, y: 80 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -nodeSize.x / 2,
    y: -nodeSize.y / 2
  };

  // Componente personalizado para los nodos
  const renderCustomNodeElement = ({ nodeDatum }) => (
    <g>
      <circle r={20} fill="#007bff" stroke="#0056b3" strokeWidth="2" />
      <text
        fill="white"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        dy="0.3em"
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '30px',
        marginBottom: '20px'
      }}>
        <h1 style={{
          margin: '0 0 10px 0',
          color: '#333',
          fontSize: '32px',
          textAlign: 'center'
        }}>
          🌳 Challenge 14 - Árboles Binarios en React
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '16px',
          margin: 0
        }}>
          Implementación completa con inserción, búsqueda, recorridos y visualización con react-d3-tree
        </p>

        {lastOperation && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '6px',
            textAlign: 'center',
            border: '1px solid #c3e6cb'
          }}>
            ✅ {lastOperation}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Panel de Control */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px'
        }}>
          <h2 style={{ color: '#333', marginTop: 0 }}>🎮 Panel de Control</h2>

          {/* Insertar número */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>➕ Insertar Número</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleInsert)}
                placeholder="Ingresa un número"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleInsert}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Insertar
              </button>
            </div>
          </div>

          {/* Buscar valor */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>🔍 Buscar Valor</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleSearch)}
                placeholder="Número a buscar"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Buscar
              </button>
            </div>

            {searchResult && (
              <div style={{
                marginTop: '10px',
                padding: '12px',
                backgroundColor: searchResult.found ? '#d4edda' : '#f8d7da',
                color: searchResult.found ? '#155724' : '#721c24',
                borderRadius: '6px',
                border: `1px solid ${searchResult.found ? '#c3e6cb' : '#f5c6cb'}`
              }}>
                <strong>
                  {searchResult.found ? '✅ Encontrado' : '❌ No encontrado'}
                </strong>
                <br />
                <small>Camino: [{searchResult.path.join(' → ')}]</small>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '25px'
          }}>
            <button
              onClick={insertExampleNumbers}
              style={{
                padding: '12px',
                backgroundColor: '#ffc107',
                color: '#212529',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              📝 Números de Ejemplo
            </button>
            <button
              onClick={clearTree}
              style={{
                padding: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              🗑️ Limpiar Árbol
            </button>
          </div>

          {/* Estadísticas del árbol */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ color: '#333', marginTop: 0, fontSize: '16px' }}>📊 Estadísticas</h3>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <div><strong>Altura:</strong> {treeStats.height}</div>
              <div><strong>Nodos:</strong> {treeStats.nodeCount}</div>
            </div>
          </div>
        </div>

        {/* Panel de Información */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px'
        }}>
          <h2 style={{ color: '#333', marginTop: 0 }}>📋 Recorridos del Árbol</h2>

          {/* Recorridos */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#007bff', fontSize: '16px', margin: '0 0 5px 0' }}>
                🔍 PreOrder (Raíz → Izq → Der)
              </h4>
              <div style={{
                padding: '10px',
                backgroundColor: '#e7f3ff',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#0056b3',
                border: '1px solid #b8daff'
              }}>
                [{preorderResult.join(', ')}]
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#28a745', fontSize: '16px', margin: '0 0 5px 0' }}>
                🔍 InOrder (Izq → Raíz → Der)
              </h4>
              <div style={{
                padding: '10px',
                backgroundColor: '#d4edda',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#155724',
                border: '1px solid #c3e6cb'
              }}>
                [{inorderResult.join(', ')}]
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#ffc107', fontSize: '16px', margin: '0 0 5px 0' }}>
                🔍 PostOrder (Izq → Der → Raíz)
              </h4>
              <div style={{
                padding: '10px',
                backgroundColor: '#fff3cd',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#856404',
                border: '1px solid #ffeaa7'
              }}>
                [{postorderResult.join(', ')}]
              </div>
            </div>
          </div>

          {/* Información sobre los recorridos */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
            fontSize: '13px',
            color: '#666'
          }}>
            <h4 style={{ color: '#333', fontSize: '14px', marginTop: 0 }}>ℹ️ Información de Recorridos</h4>
            <div><strong>PreOrder:</strong> Útil para copiar el árbol</div>
            <div><strong>InOrder:</strong> Devuelve valores ordenados (BST)</div>
            <div><strong>PostOrder:</strong> Útil para eliminar nodos</div>
          </div>
        </div>
      </div>

      {/* Visualización del Árbol */}
      {treeData && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px',
          marginTop: '20px'
        }}>
          <h2 style={{ color: '#333', marginTop: 0, textAlign: 'center' }}>
            🌲 Visualización del Árbol Binario
          </h2>
          <div
            ref={treeContainerRef}
            style={{
              width: '100%',
              height: '500px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <Tree
              data={treeData}
              translate={translate}
              nodeSize={nodeSize}
              renderCustomNodeElement={renderCustomNodeElement}
              orientation="vertical"
              pathFunc="diagonal"
              separation={{ siblings: 1.5, nonSiblings: 2 }}
              zoom={0.8}
              scaleExtent={{ min: 0.1, max: 3 }}
              enableLegacyTransitions={true}
            />
          </div>
          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '14px',
            marginBottom: 0,
            marginTop: '10px'
          }}>
            💡 Puedes hacer zoom y arrastrar el árbol para explorarlo mejor
          </p>
        </div>
      )}

      {/* Instrucciones */}
      {!treeData && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#333' }}>🚀 ¡Comienza a usar el árbol binario!</h3>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Inserta algunos números o usa los números de ejemplo para ver la visualización del árbol.
            <br />
            Todos los recorridos y operaciones se mostrarán en la consola del navegador.
          </p>
          <div style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '2px solid #007bff',
            marginTop: '15px'
          }}>
            <strong style={{ color: '#007bff' }}>
              💡 Abre la consola del navegador (F12) para ver los logs detallados
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;