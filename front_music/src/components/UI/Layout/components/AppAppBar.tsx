import * as React from 'react';
import {PaletteMode} from '@mui/material';
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
import ToggleColorMode from "./ToggleColorMode";
import logoImg from '../../../../assests/logo.png';
import {Link, NavLink} from "react-router-dom";
import {useCheckLoginUser} from "../../../../store/hooks/myHooks";
import UserAvatar, {userMenu} from "./UserAvatar";
import {userApi} from "../../../../store/api/userApi";
import {useAppDispatch} from "../../../../store/hooks/reduxHooks";
import {logoutUserSuccess} from "../../../../store/slices/userSlice";

const logoStyle = {
  width: '75px',
  height: 'auto',
  cursor: 'pointer',
};

const menu = [
  {name: 'Artists', to: '/'},
  {name: 'Albums', to: '/albums'},
  {name: 'Tracks', to: '/'},
  {name: 'Track History', to: '/'}
]

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const user = useCheckLoginUser();
  const dispatch = useAppDispatch();
  const [ logout, {error, isLoading} ] = userApi.useLogoutUserMutation();
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
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Link to={'/'}><img
                src={logoImg}
                style={logoStyle}
                alt="logo of sitemark"
              /></Link>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, margin: '0 auto' }}>
                {menu.map((item) => (
                  <MenuItem sx={{ py: '6px', px: '12px' }} key={item.name}>
                    <Typography component={NavLink} to={item.to} sx={{textDecoration: 'none'}} variant="body2" color="text.primary">
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
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
                <UserAvatar avatarImage={user.avatarImage} logoutUser={logoutUser}/> :
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
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  {menu.map((item) => (
                    <MenuItem key={item.name}>
                      <Link to={item.to} style={{textDecoration: 'none', color: 'inherit'}}>
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                  <Divider />
                  {
                    user ?
                      userMenu.map((item) => (
                        <MenuItem key={item}>
                          <Typography textAlign="center" onClick={item === 'Logout' ? logoutUser : undefined}>{item}</Typography>
                        </MenuItem>
                      )) :
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