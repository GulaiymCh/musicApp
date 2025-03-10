import React from 'react';
import {Grid, Typography} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {nanoid} from "@reduxjs/toolkit";
import {albumApi} from "../store/api/albumApi";
import {IAlbumApi} from "../models/IAlbum";
import {Navigate} from "react-router-dom";
import Spinner from "../components/UI/Spinner/Spinner";
import DeletePublishBtns from "../components/UI/Buttons/DeletePublishBtns";

const Albums = () => {
  const { data: albums, error, isLoading } = albumApi.useGetAlbumsQuery(0);

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return albums.length !== 0 ? (
    <Grid container spacing={2} alignItems={"top"}>
      {albums.map((item: IAlbumApi) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='tracks'>
            <DeletePublishBtns type={'Album'} component={item}/>
          </MyCard>
        </Grid>
      ))}
    </Grid>
  ) : <Typography variant={'h4'}>No Albums</Typography>;
};

export default Albums;