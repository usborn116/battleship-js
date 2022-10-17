import { createPlayer } from "./Player";

let newPlayer
beforeEach(() => {
  newPlayer = createPlayer()
})

test('should have a gameboard', () => {
  expect(newPlayer.gameboard).toBeDefined()
})

test('should have randomAttack that return coord array', () => {
  let attack = newPlayer.randomAttack()
  expect(attack.length).toBeGreaterThan(1)
  expect(attack.length).toBeLessThan(4)
  expect(parseInt(attack[1])).toBeGreaterThan(0)
  expect(parseInt(attack[1])).toBeLessThan(11)
})