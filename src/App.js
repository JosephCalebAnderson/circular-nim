import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [selectedStones, setSelectedSeats] = useState([]);
  const [removedStones, setRemovedStones] = useState([]);
  const [numStonesSelected, setNumSeatsSelected] = useState(0);

  const stoneElements = [];
  const size = 10;

  for (let stoneNum = 1; stoneNum <= size; stoneNum++) {
    const stoneId = `${stoneNum}`;
    const isStoneSelected = selectedStones.includes(stoneId);
    const isStoneAvailable = !removedStones.includes(stoneId);

      
    stoneElements.push(
      <btn
        style = {{ position: 'absolute', top: window.innerHeight/2 + 300 * Math.sin(stoneNum*2*Math.PI/size) - 75, right: window.innerWidth/2 + 300 * Math.cos(stoneNum*2*Math.PI/size) - 75}}
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
      setSelectedSeats([...selectedStones, stoneId]);
      setNumSeatsSelected(numStonesSelected + 1);
    } else if (isSelected) {
      const updatedSeats = selectedStones.filter((seat) => seat !== stoneId);
      setSelectedSeats(updatedSeats);
      setNumSeatsSelected(numStonesSelected - 1);
    }
  };

  function log() {
    console.log("Clicked");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="stones">
          {stoneElements}
        </div>
      </header>
    </div>
  );
}

export default App;
