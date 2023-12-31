import {createSlice} from "@reduxjs/toolkit";

interface IState {
    status: boolean
}

const initialState:IState = {
    status: true
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setThemeStatus: (state, action) => {
            state.status = action.payload
        }
    },
})

const {reducer: themeReducer, actions} = themeSlice;

const themeActions = {
    ...actions
    // setThemeStatus
}

export {
    themeReducer,
    themeActions
}