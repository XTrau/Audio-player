import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import environment from "../../environment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import artistFetcher from "../../dataFetchers/artist.fetcher";

function EditArtistPage() {
  const params = useParams()
  const id = params.id

  const [artistName, setArtistName] = useState('')
  const [artistImgUrl, setArtistImgUrl] = useState('')
  const [artistImageFile, setArtistImageFile] = useState(null)
  const [artistImage, setArtistImage] = useState(null)

  useEffect(() => {
    artistFetcher.getOne(id).then(artist => {
      setArtistName(artist.name)
      setArtistImgUrl(artist.image_url)
    })
  }, [])

  const uploadImage = (e) => {
    setArtistImageFile(e.target.files[0])
    if (e.target.files[0])
      setArtistImage(URL.createObjectURL(e.target.files[0]))
  }

  const sendArtist = (e) => {
    e.preventDefault()
    if (artistName.trim() === '') {
      alert("Имя артиста не может быть пустым")
      return
    }

    const artist = {
      id: id,
      name: artistName.trim(),
      image: artistImageFile
    }

    artistFetcher.update(artist).then(() => {
      alert("Updated")
    }).catch(() => {
      alert("Error")
    })
  }

  return (
    <div className='wrapper'>
      <h1 className="text-center h2">Edit Artist</h1>
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
          className={`d-flex justify-content-center align-items-center mx-2 rounded-3 border w-25 overflow-hidden  border-1 border-black p-1`}>
          <img src={!artistImage || !artistImageFile ? `${environment.API_URL}/${artistImgUrl}` : artistImage}
               className="w-100 object-fit-cover" alt={''}/>
        </div>
      </div>
    </div>
  );
}

export default EditArtistPage;