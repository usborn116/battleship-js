let hud = document.getElementById('headsup');
const Ship = (size, name) => {
    // closure !
    let positions = [];
    for (let i = 0; i < size; i++) {
      positions.push(0);
    }
    const hit = (positionIndex) => {
      positions[positionIndex] = 1;
    }
    const isSunk = () => {
      if (positions.includes(0)) return false
      else {
        hud.textContent = `${name} Sunk!`;
        return true;
      }
    }
  
    return {
      size,
      name,
      positions,
      hit,
      isSunk
    }
  }
  
  export default Ship