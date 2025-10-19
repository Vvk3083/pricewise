'use client'
import React, { FormEvent } from 'react'
import { useState } from 'react'
import { scrapeAndStoreProduct } from '@/lib/actions'
const isValidAmzonLink = (url:string)=>{
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
        if(hostname.includes('amazon.com')||hostname.includes('amazon')||hostname.endsWith('amazon')){
            return true;
        }
    } catch (error) {
        return false;
    }

    return false;
}
const Searchbar = () => {
    const [searchPrompt,setSearchPrompt] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const isValidLink = isValidAmzonLink(searchPrompt);
        // alert(isValidLink? "Valid Link":"Invalid Link")
        if(!isValidLink) {
            return alert('Please enter a valid link')
        } 
        try {
            setIsLoading(true);
            //scrape here
            const product  = await scrapeAndStoreProduct(searchPrompt)
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }

        
    }
    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input 
            className='flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none;' 
            type="text" 
            value={searchPrompt} 
            onChange={(e)=>setSearchPrompt(e.target.value)}
            placeholder='Enter the product link' 
             />   
            <button className='bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40;
  }' type="submit">Search</button>       
        </form>
    )
}

export default Searchbar