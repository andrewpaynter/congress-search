import React, {useState} from 'react';
import './App.css';
import CongressChart from './components/CongressChart';
import ChartData from './models/chartData';
import Congressperson from './models/congressperson';
import CongressService from './services/CongressService';

function App() {

  const [congressData, setCongressData] = useState<Congressperson[]>(
    [
      {
        id: 12345,
        name: 'Rand Paul',
        title: 'Senator',
        party: 'Republican',
        state: 'Kentucky',
        yearsServed: 11,
      },
      {
        id: 12346,
        name: 'Chuck Schumer',
        title: 'Senator',
        party: 'Democrat',
        state: 'New York',
        yearsServed: 23,
      }
    ]
  )

  const loadCongressData = async (chartData:ChartData) => {
    const congressData = await CongressService.getCongressData(chartData)
    setCongressData(congressData)
  }

  return (
    <div className="App">
      <CongressChart congressData={congressData} loadCongressData={loadCongressData}/>
    </div>
  );
}

export default App;
