import React from 'react';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link to='/' style={{color: '#00000099'}}>
            Your Website
          </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;