import {PropTypes} from "prop-types"
//form
import {useFormContext,Controller} from "react-hook-form"
//mui
import { Autocomplete, TextField } from "@mui/material"
RHFAutoComplete.propTypes = {
    name: PropTypes.string,
    label:PropTypes.string,
    helperText: PropTypes.node,
  };

export default function RHFAutoComplete({name,label,helperText,...other}){
    const {control,setValue} =useFormContext();
    return (
        <Controller name={name} render={({field,fieldState:{error}})=>(
            <Autocomplete {...field} 
            error={!!error} helperText={error?
            error.message:helperText} {...other}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event,newValue)=>setValue(name,newValue,{
                shouldValidate:true
            })}
            renderInput={(params)=>(
                <TextField label={label} 
                error={!!error} helperText={error?
                    error.message:helperText}{...params} />
        )}
            />
    )}
        control={control}/>
    )
}