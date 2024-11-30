import { boxData } from "./lib/board.js";
import { createCircleLetters } from "./lib/wheel.js";
import { addTools } from "./lib/tools.js";

// Inicializar el juego
// Creamos el tablero 
boxData();
// Creamos el circulo de letras
createCircleLetters();
// Añadimos las herramientas
addTools();
// Ya podemos jugar