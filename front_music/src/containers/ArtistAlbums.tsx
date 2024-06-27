import React from 'react';
import {albumApi} from "../store/api/albumApi";
import {Navigate, useParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {nanoid} from "@reduxjs/toolkit";
import {IAlbumApi} from "../models/IAlbum";
import {artistsApi} from "../store/api/artistApi";
import Spinner from "../components/UI/Spinner/Spinner";
import DeletePublishBtns from "../components/UI/Buttons/DeletePublishBtns";

const ArtistAlbums = () => {
  const { id } = useParams();
  const { data: albums, error, isLoading } = albumApi.useGetArtistAlbumsQuery(id);
  const {data: artist} = artistsApi.useGetArtistQuery(id as string);

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {artist &&
        <Grid item xs={10} sm={8} md={4}>
          <MyCard element={artist} shortImg={false} isLink={false} information={artist.information ? artist.information : undefined}/>
        </Grid>
      }
      <Grid item xs={10} sm={10} md={8}>
        {albums && albums.length > 0 ?
          <>
            <Typography textAlign={"center"} variant={'h5'} mb={2}>
              Albums:
            </Typography>
            <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
              {albums.map((item: IAlbumApi) => (
                <Grid item xs={8} sm={4} md={3} key={nanoid()}>
                  <MyCard element={item} shortImg={true} path='tracks'>
                    <DeletePublishBtns type={'Album'} component={item}/>
                  </MyCard>
                </Grid>
              ))}
            </Grid>
          </> :
          <Typography variant={"h4"} textAlign='center'>No albums</Typography>
        }
      </Grid>
    </Grid>
  );
};

export default ArtistAlbums;