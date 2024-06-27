import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {AccountCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {profileMenu} from "./AppAppBar";


interface UserAvatarProps {
  avatarImage?: string,
  logoutUser: () => void,
  role: string
}

const UserAvatar: FC<UserAvatarProps> = ({avatarImage, logoutUser, role}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {avatarImage ?
              <div style={{
                width: 50,
                height: 50,
              }}><img style={{
                width: '100%',
                height: 'auto',
                borderRadius: '50%',
              }} src={avatarImage} alt="avatar"/></div> :
            <AccountCircle sx={{
              width: 40,
              height: 40,
              color: '#0959aa'
            }}/>
          }
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {profileMenu.map((item) => {
          if (!item.admin) {
            return (
              <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                <Typography component={Link} to={item.to} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>{item.name}</Typography>
              </MenuItem>
            )
          }
          if (role === 'admin') {
            return (
              <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                <Typography component={Link} to={item.to} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>{item.name}</Typography>
              </MenuItem>
            )
          }
          return <></>
        })}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={logoutUser}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default UserAvatar;
