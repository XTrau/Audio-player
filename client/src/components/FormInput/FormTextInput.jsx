import React from 'react';
import './Form.scss'

function FormTextInput({title, value, setValue, placeholder=""}) {
  return (
    <>
      <div className="input-wrapper">
        <h3 className="input-wrapper-header">{title}</h3>
        <input className="text-input" type="text" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
      </div>
    </>
  );
}

export default FormTextInput;