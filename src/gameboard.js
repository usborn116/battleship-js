import {createShip} from './ship.js'

export const createGameboard = () => {
  let grid = buildGrid()
  let ships = []
  let attacks = []

  // returns array of length 10 with items being arrays of length 10
  function buildGrid() {
    let grid = []
    for (let i = 0; i < 10; i++) {
      let innerGrid = []
      for (let i = 0; i < 10; i++) {
        innerGrid.push('')
      }
      grid.push(innerGrid)
    }
    return grid
  }
  
  const placeShip = (shipLength, coords, horizontal) => {
    let ship = createShip(shipLength)
    let x = coords[0].charCodeAt(0)-65
    let y;
    if (coords.length > 2){
        y = coords.slice(-2)-1
    } else {
        y = coords[1]-1
    };
    let stringified = JSON.stringify(coords)

    if(allCoords().some(coord => JSON.stringify(coord) === stringified)) { return 'already exist'}

    // if out of bounds, return false
    const oOB = () => {
      let statement = false
      if (x > 9 || y > 9) {
        statement = true
      } else if (horizontal && (y + shipLength) > 10) {
        statement = true
      } else if (!horizontal && (x + shipLength) > 10) {
        statement = true
      }
      return statement
    }

    if (oOB()) {
      return false
    }

    if (horizontal === false) {
      for (let i = 0; i < ship.length; i++) {
        ship.coords.push([x, y+i])
        grid[x][y + i] = 'x'
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        ship.coords.push([x+i,y])
        grid[x + i][y] = 'x'
      }
    }
    ships.push(ship)
    return ships.length + ships;
  }

  const receiveAttack = (sqr) => {
     
    let hitShip = false;
    // Technique used to emulate attacks.includes(array)
    
    let x = sqr[0].charCodeAt(0)-65
    let y;
    if (sqr.length > 2){
        y = sqr.slice(-2)-1
    } else {
        y = sqr[1]-1
    };
    let a = JSON.stringify(attacks)
    let b = JSON.stringify([x,y])
    if (a.includes(b)) { return false }
    attacks.push([x,y])

    ships.forEach((ship) => {
        ship.coords.forEach((coord, index) => {
            if (coord[0] === x && coord[1] === y) {
                ship.hit([x,y]);
                hitShip = true;
            }
        })
    })

    if (hitShip === true){
        return true
    } else {
        return false
    }
  }

  const allSunk = () => {
    if (ships.length === 0) {
      return false
    }

    if (ships.every(ship => ship.isSunk())) {
      return true
    } else {
      return false
    }
  }

  const allCoords = () => {
    let allCoords = []
    ships.forEach(ship => {
      ship.coords.forEach(coord => {
        allCoords.push(coord)
      })
    })
    return allCoords
  }

  const populateRandomShips = () => {
    placeShip((1 + Math.floor(Math.random() * 5)), randomCoords(), (Math.random() < parseFloat(0.5)))

    function randomCoords () {
      let letters = ['A','B','C','D','E','F','G','H','I','J'];
      let coord = (letters[Math.floor(Math.random()*letters.length)]+(1+Math.floor(Math.random() * 10)))
      return coord
    }

    function getShortestShip() {
      let shortGuy = 2
      ships.forEach(ship => {
        if (ship.length < shortGuy) {shortGuy = ship.length}
      })
      return shortGuy
    }

    while (ships.length <= 4) {
     placeShip((getShortestShip() - 1), randomCoords(), (Math.random() < parseFloat(0.5)))
    }
    
    let overlap = false

    let stringedArray = allCoords().map(JSON.stringify)
    let newSet = new Set(stringedArray)
    
    if (newSet.size < allCoords().length) {
      overlap = true
    }
 
    if (overlap) {
      populateRandomShips()
    }
    
  }

  return {
    grid,
    placeShip,
    ships,
    receiveAttack,
    attacks,
    allSunk,
    allCoords,
    populateRandomShips
  }
}