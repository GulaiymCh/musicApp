import React from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import MyCard from "../components/UI/Cards/MyCard";
import {albumApi} from "../store/api/albumApi";
import {useCheckLoginUser} from "../store/hooks/myHooks";
import Button from "@mui/material/Button";
import TracksInAlbum from "../components/TracksInAlbum";
import Spinner from "../components/UI/Spinner/Spinner";

const AlbumTracks = () => {
  const { id } = useParams();
  const user = useCheckLoginUser();
  const {data: album, error, isLoading} = albumApi.useGetAlbumQuery(id as string);

  if (error) return <Navigate to={'/errorPage'} state={error}/>;
  if (isLoading) return <Spinner/>

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {album &&
        <Grid item xs={10} sm={8} md={4}>
          <MyCard element={album} shortImg={false} date={album.date} isLink={false}/>
        </Grid>
      }
      <Grid item xs={10} sm={10} md={8}>
        {
          user ?
            <TracksInAlbum id={id as string}/>:
            <Grid container justifyContent='center' flexDirection='column' width={'50%'} mx='auto' spacing={5}>
              <Grid item mt={2}>
                <Typography variant='h5' textAlign='center'>Login to  listen music</Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  component={Link}
                  to='/login'
                  sx={{ width: '100%' }}
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
        }
      </Grid>
    </Grid>
  );
};

export default AlbumTracks;