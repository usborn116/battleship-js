import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import ComputerPlayer from "./computerplayer.js";
import './style.css';
let hud = document.getElementById('headsup');

const carrier1 = Ship(5, 'carrier');
const battleship1 = Ship(4, 'battleship');
const destroyer1 = Ship(3, 'destroyer');
const submarine1 = Ship(3, 'submarine');
const patrol1 = Ship(2, 'patrol');

const carrier2 = Ship(5, 'Carrier');
const battleship2 = Ship(4, 'Battleship');
const destroyer2 = Ship(3, 'Destroyer');
const submarine2 = Ship(3, 'Submarine');
const patrol2 = Ship(2, 'Patrol');

const shipList1 = [carrier1, battleship1, destroyer1, submarine1, patrol1];
const shipList2 = [carrier2, battleship2, destroyer2, submarine2, patrol2];

const gameboard1 = Gameboard();
const gameboard2 = Gameboard();

const player1 = Player('Player 1', gameboard1, shipList1);
const player2 = ComputerPlayer('Player 2', gameboard2, shipList2);

let cursorDirection = 'x';

// DOM stuff

const computerSquares = document.querySelectorAll('.computer-square');
const playerRotateBtn = document.getElementById('player-rotate-btn');

playerRotateBtn.addEventListener('click', () => {
  if (cursorDirection === 'x') {
    cursorDirection = 'y';
  } else {
    cursorDirection = 'x';
  }
})

const isCloseToEdge = (shipLength, index) => {
  if (cursorDirection === 'x') {
    let horizontalIndex;
    if (index < 10) {
      horizontalIndex = index;
    } else {
      horizontalIndex = parseInt(index.toString().slice(1));
    }
    if (horizontalIndex + shipLength > 10) return true;
      else return false;
  } else {
    let verticalIndex;
    if (index < 10) {
      verticalIndex = 0;
    } else {
      verticalIndex = parseInt(index.toString().slice(0,1));
    }
    if (verticalIndex + shipLength > 10) return true;
      else return false;
  }
}

const distanceToEdge = (index) => {
  if (cursorDirection === 'x') {
    let horizontalIndex;
    if (index < 10) {
      horizontalIndex = index;
    } else {
      horizontalIndex = parseInt(index.toString().slice(1));
    }
    return 9 - horizontalIndex;
  } else {
    let verticalIndex;
    if (index < 10) {
      verticalIndex = 0;
    } else {
      verticalIndex = parseInt(index.toString().slice(0,1));
    }
    return 9 - verticalIndex;
  }
}

const placePlayerShips = (turn) => {
  const playerSquares = document.querySelectorAll('.player-square');

  let ship;

  if (turn === 1) {
    ship = patrol1;
  }
  if (turn === 2) {
    ship = submarine1;
  }
  if (turn === 3) {
    ship = destroyer1;
  }
  if (turn === 4) {
    ship = battleship1;
  }
  if (turn === 5) {
    ship = carrier1;
  }

  const addEventListeners = () => {
    let validAdjacentSquares = [];

    computerSquares.forEach((square) => {
      square.addEventListener('click', (e) => {
        const squareNumber = e.target.id.slice(16);
        const stringCoordinates = squareNumber.split('');
        const numCoordinates = stringCoordinates.map((el) => parseInt(el));
        if(player2.gameboard.grid[numCoordinates[0]][numCoordinates[1]].isHit === true || 
            player2.gameboard.grid[numCoordinates[0]][numCoordinates[1]].isHit === false) return;
        player1.attack(player2, numCoordinates);
        player2.gameboard.logAttack(numCoordinates);
        if (player2.gameboard.checkHit(numCoordinates)) {
          const ship = shipList2.find((ship) => ship.name === player2.gameboard.grid[numCoordinates[0]][numCoordinates[1]].ship);
          ship.isSunk();
        }
        gameboard2.renderGameboard(true);
    
        if (player2.gameboard.isGameOver() === true) {
        hud.textContent = 'Game Over! Player 1 Wins!';
        setTimeout(() => {hud.textContent = 'New Game!'}, 3000);
        setTimeout(() => {
            let green = document.querySelectorAll('.green')
            green.forEach(g => {
                g.classList.remove('green')
            });
            let red = document.querySelectorAll('.red')
            red.forEach(r => {
                r.classList.remove('red')
            });
            let white = document.querySelectorAll('.white')
            white.forEach(w => {
                w.classList.remove('white')
            });
            placePlayerShips(1);
            initComputerBoard();
            }, 2000);
        } else {
          if (validAdjacentSquares.length === 0) {
            const attackedCoordinates = player2.attackRandom(player1);
            if (player1.gameboard.grid[attackedCoordinates[0]][attackedCoordinates[1]].isHit === true) {
              validAdjacentSquares = (player2.seekValidAdjacentSquares(attackedCoordinates, player1.gameboard));
            }
          } else {
            player2.attack(player1, validAdjacentSquares[0]);
            if (player1.gameboard.grid[validAdjacentSquares[0][0]][validAdjacentSquares[0][1]].isHit === false) {
              validAdjacentSquares.shift();
            } else {
              const newValidAdjacentSquares = player2.seekValidAdjacentSquares(validAdjacentSquares[0], player1.gameboard);
              newValidAdjacentSquares.forEach((square) => {
                if (!(JSON.stringify(validAdjacentSquares).includes(JSON.stringify(square)))) validAdjacentSquares.push(square);
              })
              validAdjacentSquares.shift();
            }
          }
          gameboard1.renderGameboard(false);
            if (player1.gameboard.isGameOver() === true) {
              hud.textContent = 'Game Over! Player 2 Wins!';
              setTimeout(() => {hud.textContent = 'New Game!'}, 3000)
              setTimeout(() => {
                  let green = document.querySelectorAll('.green')
                  green.forEach(g => {
                      g.classList.remove('green')
                  });
                  let red = document.querySelectorAll('.red')
                  red.forEach(r => {
                      r.classList.remove('red')
                  });
                  let white = document.querySelectorAll('.white')
                  white.forEach(w => {
                    w.classList.remove('white')
                  });
                  placePlayerShips(1);
                  initComputerBoard();
                  }, 2000);
            }
        }
      })
    })
  }

  hud.textContent = `Place your ${ship.name}`;
  let shipLength = ship.size;
  
  playerSquares.forEach((square, index) => {
    square.addEventListener('mouseover', () => {
      if(!(isCloseToEdge(shipLength, index))) {
        if (cursorDirection === 'x') {
          for (let i = 0; i < shipLength; i++) {         
            playerSquares[index + i].classList.add('shadow');
          }
        } else {
          for (let i = 0; i < shipLength; i++) {
            playerSquares[index + (i * 10)].classList.add('shadow');
          }
        }
      } else {
        // Edge case
        if (cursorDirection === 'x') {
          for (let i = 0; i < distanceToEdge(index) + 1; i++) {         
            playerSquares[index + i].classList.add('shadow');
          }
          for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
            playerSquares[index - j].classList.add('shadow');
          }
        } else {
          for (let i = 0; i < distanceToEdge(index) + 1; i++) {
            playerSquares[index + (i * 10)].classList.add('shadow');
          }
          for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
            playerSquares[index - (j * 10)].classList.add('shadow');
          }
        }
      } 
    });
  })

  playerSquares.forEach((square, index) => {
    square.addEventListener('mouseout', () => {
      if(!(isCloseToEdge(shipLength, index))) {
        if (cursorDirection === 'x') {
          for (let i = 0; i < shipLength; i++) {         
            playerSquares[index + i].classList.remove('shadow');
          }
        } else {
          for (let i = 0; i < shipLength; i++) {
            playerSquares[index + (i * 10)].classList.remove('shadow');
          }
        }
      } else {
        // Edge case
        if (cursorDirection === 'x') {
          for (let i = 0; i < distanceToEdge(index) + 1; i++) {         
            playerSquares[index + i].classList.remove('shadow');
          }
          for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
            playerSquares[index - j].classList.remove('shadow');
          }
        } else {
          for (let i = 0; i < distanceToEdge(index) + 1; i++) {
            playerSquares[index + (i * 10)].classList.remove('shadow');
          }
          for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
            playerSquares[index - (j * 10)].classList.remove('shadow');
          }
        }
      } 
    });
  })

  playerSquares.forEach((square, index) => {
    square.addEventListener('click', (e) => {
      const squareNumber = e.target.id.slice(7);
      const stringCoordinates = squareNumber.split('');
      const numCoordinates = stringCoordinates.map((el) => parseInt(el));
      
      if (gameboard1.isValidPlacement(ship, numCoordinates, cursorDirection)) {
        gameboard1.place(ship, numCoordinates, cursorDirection);
        gameboard1.renderGameboard();
        turn++
        removeEventListeners(playerSquares);
        if (turn === 6) {
          addEventListeners();
          hud.textContent = 'Placement phase over. Take the first shot.';
          return;
        }; 
        placePlayerShips(turn);
      }
    });

    square.addEventListener('mouseover', (e) => {      //must be mouseover !!!
      const squareNumber = e.target.id.slice(7);
      const stringCoordinates = squareNumber.split('');
      const numCoordinates = stringCoordinates.map((el) => parseInt(el));

      if(!(isCloseToEdge(shipLength, index))) {
        if (cursorDirection === 'x') {
          if (gameboard1.isValidPlacement(ship, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < shipLength; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + i}`)
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + i}`)
              }
              squareElement.style.background = 'grey';
            }
          }
        } else {
          if (gameboard1.isValidPlacement(ship, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < shipLength; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                if (i === 0) {
                  squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + (i * 10)}`)
                } else {
                  squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
                }
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
              }
              squareElement.style.background = 'grey';
            }
          }
        }
      } else {
        // edge case
        if (cursorDirection === 'x') {
          if (gameboard1.isValidPlacement(ship, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < distanceToEdge(index) + 1; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + i}`)
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + i}`)
              }
              squareElement.style.background = 'grey';
            }
            for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                squareElement = document.querySelector(`#square-0${parseInt(squareNumber) - j}`)
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) - j}`)
              }
              squareElement.style.background = 'grey';
            }
          }
        } else {
          if (gameboard1.isValidPlacement(ship, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < distanceToEdge(index) + 1; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                if (i === 0) {
                  squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + (i * 10)}`)
                } else {
                  squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
                }
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
              }
              squareElement.style.background = 'grey';
            }
            for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                if (j === 0) {
                  squareElement = document.querySelector(`#square-0${parseInt(squareNumber) - (j * 10)}`)
                } else {
                  squareElement = document.querySelector(`#square-${parseInt(squareNumber) - (j * 10)}`)
                }
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) - (j * 10)}`)
              }
              squareElement.style.background = 'grey';
            }
          }
        }
      }
    });

    square.addEventListener('mouseout', (e) => {
      const squareNumber = e.target.id.slice(7);
      const stringCoordinates = squareNumber.split('');
      const numCoordinates = stringCoordinates.map((el) => parseInt(el));

      if(!(isCloseToEdge(shipLength, index))) {
        if (cursorDirection === 'x') {
          if (gameboard1.isValidPlacement(carrier1, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < shipLength; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + i}`)
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + i}`)
              }
              squareElement.style.background = '';
            }
          }
        } else {
          if (gameboard1.isValidPlacement(carrier1, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < shipLength; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                if (i === 0) {
                  squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + (i * 10)}`)
                } else {
                  squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
                }
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
              }
              squareElement.style.background = '';
            }
          }
        }
      } else {
        // edge case
        if (cursorDirection === 'x') {
          if (gameboard1.isValidPlacement(carrier1, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < distanceToEdge(index) + 1; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + i}`)
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + i}`)
              }
              squareElement.style.background = '';
            }
            for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                squareElement = document.querySelector(`#square-0${parseInt(squareNumber) - j}`)
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) - j}`)
              }
              squareElement.style.background = '';
            }
          }
        } else {
          if (gameboard1.isValidPlacement(carrier1, numCoordinates, cursorDirection) === false) {
            for (let i = 0; i < distanceToEdge(index) + 1; i++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                if (i === 0) {
                  squareElement = document.querySelector(`#square-0${parseInt(squareNumber) + (i * 10)}`)
                } else {
                  squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
                }
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) + (i * 10)}`)
              }
              squareElement.style.background = '';
            }
            for (let j = 0; j <= shipLength - (distanceToEdge(index) + 1); j++) {
              let squareElement;
              if (parseInt(squareNumber) < 10) {
                if (j === 0) {
                  squareElement = document.querySelector(`#square-0${parseInt(squareNumber) - (j * 10)}`)
                } else {
                  squareElement = document.querySelector(`#square-${parseInt(squareNumber) - (j * 10)}`)
                }
              } else {
                squareElement = document.querySelector(`#square-${parseInt(squareNumber) - (j * 10)}`)
              }
              squareElement.style.background = '';
            }
          }
        }
      }
    });
  })
}

const removeEventListeners = (playerSquares) => {
  playerSquares.forEach((oldSquare) => {
    const newSquare = oldSquare.cloneNode(true);
    oldSquare.parentNode.replaceChild(newSquare, oldSquare);
  })
}

const initComputerBoard = () => {
  const chooseRandomElement = (array) => {
    const randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
  }

  shipList2.forEach((ship) => {
    let shipIsPlaced = false;
    const emptySpaces = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (gameboard2.grid[i][j].ship === null) emptySpaces.push([i,j]);
      }
    }
    let randomDirection;
    if (Math.floor(Math.random() * 2) === 0) randomDirection = 'x'
    else randomDirection = 'y';
    let randomSpace = chooseRandomElement(emptySpaces);

    
    while(shipIsPlaced === false) {
      if (gameboard2.isValidPlacement(ship, randomSpace, randomDirection)) {
        gameboard2.place(ship, randomSpace, randomDirection);
        shipIsPlaced = true;
      } else {
        randomSpace = chooseRandomElement(emptySpaces);
        if (Math.floor(Math.random() * 2) === 0) randomDirection = 'x'
        else randomDirection = 'y';
      }
    }
  })
}


placePlayerShips(1)
initComputerBoard()