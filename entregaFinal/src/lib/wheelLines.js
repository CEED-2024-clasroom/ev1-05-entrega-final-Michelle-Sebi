import { getElementCenter, lengthAndAngle } from "./game/line_position.js";

let lines=[];
let currentMobileLine = null;

//Función que elimina lineas y clase selected
function removeLines(){
  lines.forEach(line => {
      document.removeEventListener('mousemove', line.updateLineEvent);
      line.remove();
  });
  lines = [];
  currentMobileLine = null; 
  // Elimina la clase selected de todas las letras
  let letterBox = document.getElementsByClassName("wheel-letter");
  Array.from(letterBox).forEach(letter => letter.classList.remove('selected'));
}

//Funcion que añade la clase selected
function selectedClass(letter){
  letter.classList.add("selected");
}

//Funcion que crea una linea móvil que parte de una letra
function createMobileLine(letter){
  // Mostrar por consola el texto de la letra
  console.log("createMobileLine desde: " + letter.textContent);
  // Elimina todas las lineas moviles anteriores
  if (currentMobileLine) {
    currentMobileLine.remove();
  }

  const mobileLine = document.createElement('div');
  const centerLetter = getElementCenter(letter);
  
  mobileLine.classList.add('line');
  mobileLine.style.position = "absolute";
  mobileLine.style.left = `${centerLetter.x + window.scrollX}px`;
  mobileLine.style.top = `${centerLetter.y + window.scrollY}px`; 
  //añade la nueva linea y la guarda
  document.body.appendChild(mobileLine);
  lines.push(mobileLine);
  currentMobileLine = mobileLine; 
  //Actualiza el final de la linea con la posición del ratón en todo momento
  function updateLine(event) {
      const end = [event.clientX, event.clientY];
      const origin = [centerLetter.x, centerLetter.y];
      const { length, angle } = lengthAndAngle(origin, end);

      mobileLine.style.width = `${length}px`;
      mobileLine.style.transform = `rotate(${angle}deg)`;
  }
  //activa el evento de movimiento del ratón para que la linea lo siga y la elimina al soltarlo
  document.addEventListener('mousemove', updateLine);
  mobileLine.updateLineEvent = updateLine;
}

//Función que crea una linea fija entre dos letras
function createFixLine(previousLetter, newLetter) {
  // Calcula el centro de la letra anterior y la nueva
  const originCenter = getElementCenter(previousLetter);
  const newCenter = getElementCenter(newLetter);

  let fixLine = document.createElement('div');
  fixLine.classList.add('line');

  // Fija una línea entre la letra anterior y la nueva
  const { length, angle } = lengthAndAngle([originCenter.x, originCenter.y], [newCenter.x, newCenter.y]);
  fixLine.style.width = `${length}px`;
  fixLine.style.transform = `rotate(${angle}deg)`;
  fixLine.style.left = `${originCenter.x + window.scrollX}px`;
  fixLine.style.top = `${originCenter.y + window.scrollY}px`;  
  
  document.body.appendChild(fixLine);
  lines.push(fixLine);
}

export {removeLines, selectedClass, createMobileLine, createFixLine};
