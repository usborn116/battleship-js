import {createShip} from './ship'

let newShip
beforeEach(() => {
  newShip = createShip(3)
  newShip.coords.push([0,1])
  newShip.coords.push([1,1])
  newShip.coords.push([2,1])
})

test('should return Ship object with proper attributes', () => {
  expect(newShip.length).toBe(3)
})

test('should have hit function and have hits array', () => {
  expect(newShip.hit).toBeDefined()
  expect(newShip.hits).toBeDefined()
})

test('should mutate hits when hit()', () => {
  newShip.hit([0,1])
  let spc = JSON.stringify([0,1]);
  let hitstring = JSON.stringify(newShip.hits);
  expect(hitstring.includes(spc)).toBe(true)
})

test('hit should return false when space is already hit', () => {
  newShip.hit([0,1])
  expect(newShip.hit([0,1])).toBe(false)
})

test('should return false when hit is called on space not on ship', () => {
  expect(newShip.hit([0,11])).toBe(false)
})

test('should have isSunk()', () => {
  expect(newShip.isSunk).toBeDefined()
})

test('isSunk() should return true and false properly', () => {
  newShip.hit([0,11])
  expect(newShip.isSunk()).toBe(false)
  newShip.hit([0,1])
  newShip.hit([1,1])
  newShip.hit([2,1])
  expect(newShip.isSunk()).toBe(true)
})

test('should store coords', () => {
  let coordstring = JSON.stringify(newShip.coords);
  let spc = JSON.stringify([0,1]);
  expect(coordstring.includes(spc)).toBe(true)
})