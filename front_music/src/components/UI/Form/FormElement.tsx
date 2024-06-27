import React, {ChangeEvent, FC} from 'react';
import {Grid, TextField} from "@mui/material";

interface FormElementI {
  name: string,
  value: string | null,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  error?: string,
  type?: string,
  required?: boolean,
  multiline?: boolean,
  rows?: number,
  sm?: number,
  fullWidth?: boolean,
  autoFocus?: boolean,
}

const FormElement: FC<FormElementI> = (props) => {
  const {name, value, onChange, label, error, type, required, multiline, rows, sm = 12, fullWidth, autoFocus} = props;

  return (
    <Grid item xs={12} sm={sm}>
      <TextField
        type={type}
        required={required}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error}
        autoComplete={name}
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
      />
    </Grid>
  );
};
export default FormElement;