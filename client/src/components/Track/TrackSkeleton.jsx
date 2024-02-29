import React from 'react'
import './Track.scss'
import {Skeleton} from "@mui/material";

function TrackSkeleton() {
  return (
    <li className={'track-wrapper shadow'}>
      <span className='ms-5 me-2'>
        <Skeleton  height={50} width={50}  animation='wave'/>
      </span>
      <div className='track-info'>
        <div className='title'>
          <Skeleton width={120} className={'my-1'} height={20} animation='wave'/>
          <Skeleton width={100} className={'my-1'} height={20} animation='wave'/>
        </div>
      </div>
    </li>
  )
}

export default TrackSkeleton
