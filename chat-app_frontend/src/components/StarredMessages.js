import { Box, Stack,Typography,IconButton, Tabs, Tab, Grid } from '@mui/material'
import React from 'react'
import {useTheme} from "@mui/material/styles"
import { useDispatch } from 'react-redux'
import { CaretLeft } from 'phosphor-react'
import { UpdateSidebarType } from '../Redux/slices/app'
import { useState } from 'react'
import { faker } from '@faker-js/faker'
import { SHARED_DOCS, SHARED_LINKS } from '../data'
import { DocMsg, LinkMsg } from './Conversation/MsgTypes'
import Message from './Conversation/Message'
const StarredMessages = () => {
const [value, setValue] = useState(0);
const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const theme=useTheme();
    const dispatch=useDispatch();
  return (
    <Box
    sx={{width:320,
      height:"100vh"
    }}>
      <Stack 
      sx={{
        height:"100%"
      }}>
        <Box sx={{
          boxShadow:"0px 0px 2px rgba(0,0,0,0.25)",
          width:"100%",
          backgroundColor:theme.palette.mode==="light"?"F8FAFF":
          theme.palette.background,
        }}>
          <Stack direction="row" 
          p={2}
          alignItems={"center"}
          spacing={3}
          sx={{
            height:"100%"
          }}>
            <IconButton onClick={()=>{
              dispatch(UpdateSidebarType("CONTACT"))
            }}>
              <CaretLeft/>
            </IconButton>
            <Typography variant="subtitle1">
              Starred Messages
            </Typography>           
          </Stack>
        </Box>
        
        {/*Body*/}
        <Stack sx={{
            height:"100%",
            position:"relative",
            flexGrow:1,
            overflowY:"scroll"
           }}
           p={3}
           spacing={3}>
            <Message/>

            </Stack>
     </Stack>  
    </Box>
  )
}

export default StarredMessages