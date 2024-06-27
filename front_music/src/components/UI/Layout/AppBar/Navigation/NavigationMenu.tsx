import React, {FC} from 'react';
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {NavigationProps} from "../../../../../models/InterfaceProps";

const NavigationMenu: FC<NavigationProps> = ({user}) => {
  return (
    <>
      <MenuItem>
        <Link to={'/'} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>
          Artists
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={'/albums'} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>
          Albums
        </Link>
      </MenuItem>
      {
        user ?
          <>
            <MenuItem>
              <Link to={'/tracks'} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>
                Tracks
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/trackHistory'} style={{textDecoration: 'none', color: 'inherit', width: '100%', fontFamily: '"IBM Plex Sans Condensed", "sans-serif"'}}>
                Track History
              </Link>
            </MenuItem></> :
          null
      }
    </>
  );
};

export default NavigationMenu;