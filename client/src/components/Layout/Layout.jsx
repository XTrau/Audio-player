import React, {useContext, useState} from 'react'

import Header from '../Header/Header'
import TrackController from "../TrackController/TrackController";

function Layout({children}) {
  return (
    <>
      <Header/>

      <main>
        <div className='container'>
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
