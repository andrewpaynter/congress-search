import React from 'react'
import ChartData from '../models/chartData'
import Congressperson from '../models/congressperson'

interface TableProps{
  congressData: Congressperson[],
  chartData: ChartData,
  setChartData: React.Dispatch<React.SetStateAction<ChartData>>
}

export const Table = ({congressData, chartData, setChartData}: TableProps) => {

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

  return (
    <table className='table-auto border border-slate-400 bg-slate-50 mt-4 text-center mx-auto w-full'>
        <thead>
          <tr className='py-2 px-4 bg-white border-b border-slate-300 grid grid-cols-6 items-center'>
            <td></td>
            <td onClick={() => handleSortClick('name')} className={`hover:cursor-pointer ${chartData.sortBy === 'name' ? 'font-bold' : ''}`}>Name</td>
            <td onClick={() => handleSortClick('party')} className={`hover:cursor-pointer ${chartData.sortBy === 'party' ? 'font-bold' : ''}`}>Party</td>
            <td onClick={() => handleSortClick('state')} className={`hover:cursor-pointer ${chartData.sortBy === 'state' ? 'font-bold' : ''}`}>State</td>
            <td onClick={() => handleSortClick('title')} className={`hover:cursor-pointer ${chartData.sortBy === 'title' ? 'font-bold' : ''}`}>Title</td>
            <td onClick={() => handleSortClick('yearsServed')} className={`hover:cursor-pointer ${chartData.sortBy === 'yearsServed' ? 'font-bold' : ''}`}>Years Served</td>
          </tr>
        </thead>
        <tbody>
          {congressData.map((cp: Congressperson) => 
          <tr className='p-4 border-b border-slate-200 grid grid-cols-6 items-center' key={cp.id}>
            <td>
              <img 
              src= {`https://congress-searcher-api.herokuapp.com/api/img/${cp.id}`}
              alt={cp.name}
              className='h-32'
              />
              </td>
            <td>{cp.name}</td>
            <td>{cp.party}</td>
            <td>{cp.state}</td>
            <td>{cp.title}</td>
            <td>{cp.yearsServed}</td>
          </tr>)}
        </tbody>
      </table>
  )
}
