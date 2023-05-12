import {PropTypes} from "prop-types"
//form
import {useFormContext,Controller} from "react-hook-form"
//mui
import { TextField } from "@mui/material"
RHFTextField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node,
  };

export default function RHFTextField({name,helperText,...other}){
    const {control} =useFormContext();
    return (
        <Controller name={name} render={({field,fieldState:{error}})=>(
            <TextField {...field} fullWidth
            error={!!error} helperText={error?
            error.message:helperText} {...other}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}/>
    )}
        control={control}/>
    )
}