import {configureStore} from "@reduxjs/toolkit";
import {favouriteReducer, genreReducer, movieReducer, themeReducer} from "./slices";

const store = configureStore({
    reducer: {
        movieReducer,
        themeReducer,
        genreReducer,
        favouriteReducer
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