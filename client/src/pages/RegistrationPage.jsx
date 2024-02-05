import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Registration() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='wrapper w-25'>
      <div className='d-flex flex-column bg-white p-4 rounded-2 align-items-lg-center'>
        <h2>Регистрация</h2>
        <form action="">
          <TextField
            label="Email"
            type='email'
            className='my-2 w-100'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <TextField
            label="Username"
            type='username'
            className='my-2 w-100'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <TextField
            label="Пароль"
            type={showPassword ? '' : 'password'}
            className='my-2 w-100'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <TextField
            label="Подтвердить пароль"
            type={showPassword ? '' : 'password'}
            className='my-2 w-100'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
          />
          <div>
            <input type="checkbox" name='show-password' checked={showPassword}
                   onChange={() => setShowPassword(prev => !prev)}/>
            <label htmlFor="show-password" className='mx-1' onClick={() => setShowPassword(prev => !prev)}>Показать пароль</label>
          </div>
          <Button className='w-100 mt-3' type='confirm' variant='contained'>Подтвердить</Button>
        </form>
      </div>
    </div>
  );
}

export default Registration;