import React from 'react';
import {Grid} from "@mui/material";
import {IAlbum} from "../models/Interfaces";
import MyCard from "../components/UI/Cards/MyCard";
import {nanoid} from "@reduxjs/toolkit";
import {albumApi} from "../store/api/albumApi";

const Albums = () => {
  const { data: albums, error, isLoading } = albumApi.useGetAlbumsQuery(0);

  return albums && (
    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
      {albums.map((item: IAlbum) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='tracks'/>
        </Grid>
      ))}
      {albums.map((item: IAlbum) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='tracks'/>
        </Grid>
      ))}
      {albums.map((item: IAlbum) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='tracks'/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Albums;