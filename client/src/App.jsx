import React, {useState, useEffect, useRef} from 'react'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Music from './pages/Music'
import Favorite from './pages/Favorite'
import AddArtist from './pages/AddAuthor'
import AddAlbum from "./pages/AddAlbum";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";

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

  const [artistListStatus, setArtistListStatus] = useState({x: 0, y: 0, hidden: true, artists: []})

  useEffect(() => {
    axios.get('/api/track').then(data => {
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
    if (audioRef.current.play === undefined) return
    dispatch({type: 'PLAY_TRACK'})
    await audioRef.current.play()
  }

  async function pauseTrack() {
    if (audioRef.current.pause === undefined) return
    dispatch({type: 'PAUSE_TRACK'})
    await audioRef.current.pause()

  }

  const updateTrack = () => {
    if (currentList[trackIndex]) dispatch({type: 'CHANGE_TRACK', payload: currentList[trackIndex]})
  }

  function selectTrack(index, list) {
    setCurrentList(list)
    setTrackIndex(index)
    dispatch({type: 'CHANGE_TRACK', payload: list[index]})
  }

  function shuffleTracks(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    for (const index in array) {
      if (array[index].id === currentTrack.id) {
        selectTrack(index, array)
        return;
      }
    }
  }

  function toPrevTrack() {
    setTrackIndex(prev => {
      prev--
      if (prev < 0) return trackList.length - 1
      return prev
    })
    setTimeout(() => {
      playTrack()
    }, 10)
  }

  function toNextTrack() {
    setTrackIndex(prev => {
      prev++
      if (prev >= currentList.length) return 0
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
    setFavoriteList(prev => prev.filter(el => el.id !== track.id))
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
              shuffleTracks={shuffleTracks}
              selectTrack={selectTrack}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              audioRef={audioRef}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
            />}
        />
        <Route
          path='/favorite'
          element={
            <Favorite
              favoriteList={favoriteList}
              search={search}
              selectTrack={selectTrack}
              playTrack={playTrack}
              shuffleTracks={shuffleTracks}
              pauseTrack={pauseTrack}
              audioRef={audioRef}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
            />}
        />
        <Route path='/add_artist' element={<AddArtist/>}/>
        <Route path='/add_track' element={<AddAlbum/>}/>
        <Route path='/artist/:name/:id' element={
          <ArtistPage
            favoriteList={favoriteList}
            selectTrack={selectTrack}
            playTrack={playTrack}
            pauseTrack={pauseTrack}
            audioRef={audioRef}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
          />}/>
        <Route path='/album/:name/:id' element={
          <AlbumPage
            favoriteList={favoriteList}
            selectTrack={selectTrack}
            playTrack={playTrack}
            pauseTrack={pauseTrack}
            audioRef={audioRef}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
          />}/>
      </Routes>
    </Layout>)
}

export default App
