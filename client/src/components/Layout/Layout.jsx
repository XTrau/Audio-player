import React, {useContext, useState} from 'react'

import Header from '../Header/Header'
import TrackController from "../TrackController/TrackController";

function Layout({children, headerProps}) {
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

      <TrackController/>
    </>
  )
}

export default Layout
