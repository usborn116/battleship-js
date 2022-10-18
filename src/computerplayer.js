const ComputerPlayer = (name, gameboard, shipList) => {

    const findAttackableSquareCoordinates = (player) => {
      const attackableSquareCoordinates = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (player.gameboard.grid[i][j].isHit === null) attackableSquareCoordinates.push([i, j]);
        }
      }
      return attackableSquareCoordinates;
    }
  
    const chooseRandomElement = (array) => {
      const randIndex = Math.floor(Math.random() * array.length);
      return array[randIndex];
    }
  
    const attack = (player, coordinates) => {
      player.gameboard.receiveAttack(coordinates, player.shipList);
    } 
  
    const attackRandom = (player) => {
      const attackableSquareCoordinates = findAttackableSquareCoordinates(player);
      const randSquareCoordinates = chooseRandomElement(attackableSquareCoordinates);
      player.gameboard.receiveAttack(randSquareCoordinates, player.shipList);
      return randSquareCoordinates;
    }
  
    const seekValidAdjacentSquares = (coordinates, gameboard) => {
      let y = coordinates[0];
      let x = coordinates[1];
      const validAdjacentSquares = [];
      if ( y + 1 < 10) {
        if (gameboard.grid[y + 1][x].isHit === null) validAdjacentSquares.push([y + 1, x]);
      }
      if ( y - 1 > -1) {
        if (gameboard.grid[y - 1][x].isHit === null) validAdjacentSquares.push([y - 1, x]);
      }
      if ( x + 1 < 10) {
        if (gameboard.grid[y][x + 1].isHit === null) validAdjacentSquares.push([y, x + 1]);
      }
      if ( x - 1 > -1) {
        if (gameboard.grid[y][x - 1].isHit === null) validAdjacentSquares.push([y, x - 1]);
      }
  
      return validAdjacentSquares
    }
  
    // const attack
  
    return {
      name,
      gameboard,
      shipList,
      attack,
      attackRandom,
      seekValidAdjacentSquares
    }
  }
  
  export default ComputerPlayer