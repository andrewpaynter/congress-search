import React from 'react'
import AmericanFlag from '../images/Flag_of_the_United_States.svg'

const Header = () => {
  return (
    <header className=' px-6 py-3 border-b sticky top-0 bg-slate-50 opacity-95 z-10'>
        <div className='w-4/5 md:w-3/5 mx-auto flex justify-left place-items-center'>
          <img width='40px' src={AmericanFlag} alt='logo' />
          <h2 className='text-xl md:text-2xl lg:text-3xl text-blue-900 ml-2'>Congress Searcher</h2>
        </div>
    </header>
  )
}

export default Header
