// Clase para representar un nodo del árbol binario
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Clase para el árbol binario de búsqueda
class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Insertar un valor en el árbol
    insert(value) {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            console.log(`🌳 Insertado nodo raíz: ${value}`);
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    console.log(`🌿 Insertado ${value} a la izquierda de ${current.value}`);
                    break;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    console.log(`🌿 Insertado ${value} a la derecha de ${current.value}`);
                    break;
                }
                current = current.right;
            } else {
                console.log(`⚠️ El valor ${value} ya existe en el árbol`);
                break;
            }
        }
    }

    // Recorrido PreOrder (Raíz - Izquierda - Derecha)
    preOrder(node = this.root, result = []) {
        if (node !== null) {
            result.push(node.value);           // Visitar raíz
            this.preOrder(node.left, result);  // Recorrer subárbol izquierdo
            this.preOrder(node.right, result); // Recorrer subárbol derecho
        }
        return result;
    }

    // Recorrido InOrder (Izquierda - Raíz - Derecha)
    inOrder(node = this.root, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);   // Recorrer subárbol izquierdo
            result.push(node.value);           // Visitar raíz
            this.inOrder(node.right, result);  // Recorrer subárbol derecho
        }
        return result;
    }

    // Recorrido PostOrder (Izquierda - Derecha - Raíz)
    postOrder(node = this.root, result = []) {
        if (node !== null) {
            this.postOrder(node.left, result);  // Recorrer subárbol izquierdo
            this.postOrder(node.right, result); // Recorrer subárbol derecho
            result.push(node.value);            // Visitar raíz
        }
        return result;
    }

    // Buscar un valor en el árbol
    search(value, node = this.root) {
        if (node === null) {
            return false;
        }

        if (value === node.value) {
            return true;
        }

        if (value < node.value) {
            return this.search(value, node.left);
        } else {
            return this.search(value, node.right);
        }
    }

    // Buscar un valor y devolver el camino recorrido
    searchWithPath(value, node = this.root, path = []) {
        if (node === null) {
            return { found: false, path };
        }

        path.push(node.value);

        if (value === node.value) {
            return { found: true, path };
        }

        if (value < node.value) {
            return this.searchWithPath(value, node.left, path);
        } else {
            return this.searchWithPath(value, node.right, path);
        }
    }

    // Convertir el árbol a formato para react-d3-tree
    toD3Format(node = this.root) {
        if (node === null) {
            return null;
        }

        const result = {
            name: node.value.toString(),
            attributes: {
                value: node.value
            }
        };

        const children = [];

        if (node.left) {
            children.push(this.toD3Format(node.left));
        }

        if (node.right) {
            children.push(this.toD3Format(node.right));
        }

        if (children.length > 0) {
            result.children = children;
        }

        return result;
    }

    // Obtener la altura del árbol
    getHeight(node = this.root) {
        if (node === null) {
            return 0;
        }

        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Contar el número total de nodos
    getNodeCount(node = this.root) {
        if (node === null) {
            return 0;
        }

        return 1 + this.getNodeCount(node.left) + this.getNodeCount(node.right);
    }

    // Obtener todos los valores en un array (usando inOrder)
    getAllValues() {
        return this.inOrder();
    }

    // Limpiar el árbol
    clear() {
        this.root = null;
        console.log('🗑️ Árbol limpiado');
    }

    // Método para imprimir información del árbol
    printTreeInfo() {
        if (this.root === null) {
            console.log('🌳 El árbol está vacío');
            return;
        }

        console.log('\n=== 📊 INFORMACIÓN DEL ÁRBOL ===');
        console.log(`🌳 Altura: ${this.getHeight()}`);
        console.log(`📊 Número de nodos: ${this.getNodeCount()}`);
        console.log(`🔍 PreOrder (R-I-D): [${this.preOrder().join(', ')}]`);
        console.log(`🔍 InOrder (I-R-D): [${this.inOrder().join(', ')}]`);
        console.log(`🔍 PostOrder (I-D-R): [${this.postOrder().join(', ')}]`);
        console.log('================================\n');
    }
}

export default BinaryTree; 