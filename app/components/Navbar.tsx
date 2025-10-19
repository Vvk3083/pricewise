import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  const imgarray = [
    { src: './assets/icons/search.svg', alt: 'search' },
    { src: './assets/icons/black-heart.svg', alt: 'like' },
    { src: './assets/icons/user.svg', alt: 'user' }
  ]
  return (
    <header className='w-full'>
      <nav className='flex justify-between items-center px-6 md:px-20 py-4'>
        <Link href='/' className='flex items-center gap-1'>
          <Image src='./assets/icons/logo.svg' alt='Logo' width={28} height={28} />
          <p className='font-bold'>Price<span className='text-red-400'>Wise</span></p>
        </Link>
        <div className='flex items-center gap-5'> 
          {imgarray.map((imgs) => (
            <Image key={imgs.src} src={imgs.src} alt={imgs.alt} width={28} height={28} />
          ))}
        </div>
      </nav>

    </header>

  )
}

export default Navbar