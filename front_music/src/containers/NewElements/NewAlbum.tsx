import React, {ChangeEvent, FormEvent, useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import FormWrapper from "../../components/UI/Form/FormWrapper";
import FileInput from "../../components/UI/Form/FileInput";
import Button from "@mui/material/Button";
import {artistsApi} from "../../store/api/artistApi";
import {Alert, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {IAlbum} from "../../models/IAlbum";
import FormSelect from "../../components/UI/Form/FormSelect";
import {albumApi} from "../../store/api/albumApi";
import {toast} from "react-toastify";

const emptyAlbum: IAlbum = {
  artist: "",
  date: "",
  image: "",
  title: ""
}

const NewArtist = () => {
  const navigate = useNavigate();
  const [album, setAlbum] = useState(emptyAlbum);
  const { data: artists } = artistsApi.useGetArtistsQuery(0);

  const [ crateAlbum ] = albumApi.useCreateAlbumMutation();
  const [alert, setAlert] = useState(false);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const {name, value} = e.target;
    setAlbum(prev => ({...prev, [name]: value as string}));
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAlbum(prev => ({...prev, [name]: file}));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (album.image === '') {
      return setAlert(true);
    }
    const formData = new FormData();

    (Object.keys(album)  as Array<keyof IAlbum>).forEach((key) => {
      formData.append(key, album[key]);
    })

    const {error} = await crateAlbum(formData);
    if (error) {
      toast.error('Failed to create!');
    } else {
      toast.success('New album has created!');
      setAlbum(emptyAlbum);
      navigate(-1);
    }
  };

  return (
    <FormWrapper title={'New Album'} onSubmit={handleSubmit}>
      {alert && (
        <Alert severity="error" sx={{my: 3, mx: 'auto', border: '1px solid red'}}>
          Error! Image field is required!
        </Alert>
      )}
      <FormElement
        name='title'
        value={album.title}
        onChange={inputChangeHandler}
        required
        fullWidth
        label='Album name'
        autoFocus
      />
      <FormElement
        required
        name='date'
        type='date'
        value={album.date}
        onChange={inputChangeHandler}
        fullWidth
        label='Date of publication'
      />
      <FormSelect
        name='artist'
        value={album.artist}
        onChange={inputChangeHandler}
        label='Artist'
        options={artists}
      />
      <FileInput
        name='image'
        onChange={fileChangeHandler}
        label='Image'
        type='image'
        required
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, ml: 3 }}
      >
        Create
      </Button>
    </FormWrapper>
  );
};

export default NewArtist;