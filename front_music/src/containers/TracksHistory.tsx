import React from 'react';
import {ITrackHistory} from "../models/ITrack";
import {useCheckLoginUser} from "../store/hooks/myHooks";
import {Navigate} from "react-router-dom";
import {trackHistoryApi} from "../store/api/trackHstory";
import TracksList from "../components/TracksList";
import Spinner from "../components/UI/Spinner/Spinner";
import {Typography} from "@mui/material";

const TracksHistory = () => {
  const { data, error, isLoading } = trackHistoryApi.useGetTrackHistoryQuery(0);
  const user = useCheckLoginUser();

  const trackHistories: ITrackHistory[] = data;
  const tracks = trackHistories && trackHistories.map(item => item.track);
  const dateTime = trackHistories && trackHistories.map(item => item.datetime);

  if (!user) {
    return <Navigate to={'/'}/>
  }

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return trackHistories.length !== 0 ? (
    <div>
      <TracksList tracks={tracks} trackListenedDates={dateTime}/>
    </div>
  ) : <Typography variant={'h4'}>Track history is empty</Typography>;
};

export default TracksHistory;