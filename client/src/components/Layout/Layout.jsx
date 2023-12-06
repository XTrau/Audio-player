import React, {useState} from 'react'

import Header from '../Header/Header'
import TrackController from "../TrackController/TrackController";

function Layout({children, trackControllerProps, headerProps}) {
  return (
    <>
      <Header headerProps={headerProps}/>

      <main>
        <div className='wrapper'>
          {children}
        </div>
      </main>

      <footer>

      </footer>

      <TrackController trackControllerProps={trackControllerProps}/>
    </>
  )
}

export default Layout
