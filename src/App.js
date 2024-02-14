import logo from './logo.svg';
import './App.css';

function log() {
  console.log('Clicked');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 style={{ position: 'absolute', top: window.innerHeight/2 - 75, right: window.innerWidth/2 - 155 }}> Welcome to Circular Nim!</h3>
        <h5 style={{ position: 'absolute', top: window.innerHeight/2 + 25, right: window.innerWidth/2 - 170 }}> Select a circle and confirm your move.</h5>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(1*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(1*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(2*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(2*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(3*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(3*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(4*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(4*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(5*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(5*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(6*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(6*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(7*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(7*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(8*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(8*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(9*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(9*2*Math.PI/10)}}></btn>
        <btn className="stone" style={{ position: 'absolute', bottom: window.innerHeight/2 + 300 * Math.sin(10*2*Math.PI/10), left: window.innerWidth/2 + 300 * Math.cos(10*2*Math.PI/10)}} onClick = {() => log()} ></btn>
      </header>
    </div>
  );
}

export default App;
