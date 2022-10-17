

import React, { useState, useEffect } from 'react'
import GridSquare from "./GridSquare";
import { createPlayer } from "../player.js";

function Setup(props) {
  const [hoveredCoords, setHoveredCoords] = useState([])
  const [player, setPlayer] = useState(createPlayer())
  const [length, setLength] = useState(5)
  
  function tryToPlaceShip(coord) {
    if (player.gameboard.placeShip(length, coord, props.rotated)) {
      setLength(length - 1)
      props.placeShip()
      props.sendPlayer(player)
      console.log('ship true')
    } else {
      console.log('ship false')
      alert("You cannot place ships overlapping or out of bounds!")
    }
  }

  function hoverSquares(coord) {
    let numberifiedCoord = coord.map(meme => parseInt(meme))
    let coordsToHover = []
    coordsToHover.push(numberifiedCoord)

    for (let i = 1; i < length; i++) {
      let newCoord = []
      if (props.rotated){
        newCoord.push(numberifiedCoord[0])
        newCoord.push(numberifiedCoord[1] + i)
      } else {
        newCoord.push(numberifiedCoord[0] + i)
        newCoord.push(numberifiedCoord[1])
      }
      coordsToHover.push(newCoord)
    }
    setHoveredCoords(coordsToHover)
  }

  let playerContent = []
  player.gameboard.grid.forEach((array, arrIndex) => {
    array.forEach((cell, cellIndex) => {
      let somethingPlacedHere = false
      let hovered = false
      let allCoords = player.gameboard.allCoords()
      let currCoord = JSON.stringify([arrIndex, cellIndex])

      if(allCoords.some(coord => JSON.stringify(coord) === currCoord)) {somethingPlacedHere = true}
      if(hoveredCoords.some(coord => JSON.stringify(coord) === currCoord)) {hovered = true}

      playerContent.push(
        <GridSquare hoverFunc={hoverSquares} hovered={hovered} placed={somethingPlacedHere} coord={[arrIndex, cellIndex]} key={currCoord} placeShip={tryToPlaceShip}/>
      )
    })
  })

  return (
    <div className="square-container">
      {playerContent}
    </div>
  )
}

export default Setup