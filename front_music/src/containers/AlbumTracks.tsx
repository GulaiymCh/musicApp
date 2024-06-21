import React from 'react';
import {useParams} from "react-router-dom";
import {trackApi} from "../store/api/trackApi";
import {IAlbum, ITrack} from "../models/Interfaces";
import {Grid, Typography} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {nanoid} from "@reduxjs/toolkit";
import MusicCard from "../components/UI/Cards/MusicCard";

const AlbumTracks = () => {
  const { id } = useParams();
  const { data: tracks, error, isLoading } = trackApi.useGetTracksQuery(id);
  const album: IAlbum = tracks && tracks[0].album;

  return tracks && (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={10} sm={8} md={4}>
        <MyCard element={album} shortImg={false} date={album.date} isLink={false}/>
      </Grid>
      <Grid item xs={10} sm={10} md={8}>
        <Typography textAlign={"center"} variant={'h5'} mb={2}>
          Tracks:
        </Typography>
        <Grid container spacing={2} justifyContent={"center"} alignItems={"stretch"}>
          {tracks.map((item: ITrack) => (
            <Grid item xs={8} sm={6} md={6} key={nanoid()}>
              <MusicCard track={item}/>
            </Grid>
          ))}


        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlbumTracks;