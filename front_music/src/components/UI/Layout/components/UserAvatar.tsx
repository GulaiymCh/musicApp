import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {AccountCircle} from "@mui/icons-material";

export const userMenu = ['Profile', 'Logout'];

interface UserAvatarProps {
  avatarImage?: string,
  logoutUser: () => void
}

const UserAvatar: FC<UserAvatarProps> = ({avatarImage, logoutUser}) => {
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
        {userMenu.map((item) => (
          <MenuItem key={item} onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={item === 'Logout' ? logoutUser : undefined}>{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default UserAvatar;
