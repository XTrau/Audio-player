import React from 'react'

import Header from '../Header/Header'
import TrackController from "../TrackController/TrackController";

function Layout({children, trackControllerProps}) {
  return (
    <>
      <Header/>


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
