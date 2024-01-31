import React, {useState, useEffect, useRef, createContext, useMemo} from 'react'
import {Routes, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Music from './pages/Music'
import Favorite from './pages/Favorite'
import AddArtist from './pages/AddArtist'
import AddAlbumPage from "./pages/AddAlbumPage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";

import {useDispatch, useSelector} from "react-redux";

import axios from './axios'

import {changeTrackList, changeTrackIndex, playTrack, pauseTrack} from "./store/slices/currentTrackSlice";

function App() {
  const currentTrack = useSelector(store => store.currentTrack.track)
  const [favoriteList, setFavoriteList] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/api/track').then(data => {
      if (data.data) {
        selectTrack(0, data.data)
      }
    })
  }, [])

  function selectTrack(index, list) {
    dispatch(changeTrackList(list))
    dispatch(changeTrackIndex(index))
  }

  function shuffleTracks(array) {
    let currentIndex = array.length
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex--)
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    for (const index in array) {
      if (array[index].id === currentTrack.id) {
        selectTrack(index, array)
        return;
      }
    }
  }

  const addToFavorite = (track) => {
    setFavoriteList(prev => [track, ...prev])
  }

  const removeFromFavorite = (track) => {
    setFavoriteList(prev => prev.filter(el => el.id !== track.id))
  }

  return (
    <Layout headerProps={{search, setSearch}}>
      <Routes>
        <Route
          path='/'
          element={
            <Music
              favoriteList={favoriteList}
              search={search}
              shuffleTracks={shuffleTracks}
              selectTrack={selectTrack}
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
              shuffleTracks={shuffleTracks}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
            />}
        />
        <Route path='/add_artist' element={<AddArtist/>}/>
        <Route path='/add_track' element={<AddAlbumPage/>}/>
        <Route path='/artist/:name/:id' element={
          <ArtistPage
            favoriteList={favoriteList}
            selectTrack={selectTrack}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
          />}/>
        <Route path='/album/:name/:id' element={
          <AlbumPage
            favoriteList={favoriteList}
            selectTrack={selectTrack}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
          />}/>
      </Routes>
    </Layout>
  )
}

export default App
