import React, {useEffect, useState} from 'react';
import axios from "../axios";
import './input.scss'

function AddAuthor() {
  const [authorName, setAuthorName] = useState('')
  const [authorImage, setAuthorImage] = useState(null)

  const uploadAuthor = (e) => {
    if (authorName.trim() === '' || authorImage === null) {
      alert("Заполните все поля")
      return
    }

    const fd = new FormData()
    fd.append('image', authorImage)
    fd.append('name', authorName.trim())
    console.log(fd)

    axios.post('/add_author', fd).then(() => {
      console.log('Added')
    }).catch((err) => {
        console.log(err)
      }
    )
  }

  return (
    <>
      <h1>Add Author</h1>
      <form action="">
        <input type="text" placeholder="Name" value={authorName} onChange={e => setAuthorName(e.target.value)}/>
        <input type="file" accept="image/png, image/jpeg, image/jpg"
               onChange={e => setAuthorImage(e.target.files[0])}/>
        <button onClick={uploadAuthor}>Submit</button>
      </form>
    </>
  );
}

export default AddAuthor