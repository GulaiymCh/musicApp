import React from 'react';
import {albumApi} from "../store/api/albumApi";
import {useParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {IAlbum, IArtist} from "../models/Interfaces";
import {nanoid} from "@reduxjs/toolkit";

const ArtistAlbums = () => {
  const { id } = useParams();
  const { data: albums, error, isLoading } = albumApi.useGetArtistAlbumsQuery(id);
  const artist: IArtist = albums && albums[0].artist;

  return albums && (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={10} sm={8} md={4}>
        <MyCard element={artist} shortImg={false} isLink={false}/>
      </Grid>
      <Grid item xs={10} sm={10} md={8}>
        <Typography textAlign={"center"} variant={'h5'} mb={2}>
          Albums:
        </Typography>
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
          {albums.map((item: IAlbum) => (
            <Grid item xs={8} sm={4} md={3} key={nanoid()}>
              <MyCard element={item} key={nanoid()} shortImg={true} path='tracks'/>
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
          {albums.map((item: IAlbum) => (
            <Grid item xs={8} sm={4} md={3} key={nanoid()}>
              <MyCard element={item} shortImg={true} path='tracks'/>
            </Grid>
          ))}



        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArtistAlbums;