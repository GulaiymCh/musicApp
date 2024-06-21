import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement";
import AvatarBlocks from "../../components/UI/AvatarBlocks/AvatarBlocks";
import {userApi} from "../../store/api/userApi";
import Copyright from "../../components/UI/Copyright/Copyright";

const defaultTheme = createTheme();

const EMPTY_USER = {
  email: '',
  password: '',
  displayName: '',
  avatarImage: '',
};

const Register = () => {
  const [ registerUser, {error} ] = userApi.useRegisterUserMutation();
  const [user, setUser] = useState(EMPTY_USER);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(user).then(() => setUser(EMPTY_USER));
  };

  const getFieldError = (fieldName: string) => {
    try {
      // @ts-ignore
      return error.data.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid sx={{position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, 0)', width: '100%', height: '100%', zIndex: 1100, background:'white'}}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#165670' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <FormElement
                  name={'email'}
                  value={user.email}
                  onChange={inputChangeHandler}
                  required
                  fullWidth
                  label={'Email'}
                  autoFocus
                  sm={6}
                  error={getFieldError('username')}
                />
                <FormElement
                  name={'displayName'}
                  value={user.displayName}
                  onChange={inputChangeHandler}
                  required={true}
                  fullWidth
                  label={'Display Name'}
                  sm={6}
                  error={getFieldError('displayName')}
                />
                <FormElement
                  name={'password'}
                  value={user.password}
                  onChange={inputChangeHandler}
                  required
                  fullWidth
                  label={'Password'}
                  type="password"
                  error={getFieldError('password')}
                />
                <AvatarBlocks 
                  onClick={(url:string) => setUser(prev => ({...prev, avatarImage: url}))}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    <Typography variant="body2" color='#1976d2'>
                      Already have an account? Sign in
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright/>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;