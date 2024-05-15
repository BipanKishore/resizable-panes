import React from 'react'
import {GITHUB_URL, NPM_URL} from './constant'
import {Icon} from '../icon'

export const Links = ({className}: any) => {
  return (
    <div className={`justify-self-end self-center ${className}`}>
      <Icon name='npm' url={NPM_URL}  />
      <Icon name='github' url={GITHUB_URL}  />
      {/* <Icon name='linkedin' url={LINKEDIN}  /> */}
    </div>
  )
}
