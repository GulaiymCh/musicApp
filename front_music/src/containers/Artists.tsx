import React from 'react';
import {artistsApi} from "../store/api/artistApi";
import {Grid} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {IArtist} from "../models/Interfaces";
import {nanoid} from "@reduxjs/toolkit";

const Artists = () => {
  const { data: artists, error, isLoading } = artistsApi.useGetArtistsQuery(0);

  return artists && (
    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
      {artists.map((item: IArtist) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='albums'/>
        </Grid>
      ))}
      {artists.map((item: IArtist) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='albums'/>
        </Grid>
      ))}
      {artists.map((item: IArtist) => (
        <Grid item xs={8} sm={4} md={3} key={nanoid()}>
          <MyCard element={item} shortImg={true} path='albums'/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Artists;