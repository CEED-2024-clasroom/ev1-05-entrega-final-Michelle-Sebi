
import { game, displacement } from "./board.js";
import { shuffleArray } from "./helpers.js";

function checkEndGame(){

  // Obtenemos el numero de elementos de clase letter que hay en el DOM
  let totalBoxes = document.getElementsByClassName("letter").length;

  // Obtenemos el numero de elementos de clase letter que tienen textContent distinto de ""
  let totalRevealed = Array.from(document.getElementsByClassName("letter")).filter(box => box.textContent !== "").length;

  if ( totalBoxes - totalRevealed === 0){
      console.log("🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉");
      console.log("🎉🎉🎉 ¡Has Ganado! 🎉🎉🎉");
      console.log("🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉");
  }
}

function revealLetterByGridPosition(gridPos){
  let [ despx, despy ] = displacement;
  // Sacamos x e y de la gridPos
  const [row, col] = gridPos.split('/').map(Number);
  console.log("Revelando la letra en row/col: "+row+"/"+col);
  // Obtenemos la letra en esas coordenadas
  // restamos 1 porque las coordenadas de grid empiezan en 1
  // restamos el desplazamiento para centrar
  let letter = game.letterAt(col-1-despx, row-1-despy );
  console.log("Letra: "+letter);
  //revelamos la letra escribiendola en el div
  let divLetter = document.getElementsByClassName("letter");
  Array.from(divLetter).forEach(divLetter => {
      if (divLetter.style.gridArea === gridPos){
          divLetter.textContent = letter;
      }
  });
  checkEndGame();
}

function revealRandomLetters(numLetters) {

  // Obtenemos todos los divs de la clase letter que tienen textContent = ""
  let emptyBoxes = Array.from(document.getElementsByClassName("letter")).filter(box => box.textContent === "");

  // Elegimos al azar tantas casillas como numLetters. Si no hay suficientes,
  // se revela el numero de casillas que hay.
  let maxReveal = Math.min(numLetters, emptyBoxes.length);

  // Mostramos en consola el numero de casillas que vamos a revelar
  console.log("Revelando "+maxReveal+" letras!");

  // Desordenar el array emptyBoxes
  emptyBoxes = shuffleArray(emptyBoxes);  

  // Revelamos un maximo de maxReveal letras del array emptyBoxes
  for (let i=0; i<maxReveal; i++){
      revealLetterByGridPosition(emptyBoxes[i].style.gridArea);
  }
  
}

function showWord(word,x,y,direction){
  let [ despx, despy ] = displacement;
  // Convertimos las coordenadas x e y a coordenadas del grid, añadiendo el desplazamiento
  // +1 porque las coordenadas de grid empiezan en 1
  let row = y + despy + 1 ;
  let col = x + despx + 1 ;        
  let boxes = document.getElementsByClassName("letter");
  
  word.split('').forEach(letter => {
      
    let gridPos = `${row} / ${col}`
    
    // Encontrar el box con las coordenadas calculadas y escribir la letra

    // let box = document.getElementsByClassName("letter").find(box => box.style.gridArea === gridPos && box.textContent === "");
    Array.from(boxes).forEach(box => {
      if ( box.style.gridArea === gridPos && box.textContent === "" ){   
            box.textContent = letter;
      }            
    });

    if ( direction == "horizontal"){
      col++;
    } else {
      row++;
    }
          
  });
  checkEndGame();
}

function playWord (selectedWord) {

  try {
      let wordPosition = game.findWord(selectedWord);
      const [x,y] = wordPosition.origin;
      const direction = wordPosition.direction;
  
      showWord(selectedWord,x,y,direction)

  } catch (error) {
      console.log ("Error: " + error);
  }
}

export {revealLetterByGridPosition, revealRandomLetters, showWord, playWord};