import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import GraphClass from './utils/Graph';

function App() {
  const [graph] = useState(() => new GraphClass());
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [stats, setStats] = useState({ totalNodes: 0, totalEdges: 0, cities: 0, people: 0 });

  // Estados para formularios
  const [personName, setPersonName] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [personCity, setPersonCity] = useState('');
  const [cityName, setCityName] = useState('');
  const [friend1, setFriend1] = useState('');
  const [friend2, setFriend2] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Estado para logs
  const [lastOperation, setLastOperation] = useState('');

  // Actualizar los datos del grafo
  const updateGraphData = () => {
    const d3Data = graph.toD3Format();
    setGraphData(d3Data);
    setStats(graph.getStats());
    graph.printGraph();
  };

  // Agregar persona
  const handleAddPerson = () => {
    if (!personName.trim() || !personAge || !personCity.trim()) {
      alert('Por favor, completa todos los campos de la persona');
      return;
    }

    const age = parseInt(personAge);
    if (isNaN(age) || age < 0 || age > 150) {
      alert('Por favor, ingresa una edad válida (0-150)');
      return;
    }

    graph.addPerson(personName.trim(), age, personCity.trim());
    updateGraphData();
    setPersonName('');
    setPersonAge('');
    setPersonCity('');
    setLastOperation(`Agregada persona: ${personName} (${age} años) en ${personCity}`);
  };

  // Agregar ciudad
  const handleAddCity = () => {
    if (!cityName.trim()) {
      alert('Por favor, ingresa el nombre de la ciudad');
      return;
    }

    // Verificar si la ciudad ya existe
    const existingCity = graph.getAllCities().find(c =>
      c.name.toLowerCase() === cityName.trim().toLowerCase()
    );

    if (existingCity) {
      alert('Esta ciudad ya existe en el grafo');
      return;
    }

    graph.addCity(cityName.trim());
    updateGraphData();
    setCityName('');
    setLastOperation(`Agregada ciudad: ${cityName}`);
  };

  // Agregar amistad
  const handleAddFriendship = () => {
    if (!friend1.trim() || !friend2.trim()) {
      alert('Por favor, ingresa los nombres de ambas personas');
      return;
    }

    if (friend1.trim().toLowerCase() === friend2.trim().toLowerCase()) {
      alert('Una persona no puede ser amiga de sí misma');
      return;
    }

    graph.addFriendship(friend1.trim(), friend2.trim());
    updateGraphData();
    setFriend1('');
    setFriend2('');
    setLastOperation(`Amistad creada entre ${friend1} y ${friend2}`);
  };

  // Buscar personas en ciudad
  const handleSearchPeopleInCity = () => {
    if (!searchCity.trim()) {
      alert('Por favor, ingresa el nombre de la ciudad');
      return;
    }

    const people = graph.getPeopleInCity(searchCity.trim());
    setSearchResults(people);
    setLastOperation(`Búsqueda en ${searchCity}: ${people.length} personas encontradas`);
  };

  // Cargar datos de ejemplo
  const loadExampleData = () => {
    console.log('🌟 Cargando datos de ejemplo...');

    // Limpiar grafo actual
    graph.clear();

    // Agregar ciudades
    graph.addCity('Madrid');
    graph.addCity('Barcelona');
    graph.addCity('Valencia');
    graph.addCity('Sevilla');

    // Agregar personas
    graph.addPerson('Ana García', 28, 'Madrid');
    graph.addPerson('Carlos López', 35, 'Madrid');
    graph.addPerson('María Rodríguez', 31, 'Barcelona');
    graph.addPerson('José Martínez', 42, 'Barcelona');
    graph.addPerson('Laura Sánchez', 26, 'Valencia');
    graph.addPerson('Miguel Torres', 39, 'Valencia');
    graph.addPerson('Carmen Ruiz', 33, 'Sevilla');
    graph.addPerson('Francisco Morales', 45, 'Sevilla');
    graph.addPerson('Isabel Jiménez', 29, 'Madrid');
    graph.addPerson('Antonio Herrera', 37, 'Barcelona');

    // Agregar amistades
    graph.addFriendship('Ana García', 'Carlos López');
    graph.addFriendship('Ana García', 'Isabel Jiménez');
    graph.addFriendship('María Rodríguez', 'José Martínez');
    graph.addFriendship('María Rodríguez', 'Antonio Herrera');
    graph.addFriendship('Laura Sánchez', 'Miguel Torres');
    graph.addFriendship('Carmen Ruiz', 'Francisco Morales');
    graph.addFriendship('Carlos López', 'María Rodríguez');
    graph.addFriendship('Isabel Jiménez', 'Laura Sánchez');

    updateGraphData();
    setSearchResults([]);
    setLastOperation('Datos de ejemplo cargados: 4 ciudades, 10 personas, 8 amistades');
  };

  // Limpiar grafo
  const clearGraph = () => {
    graph.clear();
    setGraphData({ nodes: [], links: [] });
    setStats({ totalNodes: 0, totalEdges: 0, cities: 0, people: 0 });
    setSearchResults([]);
    setLastOperation('Grafo limpiado');
  };

  // Configuración para react-d3-graph
  const graphConfig = {
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    width: 800,
    height: 500,
    node: {
      color: '#007bff',
      size: 400,
      highlightStrokeColor: '#ff6b6b',
      highlightStrokeWidth: 3,
      highlightColor: '#ff6b6b',
      labelProperty: 'name',
      renderLabel: true,
      fontSize: 12,
      fontWeight: 'bold'
    },
    link: {
      highlightColor: '#ff6b6b',
      strokeWidth: 2
    },
    d3: {
      gravity: -300,
      linkLength: 150,
      linkStrength: 1,
      disableLinkForce: false
    }
  };

  // Cargar datos de ejemplo al iniciar
  useEffect(() => {
    loadExampleData();
  }, []);

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
          🌐 Challenge 16 - Grafos de Personas y Ciudades
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '16px',
          margin: 0
        }}>
          Sistema completo de grafos con personas, ciudades y amistades usando react-d3-graph
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

          {/* Agregar Persona */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>👤 Agregar Persona</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Nombre completo"
                style={{
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <input
                type="number"
                value={personAge}
                onChange={(e) => setPersonAge(e.target.value)}
                placeholder="Edad"
                min="0"
                max="150"
                style={{
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                value={personCity}
                onChange={(e) => setPersonCity(e.target.value)}
                placeholder="Ciudad donde vive"
                style={{
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleAddPerson}
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
                ➕ Agregar Persona
              </button>
            </div>
          </div>

          {/* Agregar Ciudad */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>🏙️ Agregar Ciudad</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Nombre de la ciudad"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleAddCity}
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
                ➕ Agregar
              </button>
            </div>
          </div>

          {/* Agregar Amistad */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>🤝 Crear Amistad</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={friend1}
                onChange={(e) => setFriend1(e.target.value)}
                placeholder="Nombre de la primera persona"
                style={{
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                value={friend2}
                onChange={(e) => setFriend2(e.target.value)}
                placeholder="Nombre de la segunda persona"
                style={{
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleAddFriendship}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🤝 Crear Amistad
              </button>
            </div>
          </div>

          {/* Controles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '25px'
          }}>
            <button
              onClick={loadExampleData}
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
              📝 Datos de Ejemplo
            </button>
            <button
              onClick={clearGraph}
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
              🗑️ Limpiar Grafo
            </button>
          </div>

          {/* Estadísticas */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ color: '#333', marginTop: 0, fontSize: '16px' }}>📊 Estadísticas del Grafo</h3>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <div><strong>Nodos totales:</strong> {stats.totalNodes}</div>
              <div><strong>Conexiones:</strong> {stats.totalEdges}</div>
              <div><strong>Ciudades:</strong> {stats.cities}</div>
              <div><strong>Personas:</strong> {stats.people}</div>
            </div>
          </div>
        </div>

        {/* Panel de Búsqueda e Información */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px'
        }}>
          <h2 style={{ color: '#333', marginTop: 0 }}>🔍 Búsqueda y Consultas</h2>

          {/* Buscar personas en ciudad */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>🏙️ Personas por Ciudad</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Nombre de la ciudad"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleSearchPeopleInCity}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🔍 Buscar
              </button>
            </div>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div style={{
                backgroundColor: '#e7f3ff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #b8daff'
              }}>
                <h4 style={{ color: '#0056b3', marginTop: 0 }}>
                  Resultados ({searchResults.length} personas):
                </h4>
                {searchResults.map((person, index) => (
                  <div key={index} style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    marginBottom: '5px',
                    borderRadius: '4px',
                    border: '1px solid #cce7ff'
                  }}>
                    <strong>{person.name}</strong> - {person.age} años
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lista de ciudades */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#555', fontSize: '18px' }}>🏙️ Ciudades Disponibles</h3>
            <div style={{
              maxHeight: '150px',
              overflow: 'auto',
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              {graph.getAllCities().length === 0 ? (
                <p style={{ color: '#666', margin: 0 }}>No hay ciudades registradas</p>
              ) : (
                graph.getAllCities().map((city, index) => (
                  <div key={index} style={{
                    padding: '5px 10px',
                    backgroundColor: 'white',
                    marginBottom: '3px',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    🏙️ {city.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lista de personas */}
          <div>
            <h3 style={{ color: '#555', fontSize: '18px' }}>👥 Personas Registradas</h3>
            <div style={{
              maxHeight: '200px',
              overflow: 'auto',
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              {graph.getAllPeople().length === 0 ? (
                <p style={{ color: '#666', margin: 0 }}>No hay personas registradas</p>
              ) : (
                graph.getAllPeople().map((person, index) => {
                  const city = graph.getAllCities().find(c => c.id === person.cityId);
                  return (
                    <div key={index} style={{
                      padding: '8px 10px',
                      backgroundColor: 'white',
                      marginBottom: '3px',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}>
                      <strong>👤 {person.name}</strong> ({person.age} años)
                      <br />
                      <small style={{ color: '#666' }}>
                        📍 {city ? city.name : 'Ciudad desconocida'}
                      </small>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visualización del Grafo */}
      {graphData.nodes.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px',
          marginTop: '20px'
        }}>
          <h2 style={{ color: '#333', marginTop: 0, textAlign: 'center' }}>
            🌐 Visualización del Grafo
          </h2>
          <div style={{
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <Graph
              id="graph-id"
              data={graphData}
              config={graphConfig}
            />
          </div>

          {/* Leyenda */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ color: '#333', marginTop: 0, fontSize: '16px' }}>📋 Leyenda</h4>
            <div style={{ display: 'flex', gap: '30px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff'
                }}></div>
                <span>👤 Personas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#28a745'
                }}></div>
                <span>🏙️ Ciudades</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: '#ff6b6b'
                }}></div>
                <span>🤝 Amistades</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: '#6c757d'
                }}></div>
                <span>📍 Vive en</span>
              </div>
            </div>
          </div>

          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '14px',
            marginBottom: 0,
            marginTop: '10px'
          }}>
            💡 Haz clic en los nodos para resaltarlos. Abre la consola (F12) para ver logs detallados.
          </p>
        </div>
      )}

      {/* Instrucciones iniciales */}
      {graphData.nodes.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '30px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#333' }}>🚀 ¡Comienza a crear tu grafo!</h3>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Usa los controles del panel izquierdo para agregar personas, ciudades y amistades.
            <br />
            O carga los datos de ejemplo para ver el grafo en acción.
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
              💡 Presiona F12 para ver los logs detallados del grafo en la consola
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;