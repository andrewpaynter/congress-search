import {KeyboardEvent} from 'react'
import ChartData from "../models/chartData";

interface SearchBarProps {
  loadCongressData: Function,
  chartData: ChartData,
  setChartData: React.Dispatch<React.SetStateAction<ChartData>>
}

const SearchBar = ({loadCongressData, chartData, setChartData}:SearchBarProps) => {

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      loadCongressData()
    }
  }
  const handleFilterChange = (value: string) => {
    setChartData({
      ...chartData, 
      filter: value,
      currPage: 1,
      offset: 0
    })
  }

  return ( 
  <div className='place-self-end h-12'>
    <input
      onKeyDown={handleKeyDown}
      className='text-right py-2 rounded-md border-2 outline-0 mr-2 h-full'
      type='search'
      placeholder='Filter'
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleFilterChange(e.target.value)}
      name='filter'
      value={chartData.filter}
    />
    <button className='bg-slate-300 p-2 rounded-md h-full hover:bg-blue-300' onClick={() => loadCongressData(chartData)}>Search</button>
  </div> );
};

export default SearchBar;