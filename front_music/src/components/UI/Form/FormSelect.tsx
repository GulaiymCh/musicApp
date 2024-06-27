import React, {FC} from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {IArtistApi} from "../../../models/IArtist";

interface FormSelectProps {
  name: string,
  value: string,
  onChange: (e: SelectChangeEvent) => void,
  label: string,
  options: IArtistApi[]
}

const FormSelect: FC<FormSelectProps> = ({name, value, label, onChange, options}) => {
  return (
    <Grid item xs={12}>
      <FormControl required fullWidth>
        <InputLabel id="demo-simple-select-required-label">{label}</InputLabel>
        <Select
          sx={{textAlign: "left"}}
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={value}
          defaultValue={''}
          label={label}
          onChange={onChange}
          name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options && options.map(item => (
            <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default FormSelect;