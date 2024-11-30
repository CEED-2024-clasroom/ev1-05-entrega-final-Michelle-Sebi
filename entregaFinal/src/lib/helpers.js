import center from "./game/center.js";



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


//funcion que calcula el desplazamiento necesario para centrar 
//los divs de las palabras de esta partida.
function calculateDisplacement(wordPositions){

    const gridHeight = 10;
    const gridWidth = 10;
    let maxColumn = 0;
    let maxRow = 0;
    
    //recorre cada palabra del array que genera wordPosition
    //accede a sus atributos
    wordPositions.forEach(word => {
        const { origin, direction, length } = word;      
        
        //guarda en variables la posición de origen
        let col = origin[0] // x
        let row = origin[1] // y
        
        //las incrementa segun sea vertica u horizontal
        if ( direction == "horizontal" ) {
            col += length -1 
        }   
        else { 
            row += length -1
        }
        //guarda en variables las posiciones máximas
        if(col > maxColumn){
            maxColumn = col;
        }
        if(row > maxRow){
            maxRow = row;
        }
    });
    
    //pasa estas posiciones a la función center 
    //que calcula el desplazamiento en un grid de 10x10 y devuelve un array
    let [despx,despy]= center(maxColumn, maxRow, gridHeight, gridWidth)
    
    return [ despx, despy ]
}; 

export { shuffleArray, calculateDisplacement};