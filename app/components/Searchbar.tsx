'use client'
import React from 'react'

const Searchbar = () => {
    const handleSubmit = ()=>{}
    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input className='flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none;' type="text"  placeholder='Enter the product link' name="" id="" />   
            <button className='bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40;
  }' type="submit">Search</button>       
        </form>
    )
}

export default Searchbar