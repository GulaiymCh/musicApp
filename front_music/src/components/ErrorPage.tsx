import React from 'react';
import {useLocation} from "react-router-dom";
import tigerPhoto from '../assests/erroePage.png';
import {Box, Typography} from "@mui/material";

const ErrorPage = () => {
  const location = useLocation();
  const {data, originalStatus} = location.state || {data: {error: 'Oops! Page not found'}, originalStatus: '404'};

  return (
    <Box
      sx={{
        height: '70vh',
        pt: {xs: '30%', sm: '5%'},
        pl: '20%',
        fontFamily: '"IBM Plex Sans Condensed", "sans-serif" !important',
        fontSize: {xs: 50, sm: 100},
        background: `url(${tigerPhoto}) bottom right / 50% no-repeat`
      }}
    >
      <div>
        ERROR {originalStatus}
      </div>
      <Typography variant={'subtitle1'} sx={{fontFamily: '"IBM Plex Sans Condensed", "sans-serif" !important',}}>
        {data.error}
      </Typography>
    </Box>
  );
};

export default ErrorPage;