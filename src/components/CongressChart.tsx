import React, {KeyboardEvent, useEffect, useState} from 'react'
import ChartData from '../models/chartData'
import Congressperson from '../models/congressperson'
import CongressService from '../services/CongressService'
import { Table } from './Table'


function CongressChart() {

  const [chartData, setChartData] = useState<ChartData>({
    currPage: 1,
    limit: 10,
    offset: 0,
    sortBy: 'name',
    sortReverse: false,
    filter: ''
  })
  
  const [congressData, setCongressData] = useState<Congressperson[]>(
    []
  )

  const loadCongressData = async (chartData:ChartData) => {
    const congressData = await CongressService.getCongressData(chartData)
    setCongressData(congressData)
  }

  useEffect(() => {
    loadCongressData(chartData)
  }, [chartData.currPage, chartData.limit, chartData.sortBy, chartData.sortReverse])

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
    if (chartData.sortBy === sortBy) {
      setChartData({
        ...chartData,
        sortReverse: !chartData.sortReverse,
        currPage: 1,
        offset: 0
      })
    } else {
      setChartData({
        ...chartData, 
        sortBy,
        sortReverse: false,
        currPage: 1,
        offset: 0
      })
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      loadCongressData(chartData)
    }
  }

  return (
    <div className='my-16 w-3/5 flex flex-col mx-auto'>
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
      </div>
      <Table congressData={congressData} handleSortClick={handleSortClick} chartData={chartData}/>
      <div className='h-12 mt-4 flex justify-between'>
        <select 
          className='text-xl'
          name='Results Per Page'
          value={chartData.limit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => handleLimitChange(e.target.value)}
          >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <div className='flex items-center'>
          {(chartData.currPage > 1) ? <button className='bg-slate-200 p-2 rounded-md h-full hover:bg-blue-300 mr-2' onClick={prevPage}>Back</button> : null}
          <h2 className='mr-2 text-2xl'>{chartData.currPage}</h2>
          {!CongressService.finalPage ? <button className='bg-slate-200 p-2 rounded-md h-full hover:bg-blue-300' onClick={nextPage}>Next</button> : null}
        </div>
      </div>
    </div>
    
  )
}

export default CongressChart