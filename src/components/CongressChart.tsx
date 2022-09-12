import React, {useEffect, useState} from 'react'
import ChartData from '../models/chartData'
import Congressperson from '../models/congressperson'
import { Table } from './Table'

interface CongressChartProps{
  congressData: Congressperson[],
  loadCongressData: Function
}

function CongressChart({congressData, loadCongressData}: CongressChartProps) {

  const [chartData, setChartData] = useState<ChartData>({
    currPage: 1,
    limit: 10,
    offset: 0,
    sortBy: 'name',
    sortReverse: false,
    filter: ''
  })

  useEffect(() => {
    loadCongressData(chartData)
  }, [chartData.currPage, chartData.limit, chartData.sortBy])

  const nextPage  = () => {
    if (true /*LOGIC TO CHECK IF THERE ARE MORE RESULTS*/)
      setChartData({
        ...chartData, 
        currPage: chartData.currPage + 1,
        offset: (chartData.currPage) * chartData.limit
      })
  }
  const prevPage  = () => {
    if (chartData.currPage > 1)
      setChartData({
        ...chartData, 
        currPage: chartData.currPage - 1,
        offset: (chartData.currPage - 2) * chartData.limit
      })
  }
  const handleLimitChange = (value: string) => {
    setChartData({
      ...chartData, 
      limit: parseInt(value, 10)})
  }
  const handleFilterChange = (value: string) => {
    setChartData({
      ...chartData, 
      filter: value,
      currPage: 1,
      offset: 0
    })
  }
  const handleSortClick = (sortBy: 'name' | 'title' | 'party' | 'state' | 'yearsServed') => {
    setChartData({
      ...chartData, 
      sortBy,
      currPage: 1,
      offset: 0
    })
  }

  return (
    <div className='mt-16 w-3/5 flex flex-col mx-auto'>
      <div className='justify-self-end'>
        <input
          className={`text-right py-2 rounded-md border-2 outline-0`}
          type='search'
          placeholder='Filter'
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleFilterChange(e.target.value)}
          name='filter'
          value={chartData.filter}
        />
        <button onClick={() => loadCongressData(chartData)}>Search</button>
      </div>
      <Table congressData={congressData} handleSortClick={handleSortClick}/>
      <div className='mt-4'>
        {(chartData.currPage > 1) ? <button onClick={prevPage}>Back</button> : null}
        <button>{chartData.currPage}</button>
        <button onClick={nextPage}>Next</button>
        <select 
          name='Results Per Page'
          value={chartData.limit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => handleLimitChange(e.target.value)}
          >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>
      
    </div>
    
  )
}

export default CongressChart