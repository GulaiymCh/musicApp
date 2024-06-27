import React, {FC} from 'react';
import {trackApi} from "../store/api/trackApi";
import {Typography} from "@mui/material";
import TracksList from "./TracksList";

interface TracksInAlbumProps {
  id: string
}

const TracksInAlbum: FC<TracksInAlbumProps> = ({id}) => {
  const { data: tracks, error, isLoading } = trackApi.useGetTracksOfAlbumQuery(id);
  return (
    tracks && tracks.length > 0 ?
      <>
        <Typography textAlign={"center"} variant={'h5'} mb={2}>Tracks:</Typography>
        <TracksList tracks={tracks}/>
      </>:
      <Typography variant={"h4"} textAlign='center'>No tracks</Typography>
  )
};

export default TracksInAlbum;