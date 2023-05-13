import React from 'react'
import FormProvider from '../../components/hook-form/FormProvider'
import { useState } from 'react'
import * as Yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import RHFTextField from "../../components/hook-form/RHFTextField"
import { Eye, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
import { LoginUser } from '../../Redux/slices/auth'
import { useDispatch } from 'react-redux'
//import {useTheme} from "@mui/material/styles"
const LoginForm = () => {
    //const theme=useTheme();
    const dispatch = useDispatch();
    const [showPassword,setShowPassword]=useState(false);
    
    const LoginSchema=Yup.object().shape({
        email:Yup.string().required("Email is required").email("Email must be valid"),
        password:Yup.string().required("Password is required").min(10,"Password must be min of 10 characters"),
    })
    const defaultValues={
        email:"demo@owly.com",
        password:"demo123"

    }
    const methods=useForm({
        resolver:yupResolver(LoginSchema),
        defaultValues
    })
    const {reset,setError,handleSubmit,
        formState:{errors,isSubmitSuccessful,isSubmitting}}=methods;
    
        const onSubmit= async(data)=>{
            try{
                //submit data to backend
                dispatch(LoginUser(data))
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">
                {errors.afterSubmit.message}
                </Alert>}
        
    <RHFTextField name="email"
    label="Email address"/>
    <RHFTextField name="password"
    label="Password" type={showPassword?"text":"password"}
    InputProps={{
        endAdornment:(
            <InputAdornment>
                <IconButton onClick={()=>{
                    setShowPassword(!showPassword)}
                }
                edge="end">
                    {showPassword?<Eye/>:<EyeSlash/>}
                </IconButton>
            </InputAdornment>
        )    
    }}/>
    </Stack>
    <Stack alignItems={"flex-end"}
    sx={{my:2}}>
        <Link variant="body2" color="inherit"
        component={RouterLink}
        underline="always" to="/auth/reset-password">
            Forgot Password?
        </Link>
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
        Login
    </Button>
    </FormProvider>
  )
}

export default LoginForm