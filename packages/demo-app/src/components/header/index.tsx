
import React from 'react'
import { Links } from './links'
import { getDetailsByLib } from '../demo-header/utils'



const Header = () => {
  const { title, npmLink, libType } = getDetailsByLib()
  return (
    <div className='header bg-gray-100 leading-9 p-1.5 mt-5 mb-10  rounded-xl py-3 px-2.5  top-0 z-40'>
      <div className='md:grid md:grid-cols-3'>
        <div />
        <h2 className='m0 text-center text-3xl'>{title}</h2>

        <div className='grid place-center md:mt-0 mt-4'>
          <Links selectedLib={libType} npmLink={npmLink} className='flex md:mr-2' />
          </div>
      </div>
    </div>
  )
}

export default Header
