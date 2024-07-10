import * as React from 'react';
import {FC, ReactNode, SyntheticEvent} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {apiUrl} from "../../../store/config";
import {ITrackWithArtistApi} from "../../../models/ITrack";
import {makeStyles} from "tss-react/mui";
import {Grid} from "@mui/material";
import {trackHistoryApi} from "../../../store/api/trackHstory";

const useStyles = makeStyles()(theme => ({
  audioPlayer: {
    zIndex: 0,
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    '&::-webkit-media-controls-panel': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'white'
        : "#02294F",
    },
    '&::-webkit-media-controls-play-button': {
      borderRadius: '50%',
      backgroundColor: 'white',
    },
    '&::-webkit-media-controls-current-time-display, &::-webkit-media-controls-time-remaining-display': {
      color: 'white',
      textShadow: '2px 1px 1px black'
    },
  }
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  }
});

interface TrackCardProps {
  track: ITrackWithArtistApi,
  photo: string,
  children?: ReactNode,
  trackListenedDate?: string
}

const TrackCard:FC<TrackCardProps> = ({track, photo, children, trackListenedDate}) => {
  const { classes } = useStyles();
  const [writeInHistory] = trackHistoryApi.useWriteInTrackHistoryMutation();

  const handlePlay = (e: SyntheticEvent) => {
    const audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
      if(audios[i] != e.target){
        audios[i].pause();
      }
    }
    writeInHistory(track._id)
  };

  return (
    <>
      {trackListenedDate && <Typography variant={"caption"}>{new Date(trackListenedDate).toLocaleString()}</Typography>}
      <Grid container alignItems={'center'}>
        <Grid item xs={trackListenedDate ? 12: 11}>
          <Grid container alignItems='center' mb={3}>
            <Grid item>
              <CoverImage>
                <img
                  alt="can't win - Chilling Sunday"
                  src={photo}
                />
              </CoverImage>
            </Grid>
            <Grid item flexGrow={1}>
              <Box sx={{ ml: 1.5}}>
                <Grid container alignItems='center'>
                  <Typography variant="body2" fontWeight={500} fontFamily={'"IBM Plex Sans Condensed", "sans-serif'}>
                    {track.album.artist.title} /
                  </Typography>
                  <Typography variant="h6" noWrap ml={1}>
                    {track.album.title}
                  </Typography>
                </Grid>
                <Typography variant="h6" noWrap letterSpacing={-0.25}>
                  {track.title}
                </Typography>
                <Box position='relative'>
                  <audio controls style={{width: '100%'}} className={classes.audioPlayer} onPlay={handlePlay}>
                    <source src={apiUrl + track.mp3} type="audio/mpeg"/>
                  </audio>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {children}
      </Grid>
    </>
  );
}

export default TrackCard;
