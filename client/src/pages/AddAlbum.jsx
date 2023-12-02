import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from "../axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddTrack from "../components/AddTrack/AddTrack";

function AddAlbum() {

  const [addTracks, setAddTracks] = useState([{
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
    axios.get('/api/artist')
      .then(data => {
        shuffleArtists(data.data)

      })
      .catch(err => console.log(err))
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
    setAddTracks(prev => {
      prev[index].title = text
      return [...prev]
    })
  }

  const addTrackArtist = (artist, index) => {
    setAddTracks(prev => {
      for (const art of prev[index].artists)
        if (art.id === artist.id)
          return prev

      prev[index].artists = [...prev[index].artists, artist]
      return [...prev]
    })
  }

  const removeTrackArtist = (artist, index) => {
    setAddTracks(prev => {
      prev[index].artists = prev[index].artists.filter(art => art.id !== artist.id)
      return [...prev]
    })
  }

  const changeTrackImage = (file, index) => {
    setAddTracks(prev => {
      prev[index].imageFile = file
      if (file)
        prev[index].image = URL.createObjectURL(file)
      return [...prev]
    })
  }

  const changeTrackAudio = (file, index) => {
    setAddTracks(prev => {
      prev[index].audio = file
      return [...prev]
    })
  }

  const addTrack = () => {
    const initialTrack = {
      title: '', artists: [], image: undefined, imageFile: undefined, audioFile: undefined,
    }

    setAddTracks(prev => [...prev, initialTrack])
  }

  const removeTrack = (index) => {
    setAddTracks(prev => prev.filter((el, i) => i !== index))
  }

  const sendAlbum = async () => {
    const fd = new FormData()
    fd.append('artists', JSON.stringify(albumArtists))
    fd.append('name', albumTitle)
    fd.append('image', albumImageFile)

    axios.post('/api/album', fd).then((res) => {
      console.log("ALBUM: ")
      console.log(res.data)
      sendTracks(res.data.id)
      alert("Added")
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendTracks = async (album_id) => {
    if (!album_id)
      return;

    for (const track of addTracks) {
      const fd = new FormData()
      fd.append('name', track.title)
      fd.append('artists', JSON.stringify(track.artists))
      fd.append('album_id', album_id)
      fd.append('image', track.imageFile)
      fd.append('audio', track.audio)

      await axios.post('/api/track', fd).then(res => {
        console.log(res)
        console.log("Track Added")
      }).catch(e => console.log(e))
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
    } else {
      setAlbumImageFile(undefined)
      setAlbumImage(undefined)
    }
  }

  return (<>
    <div className='p-3 rounded-3'>
      <h3 className='text-center'>Add Album</h3>
      <form>
        <div className='d-flex'>
          <Button variant="standart" component="label" className='p-0 w-25'>
            <img src={albumImage} alt="" className='object-fit-cover w-100 rounded-2'/>
            <input type="file" accept="image/png, image/jpeg, image/jpg"
                   onChange={selectAlbumImage} hidden/>
          </Button>
          <div className='d-flex flex-column m-2 my-auto w-100'>
            <TextField label='Album title' value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)}
                       color="secondary"/>


            <TextField label='Artist' className='my-2' color="secondary" name='artist' value={artistSearchValue}
                       onChange={(e) => setArtistSearchValue(e.target.value)}
                       onFocus={() => setOnArtistSearchFocused(true)} focused={onArtistSearchFocused}/>

            <div className='d-flex flex-wrap'>
              {
                albumArtists.map(artist => (
                  <button className='delete-artist my-1' key={artist.id} onClick={e => {
                    e.preventDefault()
                    setAlbumArtists(prev => prev.filter(art => art.id !== artist.id))
                  }}>
                    <img src={`http://localhost:5000/${artist.image_url}`} alt="" width={30} height={30} className=''/>
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


            <p className='mx-2'>There is no author? <Link to='/add_author' style={{color: "blue"}}>Add Author</Link>
            </p>
          </div>
        </div>

        {
          addTracks.map((el, index) =>
            <AddTrack track={el} key={index} index={index} artists={artists} changeTitle={changeTrackTitle}
                      addTrackArtist={addTrackArtist} removeTrackArtist={removeTrackArtist}
                      changeImage={changeTrackImage}
                      changeAudio={changeTrackAudio} removeTrack={removeTrack}/>)
        }

        <Button onClick={addTrack}>Add Track</Button>
      </form>
      <Button variant="contained" className='mt-3' onClick={sendAlbum} fullWidth>Send Album</Button>
    </div>
  </>);
}

export default AddAlbum;