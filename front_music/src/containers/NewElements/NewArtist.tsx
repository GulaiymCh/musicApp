import React, {ChangeEvent, FormEvent, useState} from 'react';
import {IArtist} from "../../models/IArtist";
import FormElement from "../../components/UI/Form/FormElement";
import FormWrapper from "../../components/UI/Form/FormWrapper";
import FileInput from "../../components/UI/Form/FileInput";
import Button from "@mui/material/Button";
import {artistsApi} from "../../store/api/artistApi";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const emptyArist: IArtist = {
  title: "",
  image: "",
  information: ""
}

const NewArtist = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(emptyArist);
  const [ crateArtist ] = artistsApi.useCreateArtistMutation();
  const [alert, setAlert] = useState(false);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setArtist(prev => ({...prev, [name]: value}));
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArtist(prev => ({...prev, [name]: file}));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (artist.image === '') {
      return setAlert(true);
    }
    const formData = new FormData();

    (Object.keys(artist)  as Array<keyof IArtist>).forEach((key) => {
      formData.append(key, artist[key]);
    })

    const {error} = await crateArtist(formData);
    if (error) {
      toast.error('Failed to create!');
    } else {
      toast.success('New artist has created!');
      setArtist(emptyArist);
      navigate(-1);
    }
  };

  return (
    <FormWrapper title={'New Artist'} onSubmit={handleSubmit}>
      {alert && (
        <Alert severity="error" sx={{my: 3, mx: 'auto', border: '1px solid red'}}>
          Error! Image field is required!
        </Alert>
      )}
      <FormElement
        name='title'
        value={artist.title}
        onChange={inputChangeHandler}
        required
        fullWidth
        label='Artist name'
        autoFocus
      />
      <FormElement
        name='information'
        value={artist.information}
        onChange={inputChangeHandler}
        fullWidth
        label='Information'
        multiline
        rows={4}
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