import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from "../axios";
import FormTextInput from "../components/FormInput/FormTextInput";
import FormFileInput from "../components/FormInput/FormFileInput";

function AddMusic() {
  const [authorSearch, setAuthorSearch] = useState('')
  const [authors, setAuthors] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumImage, setAlbumImage] = useState(undefined)
  const [trackTitle, setTrackTitle] = useState('')
  const [trackImage, setTrackImage] = useState(undefined)
  const [trackAudio, setTrackAudio] = useState(undefined)

  useEffect(() => {
    axios.post('/authors', {authorSearch})
      .then(data => {
        setAuthors(data.data)
      })
      .catch(err => console.log(err));
  }, [authorSearch, inputFocused])

  const sendAlbum = async () => {
    const fd = FormData()
    fd.append('author', selectedAuthor)
    fd.append('albumTitle', albumTitle)
    fd.append('albumImage', albumImage)

    axios.post('/add_album', fd).then(() => {
      console.log('Album Added')
    }).catch((err) => {
        console.log(err)
      }
    )
  }

  const clearFields = () => {
    setSelectedAuthor(null)
    setAlbumTitle('')
    setTrackTitle('')
    setAlbumImage(undefined)
    setTrackImage(undefined)
    setTrackAudio(undefined)
  }

  const sendTrack = async () => {
    if (!albumTitle || !selectedAuthor || !albumImage || !trackTitle || !trackImage || !trackAudio) {
      alert("Заполните все поля")
      return
    }

    const fd = new FormData()
    fd.append('author', JSON.stringify(selectedAuthor))
    fd.append('albumTitle', albumTitle)
    fd.append('albumImage', albumImage)
    fd.append('trackTitle', trackTitle)
    fd.append('trackImage', trackImage)
    fd.append('trackFile', trackAudio)

    await axios.post('/add_track', fd).then((res) => {
      console.log('Track Added')
      console.log(res)
    }).catch((err) => {
        console.log(err)
      }
    )
    clearFields()
  }

  const focusOn = () => {
    setInputFocused(true)
  }

  const focusOff = () => {
    setInputFocused(false)
  }

  const selectAuthor = (author) => {
    setSelectedAuthor(author)
    focusOff()
  }

  const unselectAuthor = (e) => {
    e.preventDefault()
    setSelectedAuthor(null)
  }

  return (
    <>
      <h1>Добавить Трек</h1>
      <form action="">
        <div className={`overlay ${inputFocused ? '' : 'hidden'}`} onClick={focusOff}>
        </div>

        <div className='find-author'>
          <h2>Find Author</h2>

          <input type="text" id='author-input'
                 className='text-input'
                 onFocus={focusOn}
                 autoFocus={inputFocused}
                 value={authorSearch}
                 onChange={(e) => setAuthorSearch(e.target.value)}
                 placeholder="Nickname"/>

          <div className={`search-result ${inputFocused ? '' : 'hidden'}`}>
            {authors.length > 0 ? (
              authors.filter(author => author.name.toLowerCase().includes(authorSearch.toLowerCase())).map((author, index) => (
                <div key={index} className='search-item' onClick={() => selectAuthor(author)}>
                  <img src={author.image} className="author-image" alt=""/>
                  <p>{author.name}</p>
                </div>
              ))
            ) : (<></>)}
          </div>
        </div>

        {
          selectedAuthor !== null ? (
              <div className='selected-author'>
                <button className='delete-btn' onClick={unselectAuthor}>x</button>
                <img src={selectedAuthor.image} alt=""/>
                <h3>{selectedAuthor.name}</h3>
              </div>)
            :
            (<></>)
        }

        <div className='checkboxes'>
          <div className="checkbox">
            <input type="checkbox" name='single-track'/>
            <label htmlFor="single-track">Album</label>
          </div>
        </div>

        <FormTextInput title="Album title" value={albumTitle} setValue={setAlbumTitle} placeholder=""/>
        <FormFileInput title="Album image" accept='image/png, image/jpeg, image/jpg' setValue={setAlbumImage}/>
        <FormTextInput title="Track title" value={trackTitle} setValue={setTrackTitle} placeholder=""/>
        <FormFileInput title="Music image" accept='image/png, image/jpeg, image/jpg' setValue={setTrackImage}/>
        <FormFileInput title="Music file" accept='audio/mp3' setValue={setTrackAudio}/>
      </form>

      <button className='submit-btn' onClick={async (e) => {
        e.preventDefault()
        await sendTrack()
      }}>Submit
      </button>

      <p>There is no author? <Link to='/add_author' style={{color: "blue"}}>Add Author</Link></p>
    </>
  );
}

export default AddMusic;