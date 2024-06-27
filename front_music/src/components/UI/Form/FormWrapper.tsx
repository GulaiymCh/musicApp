import React, {FC, FormEvent, ReactNode} from 'react';
import {Box, Grid, Typography} from '@mui/material';

interface FormWrapperProps {
  title: string,
  children: ReactNode,
  onSubmit: (e: FormEvent<HTMLFormElement>) => void,
}

const FormWrapper:FC<FormWrapperProps> = ({title, children, onSubmit}) => {
  return (
    // <Container className={classes.wrapper} maxWidth="lg">
    //   <Typography variant="h5" className={classes.title}>{title}</Typography>
    //   <div className={classes.children}>
    //     <Grid
    //       component="form"
    //       container
    //       justifyContent="center"
    //       spacing={2}
    //       onSubmit={onSubmit}
    //       direction="column"
    //     >
    //       {children}
    //     </Grid>
    //   </div>
    // </Container>
    <Box mt={3} textAlign={'center'} maxWidth={'sm'} sx={{margin: '0 auto'}}>
      <Typography variant="subtitle1" pb={3}>{title}</Typography>
      <Grid
        component="form"
        container
        spacing={3}
        onSubmit={onSubmit}
      >
        {children}
      </Grid>
    </Box>
  );
};

export default FormWrapper;