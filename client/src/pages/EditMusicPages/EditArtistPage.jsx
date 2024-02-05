import React, {useEffect, useState} from 'react';
import axios from "../../axios";

function EditArtistPage(props) {
  const [artists, setArtists] = useState()
  useEffect(() => {
    axios.get('api/artist').then(data => {
      setArtists(data.data)
    })
  })
  return (
    <div className='wrapper'></div>

  );
}

export default EditArtistPage;