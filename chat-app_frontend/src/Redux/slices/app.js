import {createSlice} from "@reduxjs/toolkit"

//


const initialState={
    sidebar:{
        open:false,
        type:"CONTACT",
    }

}

const slice=createSlice({
    name:"app",
    initialState,
    reducers:{
        //Toggle Sidebar
        toggleSidebar(state,action){
            state.sidebar.open=!state.sidebar.open;
        },
        updateSidebarType(state,action){
            state.sidebar.type = action.payload.type;
        }
    }
});

export default slice.reducer;

//Thunk functions

export function ToogleSidebar(){
    return async (dispatch,getState)=>{
        dispatch(slice.actions.toggleSidebar())
    }
}

export function UpdateSidebarType(type){
    return async (dispatch,getState)=>{
        dispatch(slice.actions.updateSidebarType({
            type,
        }))
    }
}