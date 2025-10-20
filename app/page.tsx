import React from 'react'
import Image from 'next/image'
import Searchbar from './components/Searchbar'
import HeroCarousel from './components/HeroCarousel'
import { getAllProducts } from '@/lib/actions'
import ProductCard from './components/ProductCard'
const Home = async() => {
  //super simple to get all the products no BT
  const allProducts = await getAllProducts();
  return (
    <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='flex gap-2 text-sm font-medium text-primary'>Smart Shopping Starts Here:
              <Image src='./assets/icons/arrow-right.svg' alt='Right arrow' width={14} height={14} ></Image>
            </p>

            <h1 className='mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900;'>Unleash the Power of <span className='text-red-500'>PriceWise</span></h1>
            <p className='mt-6'>Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.</p>
            <Searchbar></Searchbar>
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className='trending'>
        <h2>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map((p) => (
            <ProductCard key={p._id} product={p}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home