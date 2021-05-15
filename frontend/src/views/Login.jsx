import React, { useState } from 'react';
import { Container, Button, FormControl, InputGroup } from 'react-bootstrap';
import { EyeSlash, Eye } from 'react-bootstrap-icons';
import { createUseStyles } from 'react-jss';
import { sendLoginRequest } from '../services/Auth';

const useStyles = createUseStyles({
  loginContainer: {
    width: '50%'
  },
  loginInputGroup: {
    marginBottom: 15
  }
});

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickLoginButton = async () => {
    await sendLoginRequest(username, password);
  };

  const showPasswordIcon = showPassword ? <EyeSlash /> : <Eye />;

  return (
    <Container className={classes.loginContainer}>
      <h1>Log in</h1>
      <label>Email</label>
      <InputGroup className={classes.loginInputGroup}>
        <FormControl
          placeholder='e.g: thelegend27@gmail.com'
          onChange={handleChangeUsername}
        />
      </InputGroup>
      <label>Password</label>
      <InputGroup className={classes.loginInputGroup}>
        <FormControl
          placeholder='e.g: *********'
          type={showPassword ? 'text' : 'password'}
          onChange={handleChangePassword}
        />
        <InputGroup.Append>
          <Button onClick={toggleShowPassword} variant='secondary'>{showPasswordIcon}</Button>
        </InputGroup.Append>
      </InputGroup>
      <Button onClick={handleClickLoginButton}>Log in</Button>
    </Container>
  );
}