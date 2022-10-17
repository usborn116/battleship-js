import {createGameboard} from './Gameboard'
import {createShip} from './ship'

let newBoard
beforeEach(() => {
  newBoard = createGameboard()
})

test('should have grid of 10 by 10', () => {
  expect(newBoard.grid.length).toBe(10)
  for (let i = 0; i < newBoard.grid.length; i++) {
    const element = newBoard.grid[i];
    expect(element.length).toBe(10)
  }
})

test('should place ships correctly', () => {
  newBoard.placeShip(3, 'A2', true)
  expect(newBoard.grid[0][1]).toBe('x')
  expect(newBoard.grid[1][1]).toBe('x')
  expect(newBoard.grid[2][1]).toBe('x')
})

test('should place ships vertical', () => {
  newBoard.placeShip(3, 'A2', false)
  expect(newBoard.grid[0][1]).toBe('x')
  expect(newBoard.grid[0][2]).toBe('x')
  expect(newBoard.grid[0][3]).toBe('x')
})

test('should not place ship if it will go out of bounds', () => {
  expect(newBoard.placeShip(3, 'X8', false)).toBe(false)
  expect(newBoard.placeShip(3, 'A14', true)).toBe(false)
})

test('ship should have coords after placeShip()', () => {
  newBoard.placeShip(3, 'A2', false)
  expect(newBoard.ships[0].coords).toEqual([[0,1], [0,2], [0,3]])
})

test('should have ships', () => {
    newBoard.placeShip(3, 'A2', false)
    expect(newBoard.ships.length).toBe(1)
  })

test('should store attacjs', () => {
    newBoard.placeShip(3, 'A2', false)
    newBoard.receiveAttack('A3')
    expect(newBoard.attacks[0]).toStrictEqual([0,2])
  })

test('should return true', () => {
    newBoard.placeShip(3, 'A2', false)
    expect(newBoard.receiveAttack('A3')).toBe(true)
  })

test('should receiveAttack() and ship should store that hit', () => {
  newBoard.placeShip(3, 'A2', false)
  newBoard.receiveAttack('A3')
  expect(newBoard.ships[0].hits.length).toBe(1)
})

test('ship.isSunk() should be true after requisite receiveAttacks', () => {
  newBoard.placeShip(3, 'A2', false)
  newBoard.receiveAttack('A2')
  newBoard.receiveAttack('A3')
  newBoard.receiveAttack('A4')
  expect(newBoard.ships[0].isSunk()).toBe(true)
})


test('should receiveAttack() for missing coordinate and return false', () => {
  newBoard.placeShip(3, 'A2', false)
  expect(newBoard.receiveAttack('A8')).toBe(false)
})

test('receiveAttack should return false when hitting same place', () => {
  newBoard.placeShip(3, 'A2', false)
  newBoard.receiveAttack('A5')
  expect(newBoard.receiveAttack('A5')).toBe(false)
})

test('receive attack should return false when hitting ship in same place twice', () => {
  newBoard.placeShip(3, 'A2', false)
  newBoard.receiveAttack('A3')
  expect(newBoard.receiveAttack('A3')).toBe(false)
})

test('allSunk() should return true if all ships are fully hit', () => {
  newBoard.placeShip(2, 'A2', false)
  newBoard.placeShip(2, 'B2', false)
  newBoard.receiveAttack('A2')
  newBoard.receiveAttack('A3')
  newBoard.receiveAttack('B2')
  newBoard.receiveAttack('B3')
  expect(newBoard.allSunk()).toBe(true)
})

test('populate random ships should create 5 ships that do not overlap', () => {
  newBoard.populateRandomShips()
  expect(newBoard.ships.length).toBe(5)
})