import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from "../axios";
import './addPages.scss'


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
  }, [authorSearch])

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

  const sendTrack = async (e) => {
    e.preventDefault()

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

    axios.post('/add_track', fd).then(() => {
      console.log('Track Added')
    }).catch((err) => {
        console.log(err)
      }
    )
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
                 placeholder="Name"/>

          <div className={`search-result ${inputFocused ? '' : 'hidden'}`}>
            {authors.length > 0 ? (
              authors.filter(author => author.name.toLowerCase().includes(authorSearch.toLowerCase())).map((author, index) => (
                <div key={index} className='search-item' onClick={() => selectAuthor(author)}>
                  <img src={author.image} alt=""/>
                  <p>{author.name}</p>
                </div>
              ))
            ) : (<></>)}
          </div>
        </div>

        {selectedAuthor !== null ? (
            <div className='selected-author'>
              <button className='delete-btn' onClick={unselectAuthor}>x</button>
              <img src={selectedAuthor.image} alt=""/>
              <h3>{selectedAuthor.name}</h3>
            </div>)
          :
          (<></>)}

        <div className='checkboxes'>
          <div className="checkbox">
            <input type="checkbox" name='single-track'/>
            <label htmlFor="single-track">Album</label>
          </div>
        </div>

        <input type="text" value={albumTitle} className='text-input' onChange={e => setAlbumTitle(e.target.value)}
               placeholder="Album title"/>
        <div>
          <h3>Album image</h3>
          <input type="file" accept='image/png, image/jpeg, image/jpg'
                 onChange={e => setAlbumImage(e.target.files[0])}/>
        </div>

        <input type="text" className='text-input' value={trackTitle} onChange={e => setTrackTitle(e.target.value)}
               placeholder='Music title'/>
        <div>
          <h3>Music image</h3>
          <input type="file" onChange={e => setTrackImage(e.target.files[0])}
                 accept='image/png, image/jpeg, image/jpg'/>
          <h3>Music file</h3>
          <input type="file" onChange={e => setTrackAudio(e.target.files[0])} accept='audio/mp3'/>
        </div>

        <button onClick={sendTrack}>Submit</button>
      </form>
      <p>There is no author? <Link to='/add_author' style={{color: "blue"}}>Add Author</Link></p>
    </>
  );
}

export default AddMusic;