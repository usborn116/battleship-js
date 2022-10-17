export default function GridSquare(props) {
    let newHoverFunc;
    let newClickFunc;
    if (props.hoverFunc) {
      newHoverFunc = ()=>(props.hoverFunc(props.coord))
    } else {
      newHoverFunc = ()=>{}
    }
  
    if (props.placeShip) {
      newClickFunc = ()=>{props.placeShip(props.coord)}
    } else if (props.attack) {
      newClickFunc = ()=>{props.attack(props.coord)}
    } else {
      newClickFunc = ()=>{}
    }
  
    return (
      <div id={props.coord} onClick={newClickFunc} onMouseEnter={newHoverFunc} className={"square " + 
                (props.placed ? "placed " : "") + 
                (props.hovered ? "hovered ": "") +
                (props.hit ? "hit " : "") +
                (props.miss ? "miss " : "")
      }>
        
      </div>
    )
  }