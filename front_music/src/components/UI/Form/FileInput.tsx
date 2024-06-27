import {ChangeEvent, FC, useRef, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {checkMusic, checkPhoto} from "../../../others/functions";

interface FileInputProps {
  name: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  label: string,
  required: boolean,
  type: string,
}

const FileInput: FC<FileInputProps> = ({onChange, name, label, required, type}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState<File| null>(null);
  const [error, setError] = useState('');

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let isFile;

      if (type === 'image') {
        isFile = checkPhoto(e.target.files[0].name);
      } else {
        isFile = checkMusic(e.target.files[0].name)
      }

      if (typeof isFile === "boolean") {
        setFilename(e.target.files[0]);
      } else {
        return setError(isFile);
      }
    } else {
      setFilename(null);
    }
    onChange(e);
  };

  const activateInput = () => {
    inputRef.current?.click()
  };

  return (
    <Grid item xs={12}>
      <input
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
        style={{display: 'none'}}
      />
      <Grid container  spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            fullWidth
            sx={{color: 'white'}}
            required={required}
            disabled
            label={label}
            value={filename === null ? '' : filename.name}
            onClick={activateInput}
            error={error.length !== 0}
            helperText={error}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={activateInput}>Browse</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FileInput;