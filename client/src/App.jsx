import {useEffect, useRef, useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Music from './pages/Music'
import Favorite from './pages/Favorite'
import AddAuthor from './pages/AddAuthor'
import AddMusic from "./pages/AddMusic";

import {useDispatch, useSelector} from "react-redux";

import axios from './axios'

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

  const currentTrack = useSelector(store => store.currentTrack)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const audioRef = useRef()

  useEffect(() => {
    //axios.get('/').then(data => console.log(data.data))
    selectTrack(trackList[0], trackList)
  }, [])

  function playTrack() {
    dispatch({type: 'PLAY_TRACK'})
    audioRef.current.play()
  }

  function pauseTrack() {
    dispatch({type: 'PAUSE_TRACK'})
    audioRef.current.pause()
  }

  function selectTrack(track, list) {
    const newNextList = []
    const newPrevList = []
    let center = false
    for (const el of list) {
      if (el === track)
        center = true
      else if (!center)
        newPrevList.push(el)
      else
        newNextList.push(el)
    }

    dispatch({type: 'CHANGE_TRACK', payload: track})
    setNextTracks(newNextList)
    setPrevTracks(newPrevList)
  }

  function toPrevTrack() {
    if (prevTracks.length === 0) {
      const newPrevList = [currentTrack, ...nextTracks]
      newPrevList.pop()
      setPrevTracks(newPrevList)
      dispatch({type: 'CHANGE_TRACK', payload: nextTracks[nextTracks.length - 1]})
      setNextTracks([])

      setTimeout(() => playTrack(), 0)
      return
    }

    const newPrevList = [...prevTracks]
    const newNextList = [currentTrack, ...nextTracks]
    dispatch({type: 'CHANGE_TRACK', payload: prevTracks[prevTracks.length - 1]})
    newPrevList.pop()

    setPrevTracks(newPrevList)
    setNextTracks(newNextList)

    setTimeout(() => playTrack(), 0)
  }

  function toNextTrack() {
    if (nextTracks.length === 0) {
      const newNextList = [...prevTracks, currentTrack]
      newNextList.shift()
      setNextTracks(newNextList)
      dispatch({type: 'CHANGE_TRACK', payload: prevTracks[0]})
      setPrevTracks([])

      setTimeout(() => playTrack(), 0)
      return
    }

    const newPrevList = [...prevTracks, currentTrack]
    const newNextList = [...nextTracks]
    dispatch({type: 'CHANGE_TRACK', payload: nextTracks[0]})
    newNextList.shift()

    setPrevTracks(newPrevList)
    setNextTracks(newNextList)

    setTimeout(() => playTrack(), 0)
  }

  const addToFavorite = (track) => {
    setFavoriteList(prev => [...prev, track])
  }

  const removeFromFavorite = (track) => {
    setFavoriteList(prev => prev.filter(el => el !== track))
  }

  return (
    <Layout trackControllerProps={{audioRef, toPrevTrack, toNextTrack, playTrack, pauseTrack}}
            headerProps={{search, setSearch}}>
      <Routes>
        <Route
          path='/'
          element={
            <Music
              trackList={trackList}
              favoriteList={favoriteList}
              search={search}
              selectTrack={selectTrack}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              audioRef={audioRef}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
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
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
            />
          }
        />
        <Route path='/add_author' element={<AddAuthor/>}/>
        <Route path='/add_track' element={<AddMusic/>}/>
      </Routes>
    </Layout>
  )
}

export default App
