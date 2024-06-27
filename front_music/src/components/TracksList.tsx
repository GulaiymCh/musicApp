import React, {FC} from 'react';
import {ITrackWithArtistApi} from "../models/ITrack";
import TrackCard from "./UI/Cards/TrackCard";
import {trackPhotos} from "../others/trackPhotos";
import {trackApi} from "../store/api/trackApi";
import ButtonWithProgress from "./UI/Buttons/ButtonWithProgress";
import {Grid, Typography} from "@mui/material";

interface TracksListProps {
  tracks: ITrackWithArtistApi[],
  trackListenedDates?: string[]
}

const TracksList:FC<TracksListProps> = ({tracks, trackListenedDates}) => {
  const [ publishTrack ] = trackApi.usePublishTrackMutation();
  const [ deleteTrack ] = trackApi.useDeleteTrackMutation();

  return tracks.length !== 0 ? (
    <div>
      {tracks.map((item: ITrackWithArtistApi, index) => (
        <TrackCard key={index} track={item} photo={trackPhotos[Math.floor(Math.random() * (18))]} trackListenedDate={trackListenedDates && trackListenedDates[index]}>
          {
            trackListenedDates ? null :
              <Grid item xs={1}>
                <ButtonWithProgress onClick={() => publishTrack(item._id)} published={item.publish} title='Publish' type={'publish'}/>
                <ButtonWithProgress onClick={() => deleteTrack(item._id)} title='Delete' type={'delete'}/>
              </Grid>
          }
        </TrackCard>
      ))}
    </div>
  ) : <Typography variant={'h4'}>No Tracks</Typography>;
};

export default TracksList;