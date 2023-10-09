import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './input.scss'

function AddMusic() {
  const [authorSearch, setAuthorSearch] = useState('')
  useEffect(() => {
    //axios.get();
  }, [authorSearch])
  return (
    <>
      <h1>Добавить Трек</h1>
      <form action="">
        <div className='overlay hidden'></div>
        <div className='find-author'>
          <h2>Find Author</h2>
          <input type="text" id='AuthorInput' placeholder="Name"/>
          <div className='hidden search-result'>

          </div>
        </div>
        <input type="text" placeholder="Album title"/>
        <div>
          <h3>Album image</h3>
          <input type="file" accept='image/png, image/jpeg, image/jpg'/>
        </div>
        <input type="text" placeholder='Music title'/>
        <div>
          <h3>Music image</h3>
          <input type="file" accept='image/png, image/jpeg, image/jpg'/>
          <h3>Music file</h3>
          <input type="file" accept='audio/mp3'/>
        </div>
        <button>Sumbit</button>
      </form>
      <p>There is no author? <Link to='/add_author' style={{color: "blue"}}>Add Author</Link></p>
    </>
  );
}

export default AddMusic;