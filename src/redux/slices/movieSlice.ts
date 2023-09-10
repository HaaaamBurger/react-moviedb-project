import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovies} from "../../interfaces";
import {movieServices} from "../../services/movieServices";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/movieInterface";

interface IState {
    movies: IMovies<IMovie>
}

const initialState: IState = {
    movies: {
        page: null,
        results: []
    }
}

const all = createAsyncThunk<IMovies<IMovie>, { id: string }>(
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
