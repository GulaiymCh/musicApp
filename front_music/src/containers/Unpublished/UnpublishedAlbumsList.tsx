import React from 'react';
import {Grid, Typography} from "@mui/material";
import {nanoid} from "@reduxjs/toolkit";
import MyCard from "../../components/UI/Cards/MyCard";
import {albumApi} from "../../store/api/albumApi";
import {IAlbumApi} from "../../models/IAlbum";
import {Navigate} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import DeletePublishBtns from "../../components/UI/Buttons/DeletePublishBtns";
import {useCheckLoginUser} from "../../store/hooks/myHooks";

const UnpublishedAlbumsList = () => {
  const { data: albums, error, isLoading } = albumApi.useGetUnpublishedAlbumsQuery(0);
  const user = useCheckLoginUser();

  if (!user) {
    return <Navigate to={'/'}/>
  }

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
  ): <Typography variant={'h4'}>No unpublished album</Typography>;
};

export default UnpublishedAlbumsList;