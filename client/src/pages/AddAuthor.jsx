import React, {useState} from 'react';
import axios from "../axios";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


function AddAuthor() {
  const [authorName, setAuthorName] = useState('')
  const [authorImageFile, setAuthorImageFile] = useState(null)
  const [authorImage, setAuthorImage] = useState(null)
  const uploadAuthor = (e) => {
    e.preventDefault()
    if (authorName.trim() === '' || authorImageFile === null) {
      alert("Заполните все поля")
      return
    }

    const fd = new FormData()
    fd.append('image', authorImageFile)
    fd.append('name', authorName.trim())

    axios.post('/api/artist', fd)
      .then((res) => {
        console.log(res)
        alert('Added')
      })
      .catch((err) => {
          alert('ERROR')
          console.log(err)
        }
      )
    setAuthorName('')
    setAuthorImageFile(null)
    setAuthorImage(null)
  }

  const uploadImage = (e) => {
    setAuthorImageFile(e.target.files[0])
    if (e.target.files[0])
      setAuthorImage(URL.createObjectURL(e.target.files[0]))

  }

  return (
    <>
      <h1 className="text-center h2">Add Author</h1>
      <form className="d-flex justify-content-around">
        <div className='d-flex flex-column w-100 justify-content-between'>
          <TextField label="Author Name" value={authorName} className='mb-2'
                     onChange={(e) => setAuthorName(e.target.value)}/>
          <Button variant="contained" component="label" className="mb-2">
            Add Author Image
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={uploadImage} hidden/>
          </Button>

          <Button variant="contained" onClick={uploadAuthor}>Submit</Button>
        </div>
        <div
          className={`${authorImage && authorImageFile ? '' : 'd-none'} d-flex justify-content-center align-items-center mx-2 rounded-3 border w-25 overflow-hidden  border-1 border-black p-1`}>
          <img src={authorImage} className="w-100 object-fit-cover" alt={''}/>
        </div>
      </form>

    </>
  );
}

export default AddAuthor