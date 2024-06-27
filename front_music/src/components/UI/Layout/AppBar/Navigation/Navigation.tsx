import React, {FC} from 'react';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import Box from "@mui/material/Box";
import {NavigationProps} from "../../../../../models/InterfaceProps";

const Navigation: FC<NavigationProps> = ({user}) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, margin: '0 auto'}}>
      <MenuItem sx={{ py: '6px', px: '12px'}} >
        <Typography component={NavLink} to={'/'} sx={{textDecoration: 'none', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}} variant="subtitle2" color="text.primary">
          Artists
        </Typography>
      </MenuItem>
      <MenuItem sx={{ py: '6px', px: '12px',}} >
        <Typography component={NavLink} to={'/albums'} sx={{textDecoration: 'none', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}} variant="subtitle2" color="text.primary">
          Albums
        </Typography>
      </MenuItem>
      {
        user ?
          <>
            <MenuItem sx={{ py: '6px', px: '12px',}} >
              <Typography component={NavLink} to={'/tracks'} sx={{textDecoration: 'none', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}} variant="subtitle2" color="text.primary">
                Tracks
              </Typography>
            </MenuItem>
            <MenuItem sx={{ py: '6px', px: '12px',}} >
              <Typography component={NavLink} to={'/trackHistory'} sx={{textDecoration: 'none', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}} variant="subtitle2" color="text.primary">
                Track History
              </Typography>
            </MenuItem>
          </> :
        null
      }
    </Box>
  );
};

export default Navigation;