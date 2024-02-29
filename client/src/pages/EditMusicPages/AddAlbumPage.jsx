import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TrackToAdd from "../../components/AddTrack/TrackToAdd";
import environment from "../../environment";
import artistFetcher from "../../dataFetchers/artist.fetcher";
import albumFetcher from "../../dataFetchers/album.fetcher";
import trackFetcher from "../../dataFetchers/track.fetcher";

function AddAlbumPage() {
  const [tracksToAdd, setTracksToAdd] = useState([{
    title: '', artists: [], image: undefined, imageFile: undefined, audio: undefined,
  }])

  const [artistSearchValue, setArtistSearchValue] = useState('')
  const [artists, setArtists] = useState([])
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumArtists, setAlbumArtists] = useState([])
  const [albumImageFile, setAlbumImageFile] = useState(undefined)
  const [albumImage, setAlbumImage] = useState(undefined)

  const [onArtistSearchFocused, setOnArtistSearchFocused] = useState(false)

  useEffect(() => {
    artistFetcher.getAll().then(artists => {
      setArtists(artists)
    }).catch(err => console.log(err))
  }, [])

  const shuffleArtists = (array) => {
    let currentIndex = array.length
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
    }
    setArtists(array)
  }

  const addAlbumArtist = (artist) => {
    setAlbumArtists(prev => {
      for (const art of prev) if (art.id === artist.id) return [...prev]
      return [...prev, artist]
    })
  }

  const changeTrackTitle = (text, index) => {
    setTracksToAdd(prev => {
      prev[index].title = text
      return [...prev]
    })
  }

  const addTrackArtist = (artist, index) => {
    setTracksToAdd(prev => {
      for (const art of prev[index].artists)
        if (art.id === artist.id)
          return prev

      prev[index].artists = [...prev[index].artists, artist]
      return [...prev]
    })
  }

  const removeTrackArtist = (artist, index) => {
    setTracksToAdd(prev => {
      prev[index].artists = prev[index].artists.filter(art => art.id !== artist.id)
      return [...prev]
    })
  }

  const changeTrackImage = (file, index) => {
    setTracksToAdd(prev => {
      if (file) {
        prev[index].imageFile = file
        prev[index].image = URL.createObjectURL(file)
      }
      return [...prev]
    })
  }

  const changeTrackAudio = (file, index) => {
    setTracksToAdd(prev => {
      prev[index].audio = file
      return [...prev]
    })
  }

  const addTrack = () => {
    const initialTrack = {
      title: '', artists: [], image: undefined, imageFile: undefined, audioFile: undefined,
    }

    setTracksToAdd(prev => [...prev, initialTrack])
  }

  const removeTrack = (index) => {
    setTracksToAdd(prev => prev.filter((el, i) => i !== index))
  }

  const sendAlbum = async () => {
    if (!albumTitle || albumArtists.length === 0 || !albumImageFile) {
      alert("Заполните все поля")
      return;
    }

    for (const track of tracksToAdd) {
      if (!track.title || !track.audio || !track.imageFile || track.artists.length === 0) {
        alert("Заполните все поля")
        return;
      }
    }

    const album = {
      artists: JSON.stringify(albumArtists),
      title: albumTitle,
      image: albumImageFile
    }

    albumFetcher.create(album).then((album) => {
      sendTracks(album.id)
      alert("Added")
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendTracks = async (album_id) => {
    if (!album_id)
      return;

    for (const track of tracksToAdd) {
      const newTrack = {
        title: track.title,
        artists: JSON.stringify(track.artists),
        image: track.imageFile,
        album_id: album_id,
        audio: track.audio
      }

      await trackFetcher.create(newTrack)
    }
  }

  const clearFields = () => {
    const initialTrack = {
      title: '', artists: [''], image: undefined, imageFile: undefined, audioFile: undefined,
    }

    setAlbumArtists(null)
    setAlbumTitle('')
    setAlbumImageFile(undefined)
  }

  const selectAlbumImage = (e) => {
    if (e.target.files[0]) {
      setAlbumImageFile(e.target.files[0])
      setAlbumImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className='wrapper'>
      <div className='rounded-3'>
        <h1 className='text-center h2'>Add Album</h1>
        <form className='p-2'>
          <div className='d-flex'>
            <Button variant="standart" component="label" className='p-0'>
              <img src={albumImage} alt="" width={230} height={230} className='img-fluid'/>
              <input type="file" accept="image/png, image/jpeg, image/jpg"
                     onChange={selectAlbumImage} hidden/>
            </Button>
            <div className='d-flex flex-column m-2 my-auto w-100'>
              <TextField
                label='Album title'
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                color="secondary"
                autoComplete='off'
              />


              <TextField
                className='my-2'
                color="secondary"
                label='Artist'
                name='artist'
                value={artistSearchValue}
                onChange={(e) => setArtistSearchValue(e.target.value)}
                onFocus={() => setOnArtistSearchFocused(true)} focused={onArtistSearchFocused}
                autoComplete='off'
              />

              <div className='d-flex flex-wrap'>
                {
                  albumArtists.map(artist => (
                    <button className='delete-artist my-1' key={artist.id} onClick={e => {
                      e.preventDefault()
                      setAlbumArtists(prev => prev.filter(art => art.id !== artist.id))
                    }}>
                      <img src={`${environment.API_URL}/${artist.image_url}`} alt="" width={30} height={30}
                           className=''/>
                      <span className='mx-2'>{artist.name}</span>
                      <span className='mx-sm-1'>&#10006;</span>
                    </button>))
                }
              </div>

              {
                onArtistSearchFocused &&
                (
                  <div className='overlay position-fixed t-0 l-0 w-100 h-100 bg-black bg-opacity-50'
                       onClick={() => setOnArtistSearchFocused(false)}>
                  </div>
                )
              }

              <div className='position-relative'>
                {
                  onArtistSearchFocused && (
                    <ul className='artist-search-result position-absolute bg-white m-0 p-0 w-100'>
                      {artists.filter(artist => artist.name.toLocaleLowerCase().includes(artistSearchValue.toLocaleLowerCase())).map((artist) => (
                        <li className='pointer-event p-1' key={artist.id} onClick={() => {
                          setOnArtistSearchFocused(false)
                          addAlbumArtist(artist)
                        }}>
                          <img className='artist-search-result__image rounded-2'
                               src={`http://localhost:5000/${artist.image_url}`} alt=""/>
                          <h4 className='mx-2'>{artist.name}</h4>
                        </li>))}
                    </ul>
                  )
                }
              </div>
              <p className='mx-2'>There is no artist? <Link to='/add_artist' style={{color: "blue"}}>Add Artist</Link>
              </p>
            </div>
          </div>

          {
            tracksToAdd.map((el, index) =>
              <TrackToAdd track={el}
                          key={index}
                          index={index}
                          artists={artists}
                          changeTitle={changeTrackTitle}
                          addTrackArtist={addTrackArtist}
                          removeTrackArtist={removeTrackArtist}
                          changeImage={changeTrackImage}
                          changeAudio={changeTrackAudio}
                          removeTrack={removeTrack}
              />)
          }

          <Button onClick={addTrack}>Add Track</Button>
        </form>
        <Button variant="contained" className='mt-3' onClick={sendAlbum} fullWidth>Send Album</Button>
      </div>
    </div>);
}

export default AddAlbumPage;