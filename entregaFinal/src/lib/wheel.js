import { game } from "./board.js";
import { playWord } from "./moves.js";
import calculateLetterPositions from "./game/letter_positions.js";
import { removeLines, selectedClass, createMobileLine, createFixLine } from "./wheelLines.js";


let positions = [];
let isMousePressed = false;
let selectedWord = "" ;
let previousLetter = null;


//funcion que se activa al hacer click sobre una letra
function clickLetter(event) {
    let clickedLetter = event.target;
    if (clickedLetter) {
        isMousePressed = true;
        selectedClass(clickedLetter);
        createMobileLine(clickedLetter);
        previousLetter = clickedLetter
        selectedWord = clickedLetter.textContent;
    }
}
//función que se activa al pasar el ratón por encima de una letra
function hoverLetter(event) {
    if (isMousePressed) {
        let hoveredLetter = event.target; 
        // Solo añadimos la letra si no estaba fijada previamente
        if ( !hoveredLetter.classList.contains('selected') && hoveredLetter !== previousLetter ){   
            selectedClass(hoveredLetter);
            createFixLine(previousLetter, hoveredLetter);
            createMobileLine(hoveredLetter);
            previousLetter = hoveredLetter;
            selectedWord += hoveredLetter.textContent;
        }

    }
}
//función que se activa al soltar el ratón
function releaseMouse(){
    isMousePressed = false;
    removeLines();
    if ( selectedWord !== "" ){
        console.log("La palabra final es: " + selectedWord )
        playWord(selectedWord);
        selectedWord = ""
        previousLetter = null; 
    }
}

// Añadimos los eventos a los divs de las letras y al soltar el ratón 
function addLetterListeners(){
    let letterBox = document.getElementsByClassName("wheel-letter");
    Array.from(letterBox).forEach(letter => {
        letter.addEventListener('mousedown',clickLetter);
        letter.addEventListener('mouseover',hoverLetter);
    });
    document.addEventListener('mouseup',releaseMouse);
}

// Función que obtiene las letras del objeto game 
// y las coloca en el circulo obteniendo la posición
// con la función calculateLetterPositions
function createCircleLetters(){
    const lettersArray = game.letters.split('');
    const wheelContainer = document.getElementById('wheel');
    positions = calculateLetterPositions(lettersArray.length);

    // Creamos los divs de las letras y les añadimos las posiciones
    lettersArray.forEach((letter,index)=>{
        let position = positions[index]; 
        let wheelLetter = document.createElement('div');
        wheelLetter.classList.add("wheel-letter");
        wheelLetter.textContent = letter; 
        wheelLetter.style.position = "absolute";
        wheelLetter.style.left = position.left;
        wheelLetter.style.top = position.top;
        wheelContainer.appendChild(wheelLetter); 
    });   
    addLetterListeners();
}  

export {createCircleLetters, previousLetter};

