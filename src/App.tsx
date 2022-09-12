import React, {useState} from 'react';
import './App.css';
import CongressChart from './components/CongressChart';
import ChartData from './models/chartData';
import Congressperson from './models/congressperson';
import CongressService from './services/CongressService';

function App() {
  return (
    <div className="App">
      <CongressChart />
    </div>
  );
}

export default App;
