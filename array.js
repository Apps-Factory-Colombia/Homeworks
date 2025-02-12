// Uso de todas las funciones de arreglos en JavaScript

const numeros = [1, 2, 3, 4, 5];
const palabras = ["manzana", "banana", "cereza"];

// at() - Obtener un elemento por índice
const tercerElemento = numeros.at(2);

// concat() - Unir dos arreglos
const combinados = numeros.concat(palabras);

// copyWithin() - Copiar una parte del arreglo dentro del mismo
const copiaDentro = [...numeros];
copiaDentro.copyWithin(1, 3, 5);

// entries() - Obtener iterador de pares clave-valor
const iteradorEntradas = numeros.entries();

// every() - Verificar si todos los elementos cumplen una condición
const todosPositivos = numeros.every(num => num > 0);

// fill() - Llenar un arreglo con un valor
const arregloLleno = new Array(5).fill(0);

// filter() - Filtrar elementos según una condición
const numerosPares = numeros.filter(num => num % 2 === 0);

// find() - Encontrar un elemento en el arreglo
const encontrado = numeros.find(num => num > 3);

// findIndex() - Encontrar el índice de un elemento
const indice = numeros.findIndex(num => num > 3);

// findLast() - Encontrar el último elemento que cumple la condición
const ultimoEncontrado = numeros.findLast(num => num > 2);

// findLastIndex() - Índice del último elemento que cumple la condición
const ultimoIndice = numeros.findLastIndex(num => num > 2);

// flat() - Aplanar un arreglo de arreglos
const arregloAnidado = [[1, 2], [3, 4], [5, [6, 7]]];
const arregloPlano = arregloAnidado.flat(2);

// flatMap() - Aplicar función y aplanar el resultado
const duplicados = numeros.flatMap(num => [num, num * 2]);

// forEach() - Iterar sobre el arreglo
numeros.forEach(num => console.log(num));

// includes() - Verificar si un elemento está en el arreglo
const tieneCinco = numeros.includes(5);

// indexOf() - Encontrar el índice de un elemento
const indiceDeCuatro = numeros.indexOf(4);

// join() - Convertir arreglo en cadena de texto
const unido = palabras.join(" - ");

// keys() - Obtener iterador de claves
const iteradorClaves = numeros.keys();

// lastIndexOf() - Última aparición de un elemento
const ultimoIndiceDeDos = numeros.lastIndexOf(2);

// map() - Transformar cada elemento del arreglo
const cuadrados = numeros.map(num => num * num);

// pop() - Eliminar el último elemento
numeros.pop();

// push() - Agregar elementos al final
numeros.push(6);

// reduce() - Reducir el arreglo a un solo valor
const suma = numeros.reduce((acc, num) => acc + num, 0);

// reduceRight() - Reducir de derecha a izquierda
const resta = numeros.reduceRight((acc, num) => acc - num, 0);

// reverse() - Invertir el orden de un arreglo
const numerosInvertidos = numeros.reverse();

// shift() - Eliminar el primer elemento
numeros.shift();

// slice() - Extraer una parte del arreglo
const extraido = numeros.slice(1, 3);

// some() - Verificar si al menos un elemento cumple una condición
const tieneNegativo = numeros.some(num => num < 0);

// sort() - Ordenar un arreglo
const palabrasOrdenadas = palabras.sort();

// splice() - Modificar el arreglo (agregar o eliminar elementos)
numeros.splice(2, 1, 99);

// toLocaleString() - Convertir arreglo a cadena local
const cadenaLocal = numeros.toLocaleString();

// toString() - Convertir arreglo a cadena
const cadena = numeros.toString();

// unshift() - Agregar elementos al inicio
numeros.unshift(0);

// values() - Obtener iterador de valores
const iteradorValores = numeros.values();

// Mostrar resultados en consola
console.log({
    tercerElemento, combinados, copiaDentro, todosPositivos, arregloLleno, numerosPares,
    encontrado, indice, ultimoEncontrado, ultimoIndice, arregloPlano, duplicados,
    tieneCinco, indiceDeCuatro, unido, ultimoIndiceDeDos, cuadrados, suma, resta,
    numerosInvertidos, extraido, tieneNegativo, palabrasOrdenadas, cadenaLocal, cadena
});
