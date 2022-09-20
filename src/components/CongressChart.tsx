import React, {useEffect, useState} from 'react'
import ChartData from '../models/chartData'
import Congressperson from '../models/congressperson'
import CongressService from '../services/CongressService'
import PageOptions from './PageOptions'
import SearchBar from './SearchBar'
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

  const [congressDataPages, setCongressDataPages] = useState<Congressperson[][]>([])
  
  const [congressData, setCongressData] = useState<Congressperson[]>(
    []
  )

  const loadCongressData = async () => {
    const congressData = await CongressService.getCongressData(chartData)
    setCongressData(congressData)
    if(!congressDataPages[chartData.currPage]) {
      setCongressDataPages(prevCDP => {
        let prev = [...prevCDP]
        prev[chartData.currPage] = [...congressData]
        return prev
      })
    }
  }

  useEffect(() => {
    setCongressDataPages([])
    loadCongressData()
  }, [chartData.limit, chartData.sortBy, chartData.sortReverse])

  useEffect(() => {
    if (congressDataPages[chartData.currPage]) {
      setCongressData([...congressDataPages[chartData.currPage]])
    } else {
      loadCongressData()
    }
  }, [chartData.currPage])

  return (
    <div className='my-16 w-3/5 flex flex-col mx-auto'>
      <SearchBar loadCongressData={loadCongressData} chartData={chartData} setChartData={setChartData} />
      <Table congressData={congressData} setChartData={setChartData} chartData={chartData}/>
      <PageOptions chartData={chartData} setChartData = {setChartData} CongressService={CongressService}/>
    </div>
  )
}

export default CongressChart