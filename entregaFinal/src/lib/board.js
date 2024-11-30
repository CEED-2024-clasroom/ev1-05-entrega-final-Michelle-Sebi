import { Game } from "./game/Game.js";
import { calculateDisplacement } from "./helpers.js";


const game = new Game();

let displacement = [];
let despx, despy;

// función que crea y ubica tantos divs como 
// letras tienen la palabras y posiciones proporcionadas por 
// Game y las centra según el desplazamiento calculado 

function boxData(){ 
    const wordPositions = game.wordPositions;
    displacement = calculateDisplacement(wordPositions);
    [ despx, despy ] = displacement;
    // Se accede a los atributos de cada palabra y se guarda 
    // en variables la posición de origen, sumándole en este 

    const wordGrid = document.getElementById('grid');


    // caso el desplazamiento para centrar.
    wordPositions.forEach(word => {
        const { origin, direction, length } = word;
        
        let col = origin[0] + despx;
        let row = origin[1] + despy;
        
        //Se crea y se añade al html un div por cada letra y
        // se posiciona en el grid segun su dirección
        for (let i = 0; i < length; i++) {
            
            // gridarea transpone x e y 
            // aumentamos 1 debido a las dimensiones del grid 1..10
            let gridAreaValue = `${row+1} / ${col+1}`
            const box = document.createElement('div');

            // si en los hijos de wordGrid ya hay un elemento con el mismo 
            // valor de gridArea exists es "true"
            const exists = Array.from(wordGrid.children).some(child => {
                return child.style.gridArea === gridAreaValue;
            });

            if (!exists) {
                box.style.gridArea = gridAreaValue 
                box.classList.add("letter")
                wordGrid.appendChild(box)
            }

            if ( direction == "horizontal" ){
                col++
            } else {
                row++
            }
        }
    });
}

// Exportamos las constantes, variables y funciones
export {
    game,
    displacement,
    boxData
};

