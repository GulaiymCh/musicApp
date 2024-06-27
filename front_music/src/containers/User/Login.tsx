import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement";
import {userApi} from "../../store/api/userApi";
import Copyright from "../../components/UI/Copyright/Copyright";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Alert, Link} from "@mui/material";
import {loginSuccess} from "../../store/slices/userSlice";
import {useAppDispatch} from "../../store/hooks/reduxHooks";
import {useCheckLoginUser} from "../../store/hooks/myHooks";
import Spinner from "../../components/UI/Spinner/Spinner";

const defaultTheme = createTheme();

const EMPTY_USER = {
  email: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const login = useCheckLoginUser();
  const dispatch = useAppDispatch();
  const [ loginUser, { error, isLoading } ] = userApi.useLoginUserMutation();
  const [user, setUser] = useState(EMPTY_USER);

  useEffect(() => {
    if(login) {
      navigate(-1)
    }
  }, [login, navigate])

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {data} = await loginUser(user);
    setUser(EMPTY_USER);
    if (data) {
      await dispatch(loginSuccess(data));
    }
  };

  if (isLoading) return <Spinner/>

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
            <Avatar sx={{ m: 1, bgcolor: '#2182aa' }}>
              <ExitToAppIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && (
              <Alert severity="error" sx={{width: '100%', justifyContent: 'center'}}>
                Error, {// @ts-ignore
                error.hasOwnProperty('data') && Object.keys(error.data).length !== 0 ? error.data : 'something go wrong'
              }!
              </Alert>
            )}
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
                  sm={12}
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    Don't have an account? Sign Up
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

export default Login;