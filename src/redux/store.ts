import {configureStore} from "@reduxjs/toolkit";
import {genreReducer, movieReducer, themeReducer} from "./slices";


const store = configureStore({
    reducer: {
        movieReducer,
        themeReducer,
        genreReducer
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {
    RootState,
    AppDispatch
}

export {
    store
}