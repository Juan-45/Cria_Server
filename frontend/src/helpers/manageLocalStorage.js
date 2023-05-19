import { deflate, inflate } from "pako";

//manejar errores
//capturar excepciones de setItem, puede lanzar una excepción si el almacén esta lleno

// Comprimir los datos
const compressedData = deflate(data, { to: "string" });

// Descomprimir los datos
const decompressedData = inflate(compressedData, { to: "string" });

/*


const test = { my: 'super', puper: [456, 567], awesome: 'pako' };

const compressed = pako.deflate(JSON.stringify(test));

const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));

*/

/*

// Inflate (simple wrapper can throw exception on broken stream)
//
const compressed = new Uint8Array();
//... fill data to uncompress here
try {
  const result = pako.inflate(compressed);
  // ... continue processing
} catch (err) {
  console.log(err);
}

*/

/*
localStorage.setItem('miGato', 'Juan');

La sintaxis para leer el ítem almacenado en localStorage es la siguiente:
var cat = localStorage.getItem('miGato');

La sintaxis para eliminar el ítem almacenado en localStorage es la siguiente:
localStorage.removeItem('miGato');

La sintaxis para eliminar todos los ítems almacenados en localStorage es la siguiente:
// Elimina todos los elementos
localStorage.clear();
*/
