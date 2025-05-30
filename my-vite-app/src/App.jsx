import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import GraphClass from './utils/Graph';
import styles from './styles/App.module.scss';

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
      color: '#6366f1',
      size: 400,
      highlightStrokeColor: '#f59e0b',
      highlightStrokeWidth: 3,
      highlightColor: '#f59e0b',
      labelProperty: 'name',
      renderLabel: true,
      fontSize: 12,
      fontWeight: 'bold'
    },
    link: {
      highlightColor: '#f59e0b',
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
    <div className={styles.appContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          🌐 Challenge 17 - SASS + CSS Modules
        </h1>
        <p className={styles.subtitle}>
          Grafos de personas y ciudades con diseño creativo usando SASS
        </p>

        {lastOperation && (
          <div className={styles.lastOperation}>
            {lastOperation}
          </div>
        )}
      </div>

      <div className={styles.mainGrid}>

        {/* Panel de Control */}
        <div className={styles.controlPanel}>
          <h2 className={styles.panelTitle}>Panel de Control</h2>

          {/* Agregar Persona */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>👤 Agregar Persona</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Nombre completo"
                className={styles.input}
              />
              <input
                type="number"
                value={personAge}
                onChange={(e) => setPersonAge(e.target.value)}
                placeholder="Edad"
                min="0"
                max="150"
                className={styles.input}
              />
              <input
                type="text"
                value={personCity}
                onChange={(e) => setPersonCity(e.target.value)}
                placeholder="Ciudad donde vive"
                className={styles.input}
              />
              <button
                onClick={handleAddPerson}
                className={styles.button}
              >
                ➕ Agregar Persona
              </button>
            </div>
          </div>

          {/* Agregar Ciudad */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>🏙️ Agregar Ciudad</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Nombre de la ciudad"
                className={styles.input}
              />
              <button
                onClick={handleAddCity}
                className={styles.button}
              >
                ➕ Agregar Ciudad
              </button>
            </div>
          </div>

          {/* Agregar Amistad */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>🤝 Crear Amistad</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={friend1}
                onChange={(e) => setFriend1(e.target.value)}
                placeholder="Nombre de la primera persona"
                className={styles.input}
              />
              <input
                type="text"
                value={friend2}
                onChange={(e) => setFriend2(e.target.value)}
                placeholder="Nombre de la segunda persona"
                className={styles.input}
              />
              <button
                onClick={handleAddFriendship}
                className={styles.button}
              >
                🤝 Crear Amistad
              </button>
            </div>
          </div>

          {/* Controles */}
          <div className={styles.controlButtons}>
            <button
              onClick={loadExampleData}
              className={styles.exampleButton}
            >
              📝 Datos de Ejemplo
            </button>
            <button
              onClick={clearGraph}
              className={styles.clearButton}
            >
              🗑️ Limpiar Grafo
            </button>
          </div>

          {/* Estadísticas */}
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>Estadísticas del Grafo</h3>
            <ul className={styles.statsList}>
              <li className={styles.statItem}>
                <span className={styles.statLabel}>Nodos totales:</span>
                <span className={styles.statValue}>{stats.totalNodes}</span>
              </li>
              <li className={styles.statItem}>
                <span className={styles.statLabel}>Conexiones:</span>
                <span className={styles.statValue}>{stats.totalEdges}</span>
              </li>
              <li className={styles.statItem}>
                <span className={styles.statLabel}>Ciudades:</span>
                <span className={styles.statValue}>{stats.cities}</span>
              </li>
              <li className={styles.statItem}>
                <span className={styles.statLabel}>Personas:</span>
                <span className={styles.statValue}>{stats.people}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Panel de Búsqueda e Información */}
        <div className={styles.searchPanel}>
          <h2 className={styles.panelTitle}>Búsqueda y Consultas</h2>

          {/* Buscar personas en ciudad */}
          <div className={styles.searchSection}>
            <h3 className={styles.sectionTitle}>🏙️ Personas por Ciudad</h3>
            <div className={styles.searchForm}>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Nombre de la ciudad"
                className={styles.searchInput}
              />
              <button
                onClick={handleSearchPeopleInCity}
                className={styles.searchButton}
              >
                🔍 Buscar
              </button>
            </div>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                <h4 className={styles.resultsTitle}>
                  Resultados ({searchResults.length} personas):
                </h4>
                {searchResults.map((person, index) => (
                  <div key={index} className={styles.resultItem}>
                    <strong>{person.name}</strong> - {person.age} años
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lista de ciudades */}
          <div className={styles.listSection}>
            <h3 className={styles.listTitle}>🏙️ Ciudades Disponibles</h3>
            <div className={styles.scrollableList}>
              {graph.getAllCities().length === 0 ? (
                <div className={styles.emptyState}>
                  No hay ciudades registradas
                </div>
              ) : (
                graph.getAllCities().map((city, index) => (
                  <div key={index} className={styles.listItem}>
                    <div className={styles.itemName}>🏙️ {city.name}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lista de personas */}
          <div className={styles.listSection}>
            <h3 className={styles.listTitle}>👥 Personas Registradas</h3>
            <div className={styles.scrollableList}>
              {graph.getAllPeople().length === 0 ? (
                <div className={styles.emptyState}>
                  No hay personas registradas
                </div>
              ) : (
                graph.getAllPeople().map((person, index) => {
                  const city = graph.getAllCities().find(c => c.id === person.cityId);
                  return (
                    <div key={index} className={styles.listItem}>
                      <div className={styles.itemName}>👤 {person.name} ({person.age} años)</div>
                      <div className={styles.itemDetails}>
                        📍 {city ? city.name : 'Ciudad desconocida'}
                      </div>
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
        <div className={styles.graphVisualization}>
          <h2 className={styles.graphTitle}>
            Visualización del Grafo
          </h2>
          <div className={styles.graphContainer}>
            <Graph
              id="graph-id"
              data={graphData}
              config={graphConfig}
            />
          </div>

          {/* Leyenda */}
          <div className={styles.legend}>
            <h4 className={styles.legendTitle}>Leyenda</h4>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendIcon} ${styles.person}`}></div>
                <span>👤 Personas</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendIcon} ${styles.city}`}></div>
                <span>🏙️ Ciudades</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendIcon} ${styles.friendship}`}></div>
                <span>🤝 Amistades</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendIcon} ${styles.residence}`}></div>
                <span>📍 Vive en</span>
              </div>
            </div>
          </div>

          <p className={styles.graphTip}>
            Haz clic en los nodos para resaltarlos. Abre la consola (F12) para ver logs detallados.
          </p>
        </div>
      )}

      {/* Instrucciones iniciales */}
      {graphData.nodes.length === 0 && (
        <div className={styles.initialState}>
          <h3 className={styles.initialTitle}>🚀 ¡Comienza a crear tu grafo!</h3>
          <p className={styles.initialDescription}>
            Usa los controles del panel izquierdo para agregar personas, ciudades y amistades.
            <br />
            O carga los datos de ejemplo para ver el grafo en acción.
          </p>
          <div className={styles.initialTip}>
            <div className={styles.tipText}>
              Presiona F12 para ver los logs detallados del grafo en la consola
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;