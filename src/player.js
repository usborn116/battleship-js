import { createGameboard } from "./Gameboard";

const createPlayer = () => {
  let gameboard = createGameboard()

  const randomAttack = () => {
    let letters = ['A','B','C','D','E','F','G','H','I','J'];
    let coord = (letters[Math.floor(Math.random()*letters.length)]+(1+Math.floor(Math.random() * 10)))
    return coord
  }

  return {
    gameboard,
    randomAttack
  }
}

export {createPlayer}