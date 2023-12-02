import React, {useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function AddTrack({
                    track,
                    artists,
                    index,
                    changeTitle,
                    addTrackArtist,
                    removeTrackArtist,
                    changeImage,
                    changeAudio,
                    removeTrack
                  }) {
  const [artistSearchValue, setArtistSearchValue] = useState('')
  const [onArtistSearchFocused, setOnArtistSearchFocused] = useState()
  return (
    <div className='d-flex align-items-center px-2 m-2'>
      <Button variant="standart" component="label" className='p-0'>
        <img src={track.image} alt="" width={140} height={140} className='object-fit-cover rounded-2'/>
        <input type="file" accept="image/png, image/jpeg, image/jpg"
               onChange={(e) => changeImage(e.target.files[0], index)} hidden/>
      </Button>
      <div className='d-flex flex-column w-100 m-3'>
        <TextField label='Track title' size='small' value={track.title}
                   onChange={(e) => changeTitle(e.target.value, index)}/>
        <TextField label='Artists' size='small' value={artistSearchValue}
                   onChange={(e) => setArtistSearchValue(e.target.value)}
                   onFocus={() => setOnArtistSearchFocused(true)} className='my-2'/>

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
                    addTrackArtist(artist, index)
                  }}>
                    <img className='artist-search-result__image rounded-2'
                         src={`http://localhost:5000/${artist.image_url}`} alt=""/>
                    <h4 className='mx-2'>{artist.name}</h4>
                  </li>))}
              </ul>
            )
          }
        </div>

        <div className='d-flex flex-wrap'>
          {
            track.artists.map(artist => (
              <button className='delete-artist my-1' onClick={e => {
                e.preventDefault()
                removeTrackArtist(artist, index)
              }}>
                <img src={`http://localhost:5000/${artist.image_url}`} alt="" width={30} height={30} className=''/>
                <span className='mx-2'>{artist.name}</span>
                <span className='mx-sm-1'>&#10006;</span>
              </button>))
          }
        </div>


        <div className='d-flex align-items-center'>
          <Button variant="contained" component="label" className='me-2'>
            Add Music file
            <input type="file" accept="audio/mp3" onChange={(e) => changeAudio(e.target.files[0], index)} hidden/>
          </Button>
          {track.audio ? <p className='m-0'>File added! {track.audio.name}</p> : <></>}

          <Button onClick={() => removeTrack(index)}>Remove</Button>
        </div>
      </div>
    </div>
  );
}

export default AddTrack;