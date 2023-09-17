import {createSlice} from "@reduxjs/toolkit";

interface IState {
    favouriteError: boolean
}

const initialState: IState = {
    favouriteError: false
}

const favouriteSlice = createSlice({
    name: 'favouriteSlice',
    initialState,
    reducers: {
        setFavouriteError: (state, action) => {
            state.favouriteError = action.payload
        }
    },
    extraReducers: {}
})

const {reducer: favouriteReducer, actions} = favouriteSlice;

const favouriteActions = {
    ...actions
}

export {
    favouriteActions,
    favouriteReducer
}