import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from "../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddTrack from "../components/AddTrack/AddTrack";

function AddMusic() {
  const [authorSearch, setAuthorSearch] = useState('')

  const [addTracks, setAddTracks] = useState([{
    title: '',
    authors: [''],
    image: undefined,
    imageFile: undefined,
    audio: undefined,
  }])


  const [authors, setAuthors] = useState([]);
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumAuthor, setAlbumAuthor] = useState(null);
  const [albumImageFile, setAlbumImageFile] = useState(undefined)
  const [albumImage, setAlbumImage] = useState(undefined)

  useEffect(() => {
    axios.post('/authors', {authorSearch})
      .then(data => {
        setAuthors(data.data)
      })
      .catch(err => console.log(err));
  }, [])

  const changeTitle = (text, index) => {
    setAddTracks(prev => {
      prev[index].title = text
      return [...prev]
    })
  }

  const changeAuthor = (text, index) => {
    setAddTracks(prev => {
      prev[index].authors[0] = text
      return [...prev]
    })
  }

  const changeImage = (file, index) => {
    setAddTracks(prev => {
      prev[index].imageFile = file
      prev[index].image = URL.createObjectURL(file)
      return [...prev]
    })
  }

  const changeAudio = (file, index) => {
    setAddTracks(prev => {
      prev[index].audio = file
      return [...prev]
    })
  }

  const addTrack = () => {
    const initialTrack = {
      title: '',
      authors: [''],
      image: undefined,
      imageFile: undefined,
      audioFile: undefined,
    }

    setAddTracks(prev => [...prev, initialTrack])
  }

  const removeTrack = (index) => {
    setAddTracks(prev => prev.filter((el, i) => i !== index))
  }

  const sendAlbum = async () => {
    const fd = FormData()
    fd.append('author', albumAuthor)
    fd.append('albumTitle', albumTitle)
    fd.append('albumImageFile', albumImageFile)

    axios.post('/add_album', fd).then(() => {
      console.log('Album Added')
    }).catch((err) => {
      console.log(err)
    })
  }

  const clearFields = () => {
    const initialTrack = {
      title: '',
      authors: [''],
      image: undefined,
      imageFile: undefined,
      audioFile: undefined,
    }

    setAlbumAuthor(null)
    setAlbumTitle('')
    setAlbumImageFile(undefined)
  }

  const sendTrack = (e) => {
    e.preventDefault()
    if (!albumTitle || !albumAuthor || !albumImageFile) {
      alert("Заполните все поля")
      return
    }

    const fd = new FormData()
    fd.append('author', JSON.stringify(albumAuthor))
    fd.append('albumTitle', albumTitle)
    fd.append('albumImageFile', albumImageFile)

    axios.post('/add_track', fd).then((res) => {
      alert('Track Added')
    }).catch((err) => {
      console.log(err)
    })
    clearFields()
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

  return (
    <>
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
              <TextField label='Authors' className='my-2' color="secondary"/>
              <p className='mx-2'>There is no author? <Link to='/add_author' style={{color: "blue"}}>Add Author</Link>
              </p>
            </div>
          </div>

          {
            addTracks.map((el, index) => <AddTrack track={el} key={index} index={index} changeTitle={changeTitle}
                                                   changeAuthors={changeAuthor} changeImage={changeImage} changeAudio={changeAudio} removeTrack={removeTrack}/>)
          }

          <Button onClick={addTrack}>Add Track</Button>
        </form>
        <Button variant="contained" className='mt-3' fullWidth>Send Album</Button>
      </div>

      {/*<form className={'user-select-none'}>*/
      }
      {/*  <div className={`overlay ${inputFocused ? '' : 'hidden'}`} onClick={focusOff}/>*/
      }
      {/*  <h2 className='text-center'>Find Author</h2>*/
      }
      {/*  <div className='find-author'>*/
      }
      {/*    <TextField type="text" style={{zIndex: 2}} label="Nickname" value={authorSearch}*/
      }
      {/*               onChange={(e) => setAuthorSearch(e.target.value)} onFocus={focusOn} autoFocus={inputFocused}*/
      }
      {/*               fullWidth/>*/
      }

      {/*    <div className={`search-result ${inputFocused ? '' : 'hidden'}`}>*/
      }
      {/*      {authors.length > 0 ? (*/
      }
      {/*        authors.filter(author => author.name.toLowerCase().includes(authorSearch.toLowerCase())).map((author, index) => (*/
      }
      {/*          <div key={index} className='search-item' onClick={() => selectAuthor(author)}>*/
      }
      {/*            <img src={author.image} className="author-image" alt=""/>*/
      }
      {/*            <p>{author.name}</p>*/
      }
      {/*          </div>*/
      }
      {/*        ))*/
      }
      {/*      ) : (<></>)}*/
      }
      {/*    </div>*/
      }
      {/*  </div>*/
      }
      {/*  {*/
      }
      {/*    albumAuthor !== null ? (*/
      }
      {/*        <div className='d-flex bg-white position-relative rounded-3 overflow-hidden'>*/
      }
      {/*          <button className='btn btn-close position-absolute r-5 t-4' onClick={unselectAuthor}></button>*/
      }
      {/*          <img src={albumAuthor.image} height={80} alt=""/>*/
      }
      {/*          <h3 className="mx-2 my-2">{albumAuthor.name}</h3>*/
      }
      {/*        </div>)*/
      }
      {/*      :*/
      }
      {/*      (<></>)*/
      }
      {/*  }*/
      }
      {/*</form>*/
      }
    </>
  );
}

export default AddMusic;