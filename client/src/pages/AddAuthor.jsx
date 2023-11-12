import React, {useState} from 'react';
import axios from "../axios";
import FormTextInput from "../components/FormInput/FormTextInput";
import FormFileInput from "../components/FormInput/FormFileInput";

function AddAuthor() {
  const [authorName, setAuthorName] = useState('')
  const [authorImage, setAuthorImage] = useState(null)

  const uploadAuthor = (e) => {
    e.preventDefault()
    if (authorName.trim() === '' || authorImage === null) {
      alert("Заполните все поля")
      return
    }

    const fd = new FormData()
    fd.append('image', authorImage)
    fd.append('name', authorName.trim())

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
        <FormTextInput placeholder="Nickname" value={authorName} setValue={setAuthorName} title={"Author Name"}/>
        <FormFileInput accept="image/png, image/jpeg, image/jpg" setValue={setAuthorImage} title={"Author Image"}/>
        <button className="submit-btn" onClick={uploadAuthor}>Submit</button>
      </form>
    </>
  );
}

export default AddAuthor