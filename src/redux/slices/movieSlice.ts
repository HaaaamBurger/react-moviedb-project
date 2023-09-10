import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces";
import {movieServices} from "../../services/movieServices";
import {AxiosError} from "axios";

interface IState {
    movies: IMovie
}

const initialState: IState = {
    movies: {
        page: null,
        results: null
    }
}

const all = createAsyncThunk<IMovie, { id: string }>(
    'movieSlice/all',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieServices.getMoviesById(id)
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(all.fulfilled, (state, action) => {
            state.movies = action.payload
        })
})

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    all
}

export {
    movieActions,
    movieReducer
}
