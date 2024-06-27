import React from 'react';
import {trackApi} from "../../store/api/trackApi";
import {useCheckLoginUser} from "../../store/hooks/myHooks";
import {Navigate} from "react-router-dom";
import TracksList from "../../components/TracksList";
import Spinner from "../../components/UI/Spinner/Spinner";

const UnpublishedTracksList = () => {
  const { data: tracks, error, isLoading } = trackApi.useGetUnpublishedTracksQuery(0);
  const user = useCheckLoginUser();

  if (!user) {
    return <Navigate to={'/'}/>
  }

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return tracks && (
    <div>
      <TracksList tracks={tracks}/>
    </div>
  );
};

export default UnpublishedTracksList;