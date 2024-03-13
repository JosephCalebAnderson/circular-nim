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
  const [isLoading, setIsLoading] = useState(true);
  const [adjacenyObjs, setAdjacencyObjs] = useState([]);
  const [isPreGame, setIsPreGame] = useState(true);
  const [isPlayer1Human, setIsPlayer1Human] = useState();
  const [isPlayer2Human, setIsPlayer2Human] = useState();
  const [size, setSize] = useState(15);
  const [computer1Logic, setComputer1Logic] = useState("Perfect");
  const [computer2Logic, setComputer2Logic] = useState("Perfect");
  const [isSimulation, setisSimultation] = useState(false);
  const [gameNum, setGameNum] = useState(10);
  const [cpu1Wins, setCpu1Wins] = useState(0);
  const [cpu2Wins, setCpu2Wins] = useState(0);
  const stoneElements = [];

  // This for loop initializes the stone objects 
  for (let stoneNum = 1; stoneNum <= size; stoneNum++) {
    // create a unique stoneID, and control placement + identifiers
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

  // Here is the start of functions that initialize the game before any moves are made.
  function getPartition(p, n) {
    let partition = [];
    for(let i = 0; i < n; i++) {
        let part = p[i] - 1;
        if (part !== 0) {
            partition.push(part);
        }
    }
    if (partition.length === 0) {
        partition.push(0);
    }    
    return partition;
}
   
  // Function to generate all unique partitions of an integer
  function getAllStates(n) {
        
      // An array to store a partition and all partitions
      let p = new Array(n); 
      var allStates = [];
        
      // Index of last element in a partition
      let k = 0; 
        
      // Initialize first partition as number itself
      p[k] = n; 
  
      // This loop first prints current partition, then generates next partition. The loop stops when  the current partition has all 1s
      while (true) {
            
          // print current partition
          let newPartition = getPartition(p, k + 1);
          allStates.push(newPartition);
          // Generate next partition
  
          // Find the rightmost non-one 
          // value in p[]. Also, update 
          // the rem_val so that we know
          // how much value can be 
          // accommodated
          let rem_val = 0;
            
          while (k >= 0 && p[k] === 1) {
              rem_val += p[k];
              k--;
          }
  
          // If k < 0, all the values are 1 so
          // there are no more partitions
          if (k < 0) 
          return allStates;
  
          // Decrease the p[k] found above 
          // and adjust the rem_val
          p[k]--;
          rem_val++;
  
          // If rem_val is more, then the sorted
          // order is violated. Divide rem_val in
          // different values of size p[k] and copy
          // these values at different positions
          // after p[k]
          while (rem_val > p[k]) {
              p[k + 1] = p[k];
              rem_val = rem_val - p[k];
              k++;
          }
  
          // Copy rem_val to next position and 
          // increment position
          p[k + 1] = rem_val;
          k++;
      }
  }
  var counter = 0;

  // Get all adjacent states for a given state that take only one stone.
  function getAdjSingleStoneMoves (currentStateArray) {
      var gameStatesArray = [];
      // i loop tracks which string is getting split
      for (let i = 0; i < currentStateArray.length; i ++) {
          if (currentStateArray[i] !== currentStateArray[i+1]) {
              // j value tracks how much to split the given value
              for (let j = 1; j <= (currentStateArray[i] + 1)/2; j ++) {
                  // size of the new stack that will be formed after the split
                  let newStack = j-1;
                  // This array will hold the new partition
                  let newArray = []
                  // push all of the positive values into the new array
                  for (let k = 0; k < currentStateArray.length; k ++) {
                      if (currentStateArray[k] !== 0) {
                          newArray.push(currentStateArray[k]);
                      }
                  }
                  // perform the split on the selected value
                  newArray[i] = currentStateArray[i] - j;
                  if (newArray[i] === 0 && newArray.length > 1) {
                      newArray.splice(i,1);
                  }
                  // push the new stack if it is a positive value
                  if (newStack !== 0) {
                      newArray.push(newStack);
                  }
                  // sort the new array in descending order and print it
                  newArray = arrSort(newArray);
                  gameStatesArray.push(newArray);
                  counter = counter + 1;
              }
          }
      }
      return gameStatesArray;
  }

  // get all adjacent game states for a given state.
  function getAdjGameStates(currentStateArray) {
      var gameStatesArray = [];
      // i loop tracks which string is getting split
      for (let i = 0; i < currentStateArray.length; i ++) {
          if (currentStateArray[i] !== currentStateArray[i+1]) {
              // j value tracks how much to split the given value
              for (let j = 1; j <= (currentStateArray[i] + 1)/2; j ++) {
                  // size of the new stack that will be formed after the split
                  let newStack = j-1;
                  // This array will hold the new partition
                  let newArray = []
                  // push all of the positive values into the new array
                  for (let k = 0; k < currentStateArray.length; k ++) {
                      if (currentStateArray[k] !== 0) {
                          newArray.push(currentStateArray[k]);
                      }
                  }
                  // perform the split on the selected value
                  newArray[i] = currentStateArray[i] - j;
                  if (newArray[i] === 0 && newArray.length > 1) {
                      newArray.splice(i,1);
                  }
                  // push the new stack if it is a positive value
                  if (newStack !== 0) {
                      newArray.push(newStack);
                  }
                  // sort the new array in descending order and print it
                  newArray = arrSort(newArray);
                  gameStatesArray.push(newArray);
                  counter = counter + 1;
              }
          }
      }
      //This is meant to count moves that take 2 stones.
      for (let l = 0; l < currentStateArray.length; l ++) {
          if (currentStateArray[l] !== currentStateArray[l+1]) {
              // j value tracks how much to split the given value
              for (let m = 1; m <= (currentStateArray[l])/2; m ++) {
                  // size of the new stack that will be formed after the split
                  let newStack = m-1;
                  // This array will hold the new partition
                  let newArray = []
                  // push all of the positive values into the new array
                  for (let n = 0; n < currentStateArray.length; n ++) {
                      if (currentStateArray[n] !== 0) {
                          newArray.push(currentStateArray[n]);
                      }
                  }
                  // perform the split on the selected value
                  newArray[l] = currentStateArray[l] - m - 1;
                  if (newArray[l] === 0 && newArray.length > 1) {
                      newArray.splice(l,1);
                  }
                  // push the new stack if it is a positive value
                  if (newStack > 0) {
                      newArray.push(newStack);
                  }
                  // sort the new array in descending order and print it
                  newArray = arrSort(newArray);
                  gameStatesArray.push(newArray);
                  counter = counter + 1;
              }
          }
      }
      return gameStatesArray;
  }

  // function to sort an array.
  function arrSort(arr) {
      // sort the array in ascedning order
      arr.sort((a,b)=>a-b);
      // reverse the sorted array.
      arr.reverse();
      return arr;
  }

  // create the adjacency objects with a list of game states.
  function getAdjacencyObjects (gameStatesArr){
      let count = gameStatesArr.length
      let adjacencyObjsArr = [];
      // Create the objects for each state
      // The objects contain current state, adjacent states, and the mex.
      for (let state = 0; state < count; state ++) {
          let adjStates = getAdjGameStates(gameStatesArr[state]);
          let newState = {
              current: gameStatesArr[state],
              adjacent: adjStates,
              mex: null,
              next: -1
          };
          adjacencyObjsArr.push(newState);
      }
      // changes MEX value for [0].
      // CHANGE THE FOLLOWING LINE TO 0 FOR TAKE LAST TO WIN AND -1 TO GIVE LAST TO WIN.
      adjacencyObjsArr[count - 1].mex = -1;
      // changes MEX value for [1].
      // CHANGE THIS FOLLOWING LINE TO 1 FOR TAKE LAST TO WIN AND 0 FOR GIVE LAST TO WIN.
      adjacencyObjsArr[count - 2].mex = 0;
      //Set the next value of [1] to 0 so it can move to [0].
      adjacencyObjsArr[count - 2].next = 0;
      return adjacencyObjsArr;
  }

  // search an array of arrays for a given array
  function searchForArray(haystack, needle){
      var i, j, current;
      for(i = 0; i < haystack.length; ++i){
        if(needle.length === haystack[i].length){
          current = haystack[i];
          for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
          if(j === needle.length)
            return i;
        }
      }
      return -1;
  }

  // set the mex values on adjacency objects.
  function setMexValues (adjObjsArr, circleSize) {
      let length = adjObjsArr.length;
      // Go through each state to find their mex value

      for (let currState = length - 3; currState >= 0; currState --) {
          // needed initial variables.
          let count = 0;
          let adjMex = [];
          let adjNum = adjObjsArr[currState].adjacent;
          let maxMex = 0;
          let largestIndex = -1;
          for (let tester = currState + 1; tester < length; tester ++) {
              // Check to see if a state exists in an array
                let index = searchForArray(adjObjsArr[currState].adjacent, adjObjsArr[tester].current);
                // If the testing state is an adjacent state do the following
              if (index !== -1) {
                  // only push to the adjacency matrix if it is a new mex value
                  if (!adjMex.includes(adjObjsArr[tester].mex)) {
                      adjMex.push(adjObjsArr[tester].mex);
                      // If this is a new largest max then save its index.
                      if (adjObjsArr[tester].mex > maxMex) {
                          largestIndex = index;
                      }
                  }
                  // if a mex value of 0 is found update the 'next' value with this index.
                  if (adjObjsArr[tester].mex === 0) {
                      adjObjsArr[currState].next = index;
                  }
                  count = count + 1;
                  // if all adjacent states have been found then we can stop searching.
                  if (count === adjNum) {
                      tester = length;
                  }
              }
          }
          // Get the mex value based off adjacent mex values and store it.
          for (let iterator = 0; iterator < length; iterator ++) {
              if (!adjMex.includes(iterator)) {
                  adjObjsArr[currState].mex = iterator;
                  iterator = length;
              }
          }
          // CHANGE TO UPDATE WHAT TO DO WHEN PLACED IN A LOSING POSITION
          // Update the next value with the adjacent state with the largest index.
          if (adjObjsArr[currState].mex === 0) {
              // The following would be used to pick a random one stone move.
              let oneStoneMoves = getAdjSingleStoneMoves(adjObjsArr[currState].current);
              let amount = oneStoneMoves.length;
              // return a random number from 0 to amount - 1
              let move = Math.floor(Math.random() * amount);
              adjObjsArr[currState].next = move;
              // The following would be used to pick the next move which has the largest mex value.
              //adjObjsArr[currState].next = largestIndex;
          }
      }
      // get the MEX value for the circle. Only two values need to be checked so if else is sufficient.
      let adjMex = [];
      adjMex.push(adjObjsArr[0].mex);
      adjMex.push(adjObjsArr[1].mex);
      let value = 0;
      if (adjMex.includes(0)) {
          if (adjMex.includes(1)) {
              value = 2;
          } else {
              value = 1;
          }
      } else {
          value = 0;
      }
      let obj = {
          current: ['' + circleSize + 'c'],
          adjacent: [[circleSize-1],[circleSize-2]],
          mex: value,
          next: 0
      }
      if (adjObjsArr[1].mex === 0) {
          obj.next = 1;
      }
      adjObjsArr.unshift(obj);
      return adjObjsArr;
  }

  // search a list of gameObjects for an array.
  function searchGameObjects(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].current.length){
        current = haystack[i].current;
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
  }

  // After each move, check to see if the game is over.
  useEffect(() => {
    if (removedStones.length === size) {
      setIsGameOver(true);
    }
  }, [removedStones]);

  // Use Mex values to analyze perfect play for the CPU.
  useEffect(() => {
    console.log('calculating...\n');
    let allPossibleStates = getAllStates(size);
    console.log('All Possible States Found.\n');
    let objArr = getAdjacencyObjects(allPossibleStates);
    console.log('Adjacency Objects Found.\n');
    let objsWithMex = setMexValues(objArr, size);
    console.log('Mex Values Found.\n');
    setAdjacencyObjs(objsWithMex);
    setIsLoading(false);
  }, [isPreGame]);

  // use perfectPlay, while losing choose the game state based on criteria when assigning next values.
  function getPerfectPlayMove(objList, gameState) {
    let index = searchGameObjects(objList, gameState);
    if (index == -1) {
      return null;
    }
    let adjacentLocation = objList[index].next;
    return objList[index].adjacent[adjacentLocation];
  }

  function getRandomMove(objList, gameState) {
    let index = searchGameObjects(objList, gameState);
    if (index == -1) {
      return null;
    }
    let numOptions = objList[index].adjacent.length;
    let adjacentLocation = Math.floor(Math.random() * numOptions);
    return objList[index].adjacent[adjacentLocation];
  }

  // Used to delay the cpu turns in certain game states
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // This function takes in information about the game and changes the UI according to perfect play by the cpu.
  function makeCPUMove (desiredGameState, currentGameState, takenStoneArr) {
    if (desiredGameState == null) {
      return;
    }
    let dgs = desiredGameState;
    let cgs = currentGameState;
    let desiredSum = 0;
    let currentSum = 0;
    let desiredDifferences = []
    let currentDifferences = []
    // First find the differences between the current state and the desired state
    for (let stack = 0; stack < dgs.length;) {
      let index = currentGameState.indexOf(dgs[0]);
      if (index != -1) {
        dgs.splice(0, 1);
        cgs.splice(index, 1);
      } else {
        desiredDifferences.push(dgs[0]);
        desiredSum = desiredSum + dgs[0];
        dgs.splice(0,1);
      }
    }
    for (let remaining = 0; remaining < cgs.length; remaining++) {
      currentDifferences.push(cgs[remaining]);
      currentSum = currentSum + cgs[remaining];
    }
    if (desiredDifferences.length == 0) {
      desiredDifferences.push(0);
    }
    // Now we need to find which stones result in currentDifference.
    let sortedRemovedStones = [];
    for (let k = 0; k < takenStoneArr.length; k ++) {
      sortedRemovedStones.push(parseInt(takenStoneArr[k]));
    }
    sortedRemovedStones = arrSort(sortedRemovedStones);
    var startingStone = 0;
    for (let i = 0; i < sortedRemovedStones.length - 1; i++) {
      let difference = Math.abs(sortedRemovedStones[i + 1] - sortedRemovedStones[i]) - 1;
      if (difference == currentDifferences[0]) {
        startingStone = parseInt(sortedRemovedStones[i + 1]);
      }
    }
    if (startingStone == 0 && sortedRemovedStones.length > 0) {
      startingStone = parseInt(sortedRemovedStones[0]);
    }
    if (startingStone == 0 && sortedRemovedStones.length == 0) {
      startingStone = 1;
    }
      startingStone = startingStone + parseInt(desiredDifferences[0]) + 1;
      if (startingStone > size) {
        startingStone = startingStone - size;
      }
      let additionalStone = startingStone + 1;
      if (additionalStone > size) {
        additionalStone = additionalStone - size;
      }
      // Carry out the moves the cpu would like to make.
      if (currentSum - desiredSum == 2) {
        console.log("Remove stones: " + startingStone + " " + additionalStone);
        let startingStoneString = startingStone.toString();
        let additionalStoneString = additionalStone.toString();
        setRemovedStones([...takenStoneArr, startingStoneString, additionalStoneString]);
      } else {
        console.log("Remove stones: " + startingStone);
        let startingStoneString = startingStone.toString();
        setRemovedStones([...takenStoneArr, startingStoneString]);
      }
  }

  // Turn the UI into a game state that the cpu can understand.
  function getGameState(takenStoneArr) {
    let sortedRemovedStones = arrSort(takenStoneArr);
    let state = [];
    for (let i = 0; i < sortedRemovedStones.length - 1; i++) {
      let difference = Math.abs(sortedRemovedStones[i + 1] - sortedRemovedStones[i]) - 1;
      if (difference !== 0) {
        state.push(difference);
      }
    }
    let difference = size - sortedRemovedStones.length;
    for (let j = 0; j < state.length; j ++) {
      difference = difference - state[j];
    }
    if (difference !== 0) {
      state.push(difference);
    }
    let gameState = arrSort(state);
    return gameState;
  }

  // Game option for player vs player
  function handleGame1Click () {
    setIsPlayer1Human(true);
    setIsPlayer2Human(true);
    setIsPreGame(false);
  }

  // Game option for player vs computer
  function handleGame2Click () {
    setIsPlayer1Human(true);
    setIsPlayer2Human(false);
    setIsPreGame(false);
  }

  // Game option for computer vs computer
  function handleGame3Click () {
    setTurnPrompt("CPU 1");
    setIsPlayer1Human(false);
    setIsPlayer2Human(false);
    setIsPreGame(false);
  }

  // Game Options for running simulations
  function handleGame4Click () {
    setIsPlayer1Human(false);
    setIsPlayer2Human(false);
    setIsPreGame(false);
    setisSimultation(true);
  }

  // function used in the pregame circle size selector.
  function increaseSize1 () {
    if (size < 25) {
      setSize(size + 1);
    }
  }

  // function used in the pregame circle size selector.
  function increaseSize5 () {
    if (size < 21) {
      setSize(size + 5);
    } else {
      setSize(25);
    }
  }

  // function used in the pregame circle size selector.
  function decreaseSize1 () {
    if (size > 4) {
      setSize(size - 1);
    }
  }

  // function used in the pregame circle size selector.
  function decreaseSize5 () {
    if (size > 8) {
      setSize(size - 5);
    } else {
      setSize(4);
    }
  }

  // Reset the current game with the same initial conditions
  const handleResetGame = () => {
    if (isPlayer1Human) {
      setTurnPrompt("Player 1");
    } else {
      setTurnPrompt("CPU 1");
    }
    setIsPlayer1Turn(true);
    setIsGameOver(false);
    setRemovedStones([]);
    setSelectedStones([]);
    setNumStonesSelected(0);
  }

  // Go back to the previous screen to make new selections
  const handleNewGameSelection = () => {
    handleResetGame();
    setSize(15);
    setTurnPrompt("Player 1");
    setIsPreGame(true);
    setisSimultation(false);
  }

  // Function that is called whenever a stone is clicked in the game.
  const handleStoneClick = (stoneId) => {
    console.log(stoneId);
    const isSelected = selectedStones.includes(stoneId);
    const isAvailable = !removedStones.includes(stoneId);

    if (!isSelected && isAvailable && numStonesSelected < 2) {
      // Okay if the stone selected is right next to the one being selected.
      if (selectedStones.length === 0 || 
        Math.abs(selectedStones[0] - stoneId) === 1 ||
        // The following are two special cases to allow the ends of the circle to be taken at the same time. 
        (selectedStones[0] == size && stoneId == 1) ||
        (selectedStones[0] == 1 && stoneId == size)) {
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

  const getCPUMove = (currentGameState, computerType) => {
    let perfectProbability = null;
    if (computerType === "Perfect") {
      return getPerfectPlayMove(adjacenyObjs, currentGameState);
    }
    if (computerType === "Random") {
      return getRandomMove(adjacenyObjs, currentGameState);
    }
    if (computerType === "coinflip") {
      // Indicates a 50 percent chance of making the perfect move everytime.
      // This will be changed later to better represent a human player.
      perfectProbability = 0.5;
    }
    // cpu performs worse when there are more strings involved.
    if (computerType === "testing1") {
      let numStrings = getNumStrings(currentGameState);
      // Possibly change the numerator to give some more advantage
      perfectProbability = 1/numStrings;
      //perfectProbability = 1 - 1/numStrings;
      console.log(perfectProbability);
    }
    // cpu perfroms worse when there are more stones remaining
    if (computerType === "testing2") {
      let numRemainingStones = getNumRemainingStones(currentGameState);
      // Possibly change the denomenator to give some more advantage
      perfectProbability = 1 - (numRemainingStones/size);
    }
    // cpu performs based on the number of stones and strings
    if (computerType === "testing3") {
      let numStrings = getNumStrings(currentGameState);
      let numRemainingStones = getNumRemainingStones(currentGameState);
      // Possibly change the numerator to give some more advantage
      perfectProbability = 1/(numStrings+numRemainingStones);
      //perfectProbability = 1 - 1/(numStrings+numRemainingStones);
    }
    // cpu performs based on the number of stones and strings
    if (computerType === "testing4") {
      let numStrings = getNumStrings(currentGameState);
      let numRemainingStones = getNumRemainingStones(currentGameState);
      // Possibly change the denomenator to give some more advantage
      perfectProbability = 1 - (numStrings+numRemainingStones)/size;
    }
    let diceRoll = Math.random();
    // Indicates the user should not play perfect.
    if (diceRoll > perfectProbability) {
      return getRandomMove(adjacenyObjs, currentGameState);
      // Indicates the user should play perfect.
    } else {
      return getPerfectPlayMove(adjacenyObjs, currentGameState);
    }
  }

  const getNumStrings = (state) => {
    return state.length;
  }

  const getNumRemainingStones = (state) => {
    let startingString = '' + size + 'c';
    let numRemainingStones = 0;
    if (state.length == 1 && state[0] === startingString) {
      return size;
    } else {
      for (let i = 0; i < state.length; i ++) {
        numRemainingStones = numRemainingStones + state[i];
      }
    }
    return numRemainingStones;
  }

  // This allows users to confirm their move within the game.
  const handleSelectionConfirmation = async () => {
    if (numStonesSelected > 0) {
      setRemovedStones([...removedStones, ...selectedStones]);
      setSelectedStones([]);
      setNumStonesSelected(0);
      if (!turnPrompt.includes('1')) {
        setTurnPrompt("Player 1");
        setIsPlayer1Turn(true);
      } else {
        if (isPlayer2Human) {
          setTurnPrompt("Player 2");
          setIsPlayer1Turn(false);
        } else {
          setTurnPrompt("CPU");
          setIsPlayer1Turn(false);
        }
      }
      // If the 2nd player is not human, carry out this CPU move for this as well.
      if (!isPlayer2Human){
        let removingArr = [...removedStones, ...selectedStones]
        let gameState = getGameState(removingArr);
        let newGameState = getCPUMove(gameState, computer1Logic);
        setIsLoading(true);
        await timeout(1000);
        makeCPUMove(newGameState, gameState, removingArr);
        if (removedStones.length + selectedStones.length !== size) {
          setTurnPrompt("Player 1");
          setIsPlayer1Turn(true);
        }
        setSelectedStones([]);
        setNumStonesSelected(0);
        setIsLoading(false);
      }
    }
  }

  // Allows the cpu to make a move in a cpu vs cpu game
  const handleSimulationMove = async () => {
    setIsLoading(true);
    let removingArr = [...removedStones];
    let gameState = getGameState(removingArr);
    if (gameState[0] == size) {
      gameState = [size+'c'];
    }
    let newGameState = null;
    if (turnPrompt.includes('1')) {
      newGameState = getCPUMove(gameState, computer1Logic);
    } else {
      newGameState = getCPUMove(gameState, computer2Logic);
    }
    // Clear any user selections, block them from making another move while this move is made.
    setSelectedStones([]);
    setNumStonesSelected(0);
    makeCPUMove(newGameState, gameState, removingArr);
    if (turnPrompt.includes('1')) {
      setTurnPrompt('CPU 2');
      setIsPlayer1Turn(false);
    } else {
      setTurnPrompt('CPU 1');
      setIsPlayer1Turn(true);
    }
    setIsLoading(false);
  }

  const runCPUSimulations = () => {
    let comp1WinCount = 0;
    let comp2WinCount = 0;
    for (let i = 0; i < gameNum; i ++) {
      let currentState = ['' + size + 'c'];
      let gameEnded = false;
      while (!gameEnded) {
        // Make computer 1 move
        currentState = getCPUMove(currentState, computer1Logic);
        if (currentState.length == 1 && currentState[0] == 0) {
          gameEnded = true;
          comp2WinCount = comp2WinCount + 1;
        }
        // Make computer 2 move
        if (!gameEnded) {
          currentState = getCPUMove(currentState, computer2Logic);
          if (currentState.length == 1 && currentState[0] == 0) {
            gameEnded = true;
            comp1WinCount = comp1WinCount + 1;
          }
        }
      }
    }
    setCpu1Wins(comp1WinCount);
    setCpu2Wins(comp2WinCount);
  }

  // This return statement places the HTML objects onto the web page.
  return (
    <div className="App">
      <header className="App-header">
      {isPreGame && <h3 className = "Size-change" onClick = {() => increaseSize5()}>Increase +5</h3>}
        {isPreGame && <h3 className = "Size-change" onClick = {() => increaseSize1()}>Increase +1</h3>}
        {isPreGame && <h3>Circle Size: {size}</h3>}
        {isPreGame && <h3 className = "Size-change" onClick = {() => decreaseSize1()}>Decrease -1</h3>}
        {isPreGame && <h3 className = "Size-change" onClick = {() => decreaseSize5()}>Decrease -5</h3>}
        {isPreGame && <h3>Which type of game would you like to play?</h3>}
        <div>
          {isPreGame && <btn className = "Game-option" onClick = {() => handleGame1Click()}>Player Vs Player</btn>}
          {isPreGame && <btn className = "Game-option" onClick = {() => handleGame2Click()}>Player Vs Computer</btn>}
          {isPreGame && <btn className = "Game-option" onClick = {() => handleGame3Click()}>Computer Vs Computer</btn>}
          {isPreGame && <btn className = "Game-option" onClick = {() => handleGame4Click()}>Run Simulations</btn>}
        </div>
        {isPreGame && <h3>Select Computer Difficulty Below:</h3>}
        {isPreGame && <div>
          <h5>Computer 1:</h5>
          <select className = "dropdown" value={computer1Logic} onChange={(event) => setComputer1Logic(event.target.value)}>
          <option value="Perfect">Perfect</option> 
          <option value="Random">Random</option> 
          <option value="coinflip">Coin Flip</option>
          <option value="testing1">testing1</option> 
          <option value="testing2">testing2</option>
          <option value="testing3">testing3</option>
          <option value="testing4">testing4</option> 
          </select>
        </div>}
        {isPreGame && <div>
          <h5>Computer 2:</h5>
          <select className = "dropdown" value={computer2Logic} onChange={(event) => setComputer2Logic(event.target.value)}>
          <option value="Perfect">Perfect</option> 
          <option value="Random">Random</option> 
          <option value="coinflip">Coin Flip</option>
          <option value="testing1">testing1</option> 
          <option value="testing2">testing2</option>
          <option value="testing3">testing3</option>
          <option value="testing4">testing4</option>  
          </select>
        </div>}
        <div className="stones">
        {!isSimulation && isGameOver && <h2 className={`prompt ${isPlayer1Turn ?  'p1' : 'p2'}`}>{turnPrompt} Wins!</h2>}
          {!isSimulation && !isGameOver && !isPreGame && <h3 className={`prompt ${isPlayer1Turn ?  'p1' : 'p2'}`}>{turnPrompt}'s Turn</h3>}
          {!isSimulation && !isGameOver && !isPreGame && !isLoading && isPlayer1Human && <btn className="selection" onClick = {() => handleSelectionConfirmation()}>Confirm Move</btn>}
          {!isSimulation && !isGameOver && !isPreGame && !isLoading && !isPlayer1Human && <btn className="selection" onClick = {() => handleSimulationMove()}>Make CPU Move</btn>}
          {!isSimulation && !isPreGame && stoneElements}
        </div>
        {!isSimulation && !isPreGame && !isLoading && <btn className="selection" onClick = {() => handleResetGame()}>Reset Game</btn>}
          {isSimulation && !isPreGame && <div>
            <h3>Number of Games:</h3>
            <select className = "dropdown" value={gameNum} onChange={(event) => setGameNum(event.target.value)}>
            <option value="10">10</option> 
            <option value="100">100</option> 
            <option value="1000">1000</option> 
            <option value="10000">10000</option>
            </select>
            </div>}
            {isSimulation && !isPreGame && <>
            <btn className = "Game-option" onClick = {() => runCPUSimulations()}>Run Simulation</btn>
            <h2>Computer 1 Wins: {cpu1Wins}</h2>
            <h2>Computer 2 Wins: {cpu2Wins}</h2>
            </>}
            {!isPreGame && !isLoading && <btn className="selection" onClick = {() => handleNewGameSelection()}>Start New Game</btn>}
      </header>
    </div>
  );
}

export default App;