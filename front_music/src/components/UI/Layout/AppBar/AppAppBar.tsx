import * as React from 'react';
import {Grid, PaletteMode} from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from "../components/ToggleColorMode";
import {Link} from "react-router-dom";
import {useCheckLoginUser} from "../../../../store/hooks/myHooks";
import {userApi} from "../../../../store/api/userApi";
import {useAppDispatch} from "../../../../store/hooks/reduxHooks";
import {logoutUserSuccess} from "../../../../store/slices/userSlice";
import {makeStyles} from "tss-react/mui";
import UserAvatar from "./UserAvatar";
import Navigation from "./Navigation/Navigation";
import NavigationMenu from "./Navigation/NavigationMenu";

export const profileMenu = [
  {name: 'Create New Artist', to: '/newArtist', admin: false},
  {name: 'Create New Album', to: '/newAlbum', admin: false},
  {name: 'Create New Track', to: '/newTrack', admin: false},
  {name: 'Unpublished Artists', to: '/unpublishedArtists', admin: true},
  {name: 'Unpublished Albums', to: '/unpublishedAlbums', admin: true},
  {name: 'Unpublished Tracks', to: '/unpublishedTracks', admin: true},
]

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const useStyles = makeStyles()(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    bgcolor:
      theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.4)'
        : 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(24px)',
    maxHeight: 40,
    borderBottom: '1px solid',
    borderColor: 'divider',
    boxShadow:
      theme.palette.mode === 'light'
        ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
        : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
  },
  appBar: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    ml: '-18px',
    px: 0,
  },
  logo: {
    fontSize: 27,
    color: theme.palette.mode === 'light'
      ? 'black'
      : "white",
  }
  }));

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const { classes } = useStyles();
  const user = useCheckLoginUser();
  const dispatch = useAppDispatch();
  const [ logout ] = userApi.useLogoutUserMutation();
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const logoutUser = async () => {
    await logout(0);
    await dispatch(logoutUserSuccess());
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            variant="regular"
            className={classes.toolbar}
          >
            <Box className={classes.appBar}>
              <Link to={'/'} style={{textDecoration: 'none'}}>
                <Typography className={classes.logo}>MusicAPP</Typography>
              </Link>
              <Navigation user={user}/>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {user ?
                <>
                  <Typography pr={2} color="text.primary">Hi, {user.displayName}</Typography>
                  <UserAvatar avatarImage={user.avatarImage} logoutUser={logoutUser} role={user.role}/>
                </> :
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component={Link}
                    to='/login'
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component={Link}
                    to='/register'
                  >
                    Sign up
                  </Button>
                </>
              }
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer sx={{ display: { md: 'none' } }} anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <Grid container justifyContent='space-between' alignItems='center' flexDirection='row-reverse' pl={2}>
                      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                      {
                        user ?
                          <>
                            <Typography pr={2} color="text.primary">Hi, {user.displayName}</Typography>
                            <div style={{
                              width: 50,
                              height: 50,
                            }}><img style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: '50%',
                            }} src={user.avatarImage} alt="avatar"/></div>
                          </> :
                          null
                      }
                    </Grid>
                  </Box>
                  <NavigationMenu user={user}/>
                  <Divider />
                  {
                    user ?
                      <>
                        {profileMenu.map((item) => {
                          if (!item.admin) {
                            return (
                              <MenuItem key={item.name}>
                                <Typography component={Link} to={item.to} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>{item.name}</Typography>
                              </MenuItem>
                            )
                          }
                          if (user.role === 'admin') {
                            return (
                              <MenuItem key={item.name}>
                                <Typography component={Link} to={item.to} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>{item.name}</Typography>
                              </MenuItem>
                            )
                          }
                        })}
                        <MenuItem>
                          <Typography width={'100%'} onClick={logoutUser}>Logout</Typography>
                        </MenuItem>
                      </>
                      :
                      <>
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="contained"
                            component={Link}
                            to='/register'
                            sx={{ width: '100%' }}
                          >
                            Sign up
                          </Button>
                        </MenuItem>
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="outlined"
                            component={Link}
                            to='/login'
                            sx={{ width: '100%' }}
                          >
                            Sign in
                          </Button>
                        </MenuItem></>
                  }
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;