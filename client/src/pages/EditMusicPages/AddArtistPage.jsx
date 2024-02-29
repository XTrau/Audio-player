import React, {useState} from 'react';
import axios from "../../axios";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import artistFetcher from "../../dataFetchers/artist.fetcher";


function AddArtistPage() {
  const [artistName, setArtistName] = useState('')
  const [artistImageFile, setArtistImageFile] = useState(null)
  const [artistImage, setArtistImage] = useState(null)
  const sendArtist = (e) => {
    e.preventDefault()
    if (artistName.trim() === '' || artistImageFile === null) {
      alert("Заполнены не все поля")
      return
    }

    const artist = {
      name: artistName.trim(), image: artistImageFile
    }

    artistFetcher.create(artist).then(() => {
      alert('Added');
    }).catch((e) => {
      alert('Error')
    })

    setArtistName('')
    setArtistImageFile(null)
    setArtistImage(null)
  }

  const uploadImage = (e) => {
    setArtistImageFile(e.target.files[0])
    if (e.target.files[0]) setArtistImage(URL.createObjectURL(e.target.files[0]))
  }

  return (<div className='wrapper'>
      <h1 className="text-center h2">Add Artist</h1>
      <div className='d-flex justify-content-between'>
        <div className='d-flex flex-column justify-content-around w-100'>
          <TextField label="Artist Name" value={artistName} className='mb-2'
                     onChange={(e) => setArtistName(e.target.value)} autoComplete='off'/>
          <Button variant="contained" component="label" className="mb-2">
            Change Artist Image
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={uploadImage} hidden/>
          </Button>
          <Button variant="contained" className="mb-2" onClick={sendArtist}>Send Artist</Button>
        </div>
        <div
          className={`${artistImage && artistImageFile ? '' : 'd-none'} d-flex justify-content-center align-items-center mx-2 rounded-3 border w-25 overflow-hidden  border-1 border-black p-1`}>
          <img src={artistImage} className="w-100 object-fit-cover" alt={''}/>
        </div>
      </div>
    </div>);
}

export default AddArtistPage