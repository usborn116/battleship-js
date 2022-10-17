function StartModal(props) {
    return (
      <div className={props.gameStarted ? "modal-hidden" : "modal"}>
        <div className="modal-content">
          <h1>Welcome to Battleship</h1>
          <p>Are you ready to do battle?</p>
          <p>Step 1: Place all 5 of your ships, ranging in length from 5 down to 1</p>
          <p>Step 2: The Enemy Board will appear and you need to try to shoot their ships</p>
          <div className="buttons">
            <button onClick={()=>{props.setGameFunc('ai')}}>Start Game</button>
            
          </div>
        </div>
      </div>
    )
  }
  
  export default StartModal