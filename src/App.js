import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  // Needed values for implementation
  const [selectedStones, setSelectedStones] = useState([]);
  const [removedStones, setRemovedStones] = useState([]);
  const [numStonesSelected, setNumStonesSelected] = useState(0);
  const [turnPrompt, setTurnPrompt] = useState("Player 1");
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const stoneElements = [];
  // Change this to change the size of the circle
  const size = 4;
  var gameOver = false;

  for (let stoneNum = 1; stoneNum <= size; stoneNum++) {
    const stoneId = `${stoneNum}`;
    const isStoneSelected = selectedStones.includes(stoneId);
    const isStoneAvailable = !removedStones.includes(stoneId);

      
    stoneElements.push(
      <btn
        style = {{ position: 'absolute', top: window.innerHeight/2 + 300 * Math.sin(stoneNum*2*Math.PI/size) - 50, right: window.innerWidth/2 + 300 * Math.cos(stoneNum*2*Math.PI/size) - 50}}
        className={`stone ${isStoneAvailable ? (isStoneSelected ? 'selectedStone' : '') : 'takenStone'}`}
        key={stoneId}
        onClick={() => handleStoneClick(stoneId)}
      ></btn>
    );
      
  }

  const handleStoneClick = (stoneId) => {
    const isSelected = selectedStones.includes(stoneId);
    const isAvailable = !removedStones.includes(stoneId);

    if (!isSelected && isAvailable && numStonesSelected < 2) {
      // Okay if the stone selected is right next to the one being selected.
      if (selectedStones.length == 0 || 
        Math.abs(selectedStones[0] - stoneId) == 1 ||
        // The following are two special cases to allow the ends of the circle to be taken at the same time. 
        selectedStones[0] == size && stoneId == 1 ||
        selectedStones[0] == 1 && stoneId == size) {
        setSelectedStones([...selectedStones, stoneId]);
        setNumStonesSelected(numStonesSelected + 1);
      } else {
        //Illegal move, can add error message here if needed.
      }
    } else if (isSelected) {
      const updatedSeats = selectedStones.filter((seat) => seat !== stoneId);
      setSelectedStones(updatedSeats);
      setNumStonesSelected(numStonesSelected - 1);
    }
  };

  const handleSelectionConfirmation = async () => {
    if (numStonesSelected > 0) {
      setRemovedStones([...removedStones, ...selectedStones]);
      setSelectedStones([]);
      setNumStonesSelected(0);
      if (turnPrompt.includes('2')) {
        setTurnPrompt("Player 1");
        setIsPlayer1Turn(true);
      } else {
        setTurnPrompt("Player 2");
        setIsPlayer1Turn(false);
      }
    }
  }

  useEffect(() => {
    if (removedStones.length == size) {
      gameOver = true;
      setIsGameOver(true);
    }
  }, [removedStones]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="stones">
        {isGameOver && <h2 className={`prompt ${isPlayer1Turn ?  'p1' : 'p2'}`}>{turnPrompt} Wins!</h2>}
          {!isGameOver && <h3 className={`prompt ${isPlayer1Turn ?  'p1' : 'p2'}`}>{turnPrompt}'s Turn</h3>}
          {!isGameOver && <btn className="selection" onClick = {() => handleSelectionConfirmation()}>Confirm Move</btn>}
          {stoneElements}
        </div>
      </header>
    </div>
  );
}

export default App;
