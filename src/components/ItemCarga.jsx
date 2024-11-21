import React from 'react'
import { Link } from 'react-router-dom'

const ItemCarga = ({titulo,ruta}) => {
  return (
    <Link
        to={ruta}
        className='block p-2 bg-amber-300 rounded-lg w-full hover:bg-amber-500 text-stone-600 hover:text-white  flex justify-between text-center mb-4'
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="h-6 w-6"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m8.25 4.5 7.5 7.5-7.5 7.5" 
            />
        </svg>

        <span className='w-full'>{titulo}</span>
    </Link>
  )
}

export default ItemCarga