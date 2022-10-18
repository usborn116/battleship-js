const Player = (name, gameboard, shipList) => {

  const attack = (player, coordinates) => {
    player.gameboard.receiveAttack(coordinates, player.shipList);
  } 

  return {
    name,
    gameboard,
    shipList,
    attack
  }
}

export default Player