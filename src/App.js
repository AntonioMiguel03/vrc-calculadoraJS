import React from 'react';
import './App.css';
import Calculadora from './components/calculadora'; // Use 'calculadora' em vez de 'Calculadora.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <center><h3>Calculadora JavaScript</h3></center>
        <Calculadora />
        <footer>Antonio Miguel Borges Correa</footer>
      </header>
    </div>
  );
}

export default App;
