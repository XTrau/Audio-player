import React from 'react'
import {useEffect, useRef, useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Music from './pages/Music'
import Favorite from './pages/Favorite'
import AddAuthor from './pages/AddAuthor'
import AddAlbum from "./pages/AddAlbum";

import {useDispatch, useSelector} from "react-redux";

import axios from './axios'

function App() {
  const [trackList, setTrackList] = useState([])
  const [favoriteList, setFavoriteList] = useState([])

  const [currentList, setCurrentList] = useState([])
  const [trackIndex, setTrackIndex] = useState(0)

  const currentTrack = useSelector(store => store.currentTrack)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const audioRef = useRef()

  useEffect(() => {
    axios.get('/api/track').then(data => {
      console.log(data.data)
      if (data.data) {
        setTrackList(data.data)
        selectTrack(0, data.data)
      }
    })
  }, [])

  useEffect(() => {
    updateTrack()
  }, [currentList, trackIndex])

  async function playTrack() {
    dispatch({type: 'PLAY_TRACK'})
    if (audioRef.current.play !== undefined)
      await audioRef.current.play()
  }

  async function pauseTrack() {
    dispatch({type: 'PAUSE_TRACK'})

    if (audioRef.current.pause !== undefined)
      await audioRef.current.pause()
  }

  const updateTrack = () => {
    dispatch({type: 'CHANGE_TRACK', payload: currentList[trackIndex]})
  }

  function selectTrack(index, list) {
    setCurrentList(list)
    setTrackIndex(index)
    dispatch({type: 'CHANGE_TRACK', payload: currentList[trackIndex]})
  }

  function shuffleTracks(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
    }
    setTrackList(array)
  }

  function toPrevTrack() {
    setTrackIndex(prev => {
      prev--
      if (prev < 0)
        return trackList.length - 1
      return prev
    })
    setTimeout(() => {
      playTrack()
    }, 10)
  }

  function toNextTrack() {
    setTrackIndex(prev => {
      prev++
      if (prev >= currentList.length)
        return 0
      return prev
    })
    setTimeout(() => {
      playTrack()
    }, 10)
  }

  const addToFavorite = (track) => {
    setFavoriteList(prev => [track, ...prev])
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
        <Route path='/add_track' element={<AddAlbum/>}/>
      </Routes>
    </Layout>
  )
}

export default App
