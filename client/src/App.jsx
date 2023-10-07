import {useEffect, useRef, useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Music from './pages/Music'
import Favorite from './pages/Favorite'
import About from './pages/About'

function App() {
  const [trackList, setTrackList] = useState([{
    id: 0,
    title: 'Stan',
    authors: 'Eminem, Dido',
    image: '/authors/Eminem/Curtain Call The Hits/Curtain_Call_The_Hits.jpg',
    audio: '/authors/Eminem/Curtain Call The Hits/Eminem_Dido_-_Stan.mp3'
  }, {
    id: 1,
    title: 'Mockingbird',
    authors: 'Eminem',
    image: '/authors/Eminem/Curtain Call The Hits/Curtain_Call_The_Hits.jpg',
    audio: '/authors/Eminem/Curtain Call The Hits/Eminem_-_Mockingbird.mp3'
  }, {
    id: 2,
    title: 'The Real Slim Shady',
    authors: 'Eminem',
    image: '/authors/Eminem/Curtain Call The Hits/Curtain_Call_The_Hits.jpg',
    audio: '/authors/Eminem/Curtain Call The Hits/Eminem_-_The_Real_Slim_Shady.mp3'
  }])
  const [favoriteList, setFavoriteList] = useState([])

  const [nextTracks, setNextTracks] = useState([])
  const [prevTracks, setPrevTracks] = useState([])

  const [search, setSearch] = useState('')
  const [currentTrack, setCurrentTrack] = useState({
    id: -1,
    title: 'Loading...',
    authors: 'Loading...',
    image: '',
    audio: ''
  })
  const [paused, setPaused] = useState(true)

  const audioRef = useRef()

  function playTrack() {
    setPaused(false)
    audioRef.current.play()
  }

  function pauseTrack() {
    setPaused(true)
    audioRef.current.pause()
  }

  function selectTrack(track) {
    const newNextList = []
    const newPrevList = []
    let prevEnded = false
    for (let el of trackList) {
      if (el.title === track.title) {
        prevEnded = true
        continue
      }

      if (prevEnded) newNextList.push(el)
      else newPrevList.push(el)
    }

    setCurrentTrack(track)
    setNextTracks(newNextList)
    setPrevTracks(newPrevList)

    setTimeout(() => playTrack(), 0)
  }

  function toPrevTrack() {
    if (prevTracks.length === 0) {
      selectTrack(trackList[trackList.length - 1])
      setTimeout(() => playTrack(), 0)
      return
    }
    const newNextList = nextTracks
    const newPrevList = prevTracks
    setCurrentTrack(prevTracks[prevTracks.length - 1])
    newNextList.unshift(currentTrack)
    newPrevList.pop()
    setNextTracks(newNextList)
    setPrevTracks(newPrevList)

    setTimeout(() => playTrack(), 0)
  }

  function toNextTrack() {
    if (nextTracks.length === 0) {
      selectTrack(trackList[0])
      return
    }

    const newNextList = nextTracks
    const newPrevList = prevTracks
    setCurrentTrack(nextTracks[0])
    newNextList.shift()
    newPrevList.push(currentTrack)
    setNextTracks(newNextList)
    setPrevTracks(newPrevList)

    setTimeout(() => playTrack(), 0)
  }

  return (
    <Layout trackControllerProps={{currentTrack, audioRef, toPrevTrack, toNextTrack, paused, playTrack, pauseTrack}}>
      <Routes>
        <Route
          path='/'
          element={
            <Music
              trackList={trackList}
              search={search}
              selectTrack={selectTrack}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              audioRef={audioRef}
              currentTrack={currentTrack}
              paused={paused}
            />
          }
        />
        <Route
          path='/favorite'
          element={
            <Favorite
              favoriteList={favoriteList}
              search={search}
              selectTrack={selectTrack}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              audioRef={audioRef}
              currentTrack={currentTrack}
              paused={paused}
            />
          }
        />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Layout>
  )
}

export default App
