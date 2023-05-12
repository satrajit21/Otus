import React from 'react'
import { useState } from 'react';
import * as Yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { Eye, EyeSlash } from 'phosphor-react';
//import { LoadingButton } from "@mui/lab";
const RegisterForm = () => {
    const [showPassword,setShowPassword]=useState(false);
    
    const RegisterSchema=Yup.object().shape({
        firstName:Yup.string().required("This is a mandatory field"),
        lasttName:Yup.string().required("This is a mandatory field"),
        email:Yup.string().required("Email is required").email("Email must be valid"),
        password:Yup.string().required("Password is required").min(10,"Password must be min of 10 characters"),
    })
    const defaultValues={
        firstName:"",
        lasttName:"",
        email:"demo@owly.com",
        password:"demo123"

    }
    const methods=useForm({
        resolver:yupResolver(RegisterSchema),
        defaultValues
    })
    const {reset,setError,handleSubmit,
        formState:{errors,isSubmitSuccessful,isSubmitting}}=methods;
    
        const onSubmit= async(data)=>{
            try{
                //submit data to backend
            }
            catch(error){
                console.log(error);
                reset();
                setError("afterSubmit",{
                    ...error,
                    message:error.message
                })
            }
        }
  return (
    <FormProvider methods={methods} 
    onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb={4}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}/>
      </Stack>
      <Button fullWidth color="inherit" size="large"
    type="submit" variant="contained" sx={{bgcolor:"text.primary",
    color:(theme)=> theme.palette.mode=== "light"?
    "common.white":"grey.800",
    '&:hover':{
        bgcolor:"text.primary",
        color:(theme)=>theme.palette.mode==="light"?
        "common.white":"grey.800"
    }}}>
        Create Account
    </Button>
    </FormProvider>
  )
}

export default RegisterForm