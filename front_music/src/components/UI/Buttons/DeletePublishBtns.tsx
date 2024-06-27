import React, {FC} from 'react';
import ButtonWithProgress from "./ButtonWithProgress";
import {Grid} from "@mui/material";
import {artistsApi} from "../../../store/api/artistApi";
import {IArtistApi} from "../../../models/IArtist";
import {albumApi} from "../../../store/api/albumApi";
import {IAlbumApi} from "../../../models/IAlbum";
import {toast} from "react-toastify";

interface DeletePublishBtnsProps {
  component: IArtistApi | IAlbumApi
  type: 'Artist' | 'Album'
}

const DeletePublishBtns: FC<DeletePublishBtnsProps> = ({type, component}) => {
  let publishData;
  let deleteData;
  if (type === 'Artist') {
    publishData = artistsApi.usePublishArtistMutation();
    deleteData = artistsApi.useDeleteArtistMutation();
  } else if (type === 'Album') {
    publishData = albumApi.usePublishAlbumMutation();
    deleteData = albumApi.useDeleteAlbumMutation();
  }

  if (publishData && deleteData) {
    const [ publish, {isLoading: isLoadingPub} ] = publishData;
    const [ deleteF, {isLoading: isLoadingDel} ] = deleteData;

    const handlePublish = async () => {
      const response = await publish(component._id);

      if (response.hasOwnProperty('error')) {
        toast.error('Failed to publish!')
      } else {
        toast.success(`${type}: "${component.title}" has published!`)
      }
    }

    const handleDelete = async () => {
      const response = await deleteF(component._id);

      if (response.hasOwnProperty('error')) {
        toast.error('Failed to delete!')
      } else {
        toast.success(`${type}: "${component.title}" has deleted!`)
      }
    }

    return (
      <Grid container spacing={1} flexWrap={"nowrap"}>
        <ButtonWithProgress onClick={handlePublish} loading={isLoadingPub} published={component.publish} title='Publish' type={'publish'}/>
        <ButtonWithProgress onClick={handleDelete} title='Delete' loading={isLoadingDel} type={'delete'}/>
      </Grid>
    )
  }
  return <></>
};

export default DeletePublishBtns;