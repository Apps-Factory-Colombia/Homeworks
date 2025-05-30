// Clase para representar una persona
class Person {
    constructor(name, age, cityId) {
        this.id = this.generateId();
        this.name = name;
        this.age = age;
        this.cityId = cityId; // ID de la ciudad donde vive
        this.type = 'person';
    }

    generateId() {
        return 'person_' + Math.random().toString(36).substr(2, 9);
    }
}

// Clase para representar una ciudad
class City {
    constructor(name) {
        this.id = this.generateId();
        this.name = name;
        this.type = 'city';
    }

    generateId() {
        return 'city_' + Math.random().toString(36).substr(2, 9);
    }
}

// Clase principal del Grafo
class Graph {
    constructor() {
        this.nodes = []; // Array de todos los nodos (personas y ciudades)
        this.adjList = {}; // Lista de adyacencia {nodeId: [connectedNodeIds]}
        this.cities = new Map(); // Mapa de ciudades por ID
        this.people = new Map(); // Mapa de personas por ID
    }

    // Agregar un nodo al grafo
    addNode(node) {
        if (node instanceof Person || node instanceof City) {
            this.nodes.push(node);
            this.adjList[node.id] = [];

            if (node.type === 'city') {
                this.cities.set(node.id, node);
                console.log(`🏙️ Ciudad agregada: "${node.name}" (ID: ${node.id})`);
            } else if (node.type === 'person') {
                this.people.set(node.id, node);
                console.log(`👤 Persona agregada: "${node.name}", ${node.age} años (ID: ${node.id})`);

                // Conectar automáticamente la persona con su ciudad
                if (node.cityId && this.cities.has(node.cityId)) {
                    this.addEdge(node.id, node.cityId);
                    console.log(`🔗 Conectada "${node.name}" con la ciudad "${this.cities.get(node.cityId).name}"`);
                }
            }
        } else {
            console.error('❌ Solo se pueden agregar objetos Person o City');
        }
    }

    // Agregar una arista entre dos nodos
    addEdge(nodeId1, nodeId2) {
        if (this.adjList[nodeId1] && this.adjList[nodeId2]) {
            // Evitar duplicados
            if (!this.adjList[nodeId1].includes(nodeId2)) {
                this.adjList[nodeId1].push(nodeId2);
            }
            if (!this.adjList[nodeId2].includes(nodeId1)) {
                this.adjList[nodeId2].push(nodeId1);
            }
        } else {
            console.error('❌ Uno o ambos nodos no existen en el grafo');
        }
    }

    // Buscar un nodo por ID
    searchNode(nodeId) {
        const found = this.nodes.find(node => node.id === nodeId);
        if (found) {
            console.log(`✅ Nodo encontrado: ${found.name} (${found.type})`);
            return found;
        } else {
            console.log(`❌ Nodo con ID "${nodeId}" no encontrado`);
            return null;
        }
    }

    // Buscar nodos por nombre
    searchNodeByName(name) {
        const found = this.nodes.filter(node =>
            node.name.toLowerCase().includes(name.toLowerCase())
        );

        if (found.length > 0) {
            console.log(`🔍 Encontrados ${found.length} nodos con "${name}":`);
            found.forEach(node => {
                console.log(`  - ${node.name} (${node.type})`);
            });
        } else {
            console.log(`❌ No se encontraron nodos con el nombre "${name}"`);
        }

        return found;
    }

    // Imprimir la lista de adyacencia de un nodo específico
    printAdjacency(nodeId) {
        const node = this.searchNode(nodeId);
        if (node && this.adjList[nodeId]) {
            console.log(`\n📋 Lista de adyacencia para "${node.name}":`);
            const connections = this.adjList[nodeId];

            if (connections.length === 0) {
                console.log('  - Sin conexiones');
            } else {
                connections.forEach(connectedId => {
                    const connectedNode = this.nodes.find(n => n.id === connectedId);
                    if (connectedNode) {
                        console.log(`  - ${connectedNode.name} (${connectedNode.type})`);
                    }
                });
            }
        }
    }

    // Imprimir todo el grafo
    printGraph() {
        if (this.nodes.length === 0) {
            console.log('📊 El grafo está vacío');
            return;
        }

        console.log('\n=== 📊 ESTRUCTURA COMPLETA DEL GRAFO ===');
        console.log(`🏙️ Ciudades: ${this.cities.size}`);
        console.log(`👥 Personas: ${this.people.size}`);
        console.log(`🔗 Total de nodos: ${this.nodes.length}`);

        console.log('\n📋 Lista de adyacencia completa:');
        this.nodes.forEach(node => {
            const connections = this.adjList[node.id] || [];
            const connectedNames = connections.map(id => {
                const connectedNode = this.nodes.find(n => n.id === id);
                return connectedNode ? `${connectedNode.name} (${connectedNode.type})` : 'Desconocido';
            });

            const nodeInfo = node.type === 'person'
                ? `${node.name} (${node.age} años, ${node.type})`
                : `${node.name} (${node.type})`;

            console.log(`  ${nodeInfo} → [${connectedNames.join(', ') || 'Sin conexiones'}]`);
        });
        console.log('=========================================\n');
    }

    // Obtener la lista de personas que viven en una ciudad específica
    getPeopleInCity(cityName) {
        // Buscar la ciudad por nombre
        const city = Array.from(this.cities.values()).find(c =>
            c.name.toLowerCase() === cityName.toLowerCase()
        );

        if (!city) {
            console.log(`❌ Ciudad "${cityName}" no encontrada`);
            return [];
        }

        // Encontrar todas las personas conectadas a esta ciudad
        const peopleInCity = [];
        const connections = this.adjList[city.id] || [];

        connections.forEach(connectedId => {
            const person = this.people.get(connectedId);
            if (person) {
                peopleInCity.push(person);
            }
        });

        // También buscar por cityId en las personas
        this.people.forEach(person => {
            if (person.cityId === city.id && !peopleInCity.find(p => p.id === person.id)) {
                peopleInCity.push(person);
            }
        });

        console.log(`\n🏙️ Personas que viven en "${cityName}":`);
        if (peopleInCity.length === 0) {
            console.log('  - No hay personas registradas en esta ciudad');
        } else {
            peopleInCity.forEach(person => {
                console.log(`  - ${person.name} (${person.age} años)`);
            });
        }

        return peopleInCity;
    }

    // Agregar una ciudad nueva
    addCity(name) {
        const city = new City(name);
        this.addNode(city);
        return city;
    }

    // Agregar una persona nueva
    addPerson(name, age, cityName) {
        // Buscar o crear la ciudad
        let city = Array.from(this.cities.values()).find(c =>
            c.name.toLowerCase() === cityName.toLowerCase()
        );

        if (!city) {
            console.log(`🏗️ Ciudad "${cityName}" no existe, creándola...`);
            city = this.addCity(cityName);
        }

        const person = new Person(name, age, city.id);
        this.addNode(person);
        return person;
    }

    // Conectar dos personas (amistad)
    addFriendship(personName1, personName2) {
        const person1 = Array.from(this.people.values()).find(p =>
            p.name.toLowerCase() === personName1.toLowerCase()
        );
        const person2 = Array.from(this.people.values()).find(p =>
            p.name.toLowerCase() === personName2.toLowerCase()
        );

        if (person1 && person2) {
            this.addEdge(person1.id, person2.id);
            console.log(`🤝 Amistad creada entre "${person1.name}" y "${person2.name}"`);
        } else {
            console.log(`❌ No se pudo crear la amistad. Personas no encontradas.`);
        }
    }

    // Obtener estadísticas del grafo
    getStats() {
        const totalNodes = this.nodes.length;
        const totalEdges = Object.values(this.adjList).reduce((sum, adj) => sum + adj.length, 0) / 2;
        const cities = this.cities.size;
        const people = this.people.size;

        return {
            totalNodes,
            totalEdges,
            cities,
            people
        };
    }

    // Convertir el grafo a formato para react-d3-graph
    toD3Format() {
        const nodes = this.nodes.map(node => ({
            id: node.id,
            name: node.name,
            type: node.type,
            age: node.age || undefined,
            symbolType: node.type === 'city' ? 'square' : 'circle',
            color: node.type === 'city' ? '#28a745' : '#007bff',
            size: node.type === 'city' ? 800 : 400,
            fontSize: 12,
            fontWeight: 'bold'
        }));

        const links = [];
        Object.keys(this.adjList).forEach(nodeId => {
            const connections = this.adjList[nodeId];
            connections.forEach(connectedId => {
                // Evitar duplicados (solo agregar si source < target alfabéticamente)
                if (nodeId < connectedId) {
                    const sourceNode = this.nodes.find(n => n.id === nodeId);
                    const targetNode = this.nodes.find(n => n.id === connectedId);

                    links.push({
                        source: nodeId,
                        target: connectedId,
                        color: sourceNode?.type === 'person' && targetNode?.type === 'person'
                            ? '#ff6b6b' // Rojo para amistades
                            : '#6c757d'  // Gris para persona-ciudad
                    });
                }
            });
        });

        return { nodes, links };
    }

    // Limpiar el grafo
    clear() {
        this.nodes = [];
        this.adjList = {};
        this.cities.clear();
        this.people.clear();
        console.log('🗑️ Grafo limpiado completamente');
    }

    // Obtener todas las ciudades
    getAllCities() {
        return Array.from(this.cities.values());
    }

    // Obtener todas las personas
    getAllPeople() {
        return Array.from(this.people.values());
    }
}

export default Graph;
export { Person, City }; 