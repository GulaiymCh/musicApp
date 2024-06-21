import React, {FC, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {nanoid} from "@reduxjs/toolkit";
import {makeStyles} from "tss-react/mui";
import avatar1 from '../../../assests/avatars/avatar1.avif';
import avatar2 from '../../../assests/avatars/avatar2.avif';
import avatar3 from '../../../assests/avatars/avatar3.avif';
import avatar4 from '../../../assests/avatars/avatar4.avif';
import avatar5 from '../../../assests/avatars/avatar5.jpg';
import avatar6 from '../../../assests/avatars/avatar6.avif';
import avatar7 from '../../../assests/avatars/avatar7.jpg';
import avatar8 from '../../../assests/avatars/avatar8.avif';
import avatar9 from '../../../assests/avatars/avatar9.avif';

const useStyles = makeStyles()(() => ({
  avatar: {
    minWidth: 50,
    minHeight: 80,
    overflow: 'hidden',
    ":hover": {
      border: '1px solid #1565c0',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
  },
  chosenAvatar: {
    minWidth: 70,
    height: '100%',
    border: '1px solid #1565c0',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  },
  avatarImg: {
    width: '100%',
    display: 'block'
  },
  cancel: {
    textAlign: 'center',
    textDecoration: 'underline',
    paddingTop: '7px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.6)'
  }
}));

interface AvatarBlocksI {
  onClick: (url: string) => void,
}

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

const AvatarBlocks: FC<AvatarBlocksI> = ({onClick}) => {
  const { classes } = useStyles();
  const [chosenAvatar, setChosenAvatar] = useState('');

  const chooseAvatar = (e: React.MouseEvent<HTMLElement>, image: string) => {
    e.preventDefault();
    setChosenAvatar(image);
    onClick(image);
  };

  return (
    <Grid pt={1} pl={2}>
      <Typography py={2}>
        Choose avatar:
      </Typography>
      <Grid container alignItems='center' justifyContent='center' spacing={2}>
        <Grid item xs={12} sm={8}>
          <Grid container alignItems={"center"} justifyContent={"space-evenly"}>
            {
              avatarImages.map((image) => (
                <Grid item xs={4} key={nanoid()} className={classes.avatar} onClick={(e) => chooseAvatar(e, image)}>
                  <img className={classes.avatarImg} src={image} alt='Avatar image'/>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs={6} sm={4}>
          {chosenAvatar.length > 0 ?
            <>
              <Grid className={classes.chosenAvatar}>
                <img className={classes.avatarImg} src={chosenAvatar} alt='Avatar image'/>
              </Grid>
              <Typography variant={"subtitle1"} className={classes.cancel} onClick={(e) => chooseAvatar(e, '')}>
                Отмена x
              </Typography>
            </> : null
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AvatarBlocks;