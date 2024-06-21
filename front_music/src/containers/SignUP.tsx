import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import FormElement from "../components/UI/Form/FormElement";
import AvatarBlocks from "../components/UI/AvatarBlocks/AvatarBlocks";
import {userApi} from "../store/api/userApi";
import Copyright from "../components/UI/Copyright/Copyright";

const defaultTheme = createTheme();

const SighUp = () => {
  const navigate = useNavigate();
  const [ registerUser ] = userApi.useRegisterUserMutation();
  const [user, setUser] = useState({
    username: '',
    password: '',
    displayName: '',
    avatarImage: '',
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(user).then(() => setUser({
      username: '',
      password: '',
      displayName: '',
      avatarImage: '',
    }));
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
                  name={'username'}
                  value={user.username}
                  onChange={inputChangeHandler}
                  required
                  fullWidth
                  label={'User Name'}

                  sm={6}
                />
                <FormElement
                  name={'displayName'}
                  value={user.displayName}
                  onChange={inputChangeHandler}
                  required={true}
                  fullWidth
                  label={'Display Name'}
                  sm={6}
                />
                <FormElement
                  name={'password'}
                  value={user.password}
                  onChange={inputChangeHandler}
                  required
                  fullWidth
                  label={'Password'}
                  type="password"
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
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright navigate={navigate}/>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}

export default SighUp;