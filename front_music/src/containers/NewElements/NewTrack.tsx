import React, {ChangeEvent, FormEvent, useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import FormWrapper from "../../components/UI/Form/FormWrapper";
import FileInput from "../../components/UI/Form/FileInput";
import Button from "@mui/material/Button";
import {Alert, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import FormSelect from "../../components/UI/Form/FormSelect";
import {albumApi} from "../../store/api/albumApi";
import {ITrack} from "../../models/ITrack";
import {trackApi} from "../../store/api/trackApi";
import {toast} from "react-toastify";

const emptyTrack: ITrack = {
  album: "",
  title: "",
  mp3: ""
}

const NewTrack = () => {
  const navigate = useNavigate();
  const [track, setTrack] = useState(emptyTrack);
  const { data: albums } = albumApi.useGetAlbumsQuery(0);

  const [ crateTrack ] = trackApi.useCreateTrackMutation();
  const [alert, setAlert] = useState(false);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const {name, value} = e.target;
    setTrack(prev => ({...prev, [name]: value as string}));
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTrack(prev => ({...prev, [name]: file}));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (track.mp3 === '') {
      return setAlert(true);
    }
    const formData = new FormData();

    (Object.keys(track)  as Array<keyof ITrack>).forEach((key) => {
      formData.append(key, track[key]);
    })

    const {error} = await crateTrack(formData);
    if (error) {
      toast.error('Failed to create!');
    } else {
      toast.success('New track has created!');
      setTrack(emptyTrack);
      navigate(-1);
    }
  };

  return (
    <FormWrapper title={'New Track'} onSubmit={handleSubmit}>
      {alert && (
        <Alert severity="error" sx={{my: 3, mx: 'auto', border: '1px solid red'}}>
          Error! Image field is required!
        </Alert>
      )}
      <FormElement
        name='title'
        value={track.title}
        onChange={inputChangeHandler}
        required
        fullWidth
        label='Song name'
        autoFocus
      />
      <FormSelect
        name='album'
        value={track.album}
        onChange={inputChangeHandler}
        label='Album'
        options={albums}
      />
      <FileInput
        name='mp3'
        onChange={fileChangeHandler}
        label='Music File'
        type='music'
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

export default NewTrack;