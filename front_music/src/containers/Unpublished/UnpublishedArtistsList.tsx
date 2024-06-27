import React from 'react';
import {artistsApi} from "../../store/api/artistApi";
import {Grid, Typography} from "@mui/material";
import {IArtistApi} from "../../models/IArtist";
import {nanoid} from "@reduxjs/toolkit";
import MyCard from "../../components/UI/Cards/MyCard";
import {Navigate} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import DeletePublishBtns from "../../components/UI/Buttons/DeletePublishBtns";

const UnpublishedArtistsList = () => {
  const { data: artists, error, isLoading } = artistsApi.useGetUnpublishedArtistsQuery(0);

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return artists.length < 1 ? (
    <Grid container spacing={2} alignItems={"top"}>
      {artists.map((item: IArtistApi) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='albums'>
            <DeletePublishBtns type={'Artist'} component={item}/>
          </MyCard>
        </Grid>
      ))}
    </Grid>
  ): <Typography variant={'h4'}>No unpublished artist</Typography>;
};

export default UnpublishedArtistsList;