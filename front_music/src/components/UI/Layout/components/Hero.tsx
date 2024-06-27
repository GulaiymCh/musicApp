import * as React from 'react';
import {FC, ReactNode} from 'react';
import {alpha} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface HeroProps {
  children: ReactNode
}

const Hero: FC<HeroProps> = ({children}) => (
  <Box
    id="hero"
    sx={(theme) => ({
      width: '100%',
      backgroundImage:
        theme.palette.mode === 'light'
          ? 'white'
          : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
      backgroundSize: '100% 20%',
      backgroundRepeat: 'no-repeat',
    })}
  >
    <Container
      maxWidth={"xl"}
      sx={{
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
        minHeight: '100vh'
      }}
    >
      {children}
    </Container>
  </Box>
)

export default Hero;