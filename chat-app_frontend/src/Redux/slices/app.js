import { createSlice } from "@reduxjs/toolkit"

//

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT",
    },
    snackbar: {
        open: null,
        severity: null,
        message: null,
    },

}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        //Toggle Sidebar
        toggleSidebar(state) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        openSnackBar(state, action) {
            console.log(action.payload);
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state) {
            console.log("This is getting executed");
            state.snackbar.open = false;
            state.snackbar.message = null;
        },
    }
});

export default slice.reducer;

//Thunk functions

export function ToogleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidebar())
    }
}

export function UpdateSidebarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSidebarType({
            type,
        }))
    }
}
export const closeSnackbar = () => async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
};

export const showSnackbar =
    ({ severity, message }) =>
        async (dispatch, getState) => {
            dispatch(
                slice.actions.openSnackBar({
                    message,
                    severity,
                })
            );

            setTimeout(() => {
                dispatch(slice.actions.closeSnackbar());
            }, 4000);
        };
