import React, {FC} from 'react';
import {Button, CircularProgress, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {useCheckLoginUser} from "../../../store/hooks/myHooks";

const useStyles = makeStyles()(theme => ({
  btn: {
    background: 'transparent',
    borderRadius: 0,
    borderColor: theme.palette.mode === 'light'
      ? 'black'
      : `white`,
    color: theme.palette.mode === 'light'
      ? 'black'
      : `white`,
    '&:hover': {
      background: theme.palette.mode === 'light'
        ? 'black'
        : `white`,
      color: theme.palette.mode === 'light'
        ? 'white'
        : `black`,
    }
  },
  buttonProgress:  {
    position: 'absolute',
    top: 4,
    left: 0,
    width: '100%',
    height: '80%',
    boxSizing: "border-box",
    background: theme.palette.mode === 'light'
      ? 'white'
      : `black`,
  }
}));

interface PublishButtonProps {
  onClick: () => void,
  published?: boolean,
  type: 'delete' | 'publish',
  title: string,
  loading?: boolean
}

const ButtonWithProgress:FC<PublishButtonProps> = ({onClick, published = false, title, type, loading}) => {
  const { classes } = useStyles();
  const user = useCheckLoginUser();

  if (type === 'publish' && published) {
    return null;
  }

  return user && user.role === 'admin' ? (
    <Grid item xs={12} my={1}>
      <Button size='small' fullWidth variant='outlined' className={classes.btn} type='button' onClick={onClick}>
        {title}
        {loading ? <div  className={classes.buttonProgress}><CircularProgress size={20} color="inherit"/></div> : null}
      </Button>
    </Grid>
    )  : null;
};

export default ButtonWithProgress;