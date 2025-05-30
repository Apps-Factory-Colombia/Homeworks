// Clase para representar un nodo del árbol N-ario (menú)
class MenuNode {
    constructor(title, link = '#', component = null, icon = null) {
        this.title = title;
        this.link = link;
        this.component = component;
        this.icon = icon;
        this.children = []; // Array de hijos (submenús)
        this.parent = null;
        this.isExpanded = false; // Para controlar si el menú está expandido
        this.id = this.generateId();
    }

    // Generar un ID único para cada nodo
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Agregar un hijo a este nodo
    addChild(child) {
        if (child instanceof MenuNode) {
            child.parent = this;
            this.children.push(child);
            console.log(`📁 Agregado submenú "${child.title}" a "${this.title}"`);
        } else {
            console.error('❌ Solo se pueden agregar nodos MenuNode como hijos');
        }
    }

    // Remover un hijo
    removeChild(child) {
        const index = this.children.findIndex(c => c.id === child.id);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.parent = null;
            console.log(`🗑️ Removido submenú "${child.title}" de "${this.title}"`);
        }
    }

    // Verificar si tiene hijos
    hasChildren() {
        return this.children.length > 0;
    }

    // Obtener la profundidad del nodo
    getDepth() {
        let depth = 0;
        let current = this.parent;
        while (current) {
            depth++;
            current = current.parent;
        }
        return depth;
    }

    // Alternar el estado expandido
    toggleExpanded() {
        this.isExpanded = !this.isExpanded;
        console.log(`${this.isExpanded ? '📂' : '📁'} ${this.title} ${this.isExpanded ? 'expandido' : 'colapsado'}`);
    }

    // Expandir todos los hijos recursivamente
    expandAll() {
        this.isExpanded = true;
        this.children.forEach(child => child.expandAll());
    }

    // Colapsar todos los hijos recursivamente
    collapseAll() {
        this.isExpanded = false;
        this.children.forEach(child => child.collapseAll());
    }
}

// Clase para el árbol N-ario de menús
class NaryTree {
    constructor() {
        this.root = null;
        this.allNodes = new Map(); // Mapa de ID -> nodo para búsqueda rápida
    }

    // Crear el nodo raíz
    setRoot(title, link = '#', component = null, icon = '🏠') {
        this.root = new MenuNode(title, link, component, icon);
        this.allNodes.set(this.root.id, this.root);
        console.log(`🌳 Creado nodo raíz: "${title}"`);
        return this.root;
    }

    // Agregar un nodo hijo a un nodo específico
    addNode(parentNode, title, link = '#', component = null, icon = '📄') {
        if (!parentNode) {
            console.error('❌ El nodo padre no puede ser null');
            return null;
        }

        const newNode = new MenuNode(title, link, component, icon);
        parentNode.addChild(newNode);
        this.allNodes.set(newNode.id, newNode);
        return newNode;
    }

    // Buscar un nodo por título
    findNodeByTitle(title) {
        for (const [id, node] of this.allNodes) {
            if (node.title.toLowerCase() === title.toLowerCase()) {
                return node;
            }
        }
        return null;
    }

    // Buscar un nodo por ID
    findNodeById(id) {
        return this.allNodes.get(id) || null;
    }

    // Obtener todos los nodos en un array plano
    getAllNodes() {
        return Array.from(this.allNodes.values());
    }

    // Recorrido en profundidad (DFS) del árbol
    traverseDepthFirst(node = this.root, callback = null, result = []) {
        if (!node) return result;

        // Ejecutar callback si se proporciona
        if (callback && typeof callback === 'function') {
            callback(node);
        }

        result.push({
            id: node.id,
            title: node.title,
            link: node.link,
            component: node.component,
            icon: node.icon,
            depth: node.getDepth(),
            hasChildren: node.hasChildren(),
            isExpanded: node.isExpanded
        });

        // Recorrer todos los hijos
        node.children.forEach(child => {
            this.traverseDepthFirst(child, callback, result);
        });

        return result;
    }

    // Recorrido por niveles (BFS) del árbol
    traverseBreadthFirst(callback = null) {
        if (!this.root) return [];

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const current = queue.shift();

            // Ejecutar callback si se proporciona
            if (callback && typeof callback === 'function') {
                callback(current);
            }

            result.push({
                id: current.id,
                title: current.title,
                link: current.link,
                component: current.component,
                icon: current.icon,
                depth: current.getDepth(),
                hasChildren: current.hasChildren(),
                isExpanded: current.isExpanded
            });

            // Agregar todos los hijos a la cola
            current.children.forEach(child => queue.push(child));
        }

        return result;
    }

    // Obtener solo los nodos visibles (considerando el estado expandido)
    getVisibleNodes(node = this.root, result = []) {
        if (!node) return result;

        result.push({
            id: node.id,
            title: node.title,
            link: node.link,
            component: node.component,
            icon: node.icon,
            depth: node.getDepth(),
            hasChildren: node.hasChildren(),
            isExpanded: node.isExpanded
        });

        // Solo mostrar hijos si el nodo está expandido
        if (node.isExpanded) {
            node.children.forEach(child => {
                this.getVisibleNodes(child, result);
            });
        }

        return result;
    }

    // Expandir un camino específico hacia un nodo
    expandPathToNode(targetNode) {
        let current = targetNode;
        while (current.parent) {
            current.parent.isExpanded = true;
            current = current.parent;
        }
        console.log(`🛤️ Expandido camino hacia "${targetNode.title}"`);
    }

    // Obtener el camino desde la raíz hasta un nodo
    getPathToNode(targetNode) {
        const path = [];
        let current = targetNode;

        while (current) {
            path.unshift(current.title);
            current = current.parent;
        }

        return path;
    }

    // Contar total de nodos
    getTotalNodeCount() {
        return this.allNodes.size;
    }

    // Obtener la altura máxima del árbol
    getMaxDepth(node = this.root) {
        if (!node || node.children.length === 0) {
            return node ? 1 : 0;
        }

        let maxChildDepth = 0;
        node.children.forEach(child => {
            const childDepth = this.getMaxDepth(child);
            maxChildDepth = Math.max(maxChildDepth, childDepth);
        });

        return maxChildDepth + 1;
    }

    // Imprimir información del árbol
    printTreeInfo() {
        if (!this.root) {
            console.log('🌳 El árbol de menús está vacío');
            return;
        }

        console.log('\n=== 📊 INFORMACIÓN DEL ÁRBOL DE MENÚS ===');
        console.log(`🌳 Nodo raíz: "${this.root.title}"`);
        console.log(`📊 Total de nodos: ${this.getTotalNodeCount()}`);
        console.log(`📏 Altura máxima: ${this.getMaxDepth()}`);
        console.log(`\n🔍 Estructura del árbol (DFS):`);

        this.traverseDepthFirst(this.root, (node) => {
            const indent = '  '.repeat(node.getDepth());
            const expandIcon = node.hasChildren() ? (node.isExpanded ? '📂' : '📁') : '📄';
            console.log(`${indent}${expandIcon} ${node.title} (${node.link})`);
        });

        console.log('==========================================\n');
    }

    // Limpiar el árbol
    clear() {
        this.root = null;
        this.allNodes.clear();
        console.log('🗑️ Árbol de menús limpiado');
    }
}

export default NaryTree;
export { MenuNode }; 