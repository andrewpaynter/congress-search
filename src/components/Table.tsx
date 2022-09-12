import React from 'react'
import ChartData from '../models/chartData'
import Congressperson from '../models/congressperson'

interface TableProps{
  congressData: Congressperson[],
  handleSortClick: Function
}

export const Table = ({congressData, handleSortClick}: TableProps) => {
  return (
    <table className='table-auto border border-slate-400 bg-slate-50 mt-4 text-center mx-auto w-full'>
        <thead>
          <tr className='py-2 px-4 bg-white border-b border-slate-300 grid grid-cols-6 items-center'>
            <td></td>
            <td onClick={() => handleSortClick('name')}>Name</td>
            <td onClick={() => handleSortClick('party')}>Party</td>
            <td onClick={() => handleSortClick('state')}>State</td>
            <td onClick={() => handleSortClick('title')}>Title</td>
            <td onClick={() => handleSortClick('yearsServed')}>Years Served</td>
          </tr>
        </thead>
        <tbody>
          {congressData.map((cp: Congressperson) => 
          <tr className='p-4 border-b border-slate-200 grid grid-cols-6 items-center' key={cp.id}>
            <td>
              <img 
              src= {`http://localhost:8000/api/img/${cp.id}`}
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
