import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { CallLogs } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { CallLogElement } from "../../components/CallElement";
import StartCall from "../../Sections/main/StartCall";
const Call = () => {
  const theme = useTheme();
  const [openDialog,setOpenDialog]=useState(false);
  const handleCloseDialog=()=>{
    setOpenDialog(false);
  }
  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: "100%",
        }}
      >
        {/*Left Side*/}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack
            p={3}
            spacing={2}
            sx={{
              maxHeight: "100vh",
            }}
          >
            <Stack>
              <Typography variant="h5">Call Logs</Typography>
            </Stack>
            <Stack
              sx={{
                width: "100%",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle2" component={Link}>
                Start New Conversation
              </Typography>
              <IconButton
                onClick={() => {
                   setOpenDialog(true);
                }}
              >
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflowY: "-moz-hidden-unscrollable", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  {/* Call Logs  */}
                  {CallLogs.map((el)=><CallLogElement {...el}/>)}
                  
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/*Right Side*/}
        {/*// TODO=> Conversation component*/}
      </Stack>
      {openDialog && <StartCall open={openDialog}
      handleClose={handleCloseDialog}/>}
    </>
  );
};

export default Call;
