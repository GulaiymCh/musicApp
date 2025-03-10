import React from 'react';
import {artistsApi} from "../store/api/artistApi";
import {Grid, Typography} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {nanoid} from "@reduxjs/toolkit";
import {IArtistApi} from "../models/IArtist";
import Spinner from "../components/UI/Spinner/Spinner";
import {Navigate} from "react-router-dom";
import DeletePublishBtns from "../components/UI/Buttons/DeletePublishBtns";

const Artists = () => {
  const { data: artists, error, isLoading } = artistsApi.useGetArtistsQuery(0);

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return artists.length !== 0 ? (
    <Grid container spacing={2} alignItems={"top"}>
      {artists.map((item: IArtistApi) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='albums'>
            <DeletePublishBtns type={'Artist'} component={item}/>
          </MyCard>
        </Grid>
      ))}
    </Grid>
  ) : <Typography variant={'h4'}>No Artist</Typography>;
};

export default Artists;