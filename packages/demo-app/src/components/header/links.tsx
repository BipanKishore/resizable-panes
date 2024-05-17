import React, { Fragment } from 'react'
import { GITHUB_URL } from './constant'
import { Icon } from '../icon'
import { joinClassName } from '../../shared/utils'

export const LibIcons = (props: any) => {
  const { libName, selectedLib } = props

  const className = joinClassName({
    'ml-4 pb-1 md:block hidden ': true,
    'border-b-2 border-red-500 ': selectedLib === libName
  })
  
  return (
    <Fragment>
      <Icon className={className} width={24} name={libName} url={GITHUB_URL} />
    </Fragment>
  )
}

export const Links = ({ className, npmLink, selectedLib }: any) => {
  return (
    <div className={`md:justify-self-end justify-self-center self-center ${className}`}>
      <LibIcons selectedLib={selectedLib} libName='react' />
      <LibIcons selectedLib={selectedLib} libName='js' />
      <LibIcons selectedLib={selectedLib} libName='next' />
      <div className='border-l ml-4 border-slate-400 md:block hidden '></div>
      <Icon className='ml-4 pb-1' width={24} name='npm' url={npmLink} />
      <Icon className='ml-4 pb-1' width={24} name='github' url={GITHUB_URL} />
      {/* <Icon name='linkedin' url={LINKEDIN}  /> */}
    </div>
  )
}
