import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";

import Layout from './components/Layout/Layout'

import MusicPage from './pages/MusicPages/Music'
import FavoritePage from './pages/MusicPages/Favorite'
import AddArtistPage from './pages/EditMusicPages/AddArtistPage'
import AddAlbumPage from "./pages/EditMusicPages/AddAlbumPage";
import ArtistPage from "./pages/MusicPages/ArtistPage";
import AlbumPage from "./pages/MusicPages/AlbumPage";
import RegistrationPage from './pages/LoginPages/RegistrationPage'
import LoginPage from "./pages/LoginPages/LoginPage";
import EditArtistPage from "./pages/EditMusicPages/EditArtistPage";
import EditTrackPage from "./pages/EditMusicPages/EditTrackPage";

import axios from './axios'

import {changeTrackList, changeTrackIndex, changeFullTrackList} from "./store/slices/currentTrackSlice";

function App() {
  const currentTrack = useSelector(store => store.currentTrack.track)
  const [favoriteList, setFavoriteList] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/api/track').then(data => {
      if (data.data) {
        shuffleArray(data.data)
        dispatch(changeFullTrackList(data.data))
        dispatch(changeTrackList(data.data))
      }
    }).catch(e => {
      console.error(e)
    })
  }, [])

  function selectTrack(index, list) {
    dispatch(changeTrackList(list))
    dispatch(changeTrackIndex(index))
  }

  function shuffleArray(array) {
    let currentIndex = array.length
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  function shuffleTracks(array) {
    const arr = shuffleArray([...array])
    for (const index in arr) {
      if (arr[index].id === currentTrack.id) {
        dispatch(changeFullTrackList(arr))
        dispatch(changeTrackList(arr))
        dispatch(changeTrackIndex(index))
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
            <MusicPage
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
            <FavoritePage
              favoriteList={favoriteList}
              search={search}
              selectTrack={selectTrack}
              shuffleTracks={shuffleTracks}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
            />}
        />
        <Route path='/add_artist' element={<AddArtistPage/>}/>
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
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/edit_artist' element={<EditArtistPage/>}/>
        <Route path='/edit_track' element={<EditTrackPage/>}/>
      </Routes>
    </Layout>
  )
}

export default App
