import {configureStore} from "@reduxjs/toolkit";
import {movieReducer, themeReducer} from "./slices";


const store = configureStore({
    reducer: {
        movieReducer,
        themeReducer
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