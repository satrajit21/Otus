import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import React from 'react'
import * as Yup from "yup"
import { useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import RHFTextField from "../../components/hook-form/RHFTextField"
import FormProvider from '../../components/hook-form/FormProvider'
import RHFAutoComplete from '../../components/hook-form/RHFAutoComplete'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const MEMBERS=["Name 1","Name 2","Name 3"]
const CreateGroupForm=({handleClose})=>{
    const NewGroupSchema=Yup.object().shape({
        title:Yup.string().required("Title is required"),
        members:Yup.array().min(2,"Must have atleast 2 menbers")
    })
    const defaultValues={
        title:"",
        members:[]
    }
    const methods=useForm({
        resolver:yupResolver(NewGroupSchema),
        defaultValues
    })
    const {reset,
        setError,
        watch,
        handleSubmit,
        formState:{errors,isSubmitSuccessful,isSubmitting,isValid}}=methods;
    const onSubmit= async(data)=>{
        try {
           console.log("DATA",data);
        } catch (error) {
            console.log("error",error);
        }
    }
    return (
        <FormProvider methods={methods} 
        onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="title"
                label="Title"/>
                <RHFAutoComplete name="members"
                label="Members" multiple freeSolo
                options={MEMBERS.map((option)=>option)}
                ChipProps={{size:"medium"}}/>
                <Stack spacing={2} direction="row"
                alignItems={"center"} 
                justifyContent={"end"}>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained'>
                        Create
                    </Button>
                </Stack>
            </Stack>

        </FormProvider>
    )
}

const CreateGroup = ({open,handleClose}) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open}
    TransitionComponent={Transition} keepMounted
    sx={{p:4}}>
        {/*Title*/}
        <DialogTitle sx={{mb:3}}>
            Create New Group
        </DialogTitle>
        {/*Content*/}
        <DialogContent>
            {/*form*/}
            <CreateGroupForm handleClose={handleClose}/>
        </DialogContent>
    </Dialog>
  )
}

export default CreateGroup