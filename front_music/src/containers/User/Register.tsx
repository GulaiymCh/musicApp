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
import {Link as RouterLink, useNavigate} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement";
import AvatarBlocks from "../../components/UI/AvatarBlocks/AvatarBlocks";
import {userApi} from "../../store/api/userApi";
import Copyright from "../../components/UI/Copyright/Copyright";
import {Link} from "@mui/material";
import {useAppDispatch} from "../../store/hooks/reduxHooks";
import {loginSuccess} from "../../store/slices/userSlice";

const defaultTheme = createTheme();

const EMPTY_USER = {
  email: '',
  password: '',
  displayName: '',
  avatarImage: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ registerUser, {error, isLoading} ] = userApi.useRegisterUserMutation();
  const [user, setUser] = useState(EMPTY_USER);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {data} = await registerUser(user);
    setUser(EMPTY_USER);
    if (data) {
      await dispatch(loginSuccess(data));
      navigate('/');
    }
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
                  error={getFieldError('email')}
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
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
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