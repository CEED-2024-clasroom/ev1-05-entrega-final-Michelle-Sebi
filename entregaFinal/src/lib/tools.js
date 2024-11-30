import { shuffleArray } from "./helpers.js";
import { revealLetterByGridPosition, revealRandomLetters } from "./moves.js";


// funcion que baraja las letras del circulo
// utilizamos la variable letterBox y el array positions calculados antes en 
// que son los divs de la clase wheel-letter y las posiciones de 
// las letras del circulo.
function shuffling(){
    console.log("Shuffling letters!")
    // Obtenemos los divs de las letras del circulo
    let letterBoxes = document.getElementsByClassName("wheel-letter");
    // Construye un array con las posiciones actuales de las letras del circulo 
    let positions = [];
    Array.from(letterBoxes).forEach((box, index) => {
        let [left, top]=[box.style.left, box.style.top];
        let position = {left, top};
        positions.push(position);
        // Muestra las posiciones (position.top y position.left) y la letra en la consola como string
        console.log("Current Position: ["+index+"] top=" + position.top + ", left=" + position.left + ", letter=" + box.textContent);
    });

    // Desordenar el array positions hasta que no coincida con el original
    let shuffledPositions = shuffleArray(positions);

    // Actualizar las posiciones en el DOM
    Array.from(letterBoxes).forEach((box, index) => {
        let newPosition = shuffledPositions[index];
        // Muestra las nuevas posiciones (position.top y position.left) y la letra en la consola como string
        console.log("New Position: ["+index+"] " + newPosition.top + ", left=" + newPosition.left + ", letter=" + box.textContent);
        // Actualizar la posición en el DOM
        box.style.top = newPosition.top;
        box.style.left = newPosition.left;
    });
}

//funcion que muestra una letra al hacer click en el boton de la bombilla
function lightbulb(){
    console.log("💡 Revelando una letra!")
    revealRandomLetters(1);   
}

//funcion que revela 5 letras aleatorias del tablero
function diana(){
    console.log("🎯 Revelando 5 letras!")
    revealRandomLetters(5); 
}

function hammerLetter(event){
    let letter = event.target;
    let gridPos = letter.style.gridArea;
    // si la letra no tiene contenido, se revela
    if (letter.textContent === ""){
        console.log("🔨 Revelando la letra seleccionada!")
        revealLetterByGridPosition(gridPos);

        // Duplicado codigo de endHammer para evitar llamada a una 
        // funcion que todavia no esta declarada
        
        let divBlack = document.getElementById("black");
        divBlack.classList.add("hidden");
    
        let divLetters = document.getElementsByClassName("letter");
    
        Array.from(divLetters).forEach(divLetter => {
            divLetter.classList.remove("on-top");
            // eliminamos todos los eventos de los divs de las letras
            divLetter.removeEventListener('click', hammerLetter);
        });
    } 
}

function endHammer(){
    
    let divBlack = document.getElementById("black");
    divBlack.classList.add("hidden");

    let divLetters = document.getElementsByClassName("letter");

    Array.from(divLetters).forEach(divLetter => {
        divLetter.classList.remove("on-top");
        // eliminamos todos los eventos de los divs de las letras
        divLetter.removeEventListener('click', hammerLetter);
    });
}



function hammer(){
    console.log("🔨 Martillo activado!")
    // Ponemos el tablero a negro
    let divBlack = document.getElementById("black");
    divBlack.classList.remove("hidden");
    // Ponemos las letras encima del tablero
    let divLetters = document.getElementsByClassName("letter");

    // Añadimos la clase on-top y el evento hammerLetter a las letras
    Array.from(divLetters).forEach(divLetter => {
        divLetter.classList.add("on-top");
        // le añadimos también el evento hammerLetter
        divLetter.addEventListener('click', hammerLetter);
    });

    divBlack.addEventListener('click', endHammer);
}

// Añadir los eventos a los botones de las herramientas
function addTools(){
    // Añadir el evento shuffling al botón de mezclar
    let shuffle = document.getElementById('fa-shuffle');
    shuffle.addEventListener('click',shuffling);
    // Añadir el evento lightbulb al botón de bombilla
    let light = document.getElementById('fa-lightbulb');
    light.addEventListener('click',lightbulb);  
    // Añadir el evento diana al botón de diana
    let dianaHelp = document.getElementById("fa-expand");
    dianaHelp.addEventListener('click', diana);
    // Añadir el evento hammer al botón de martillo
    let hammerToolIcon = document.getElementById('fa-hammer');
    hammerToolIcon.addEventListener('click', hammer);
}

export { addTools }
