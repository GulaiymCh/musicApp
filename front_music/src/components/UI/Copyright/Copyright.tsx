import React, {FC} from 'react';
import Typography from "@mui/material/Typography";

interface CopyrightProps {
  navigate: (num: number) => void
}

const Copyright: FC<CopyrightProps> = ({navigate}) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <span color="inherit" onClick={() => navigate(-1)} style={{textDecoration: 'underline', cursor: 'pointer'}}>
            Your Website
          </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;