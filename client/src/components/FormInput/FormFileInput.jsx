import React from 'react';
import './Form.scss'

function FormFileInput({title, setValue, accept=""}) {
  return (
    <>
      <div className="input-wrapper">
        <h3 className="input-wrapper-header">{title}</h3>
        <input className="file-input" accept={accept} type="file" onChange={e => setValue(e.target.files[0])}/>
      </div>
    </>
  );
}

export default FormFileInput;