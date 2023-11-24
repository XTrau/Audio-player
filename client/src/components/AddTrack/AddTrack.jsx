import React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function AddTrack({track, index, changeTitle, changeAuthors, changeImage, changeAudio, removeTrack}) {
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
          <TextField label='Authors' size='small' value={track.authors}
                     onChange={(e) => changeAuthors(e.target.value, index)} className='my-2'/>
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