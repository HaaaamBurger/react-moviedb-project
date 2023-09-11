import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IMovies} from "../../interfaces";
import {movieServices} from "../../services/movieServices";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/movieInterface";

interface IState {
    movies: IMovies<IMovie>;
    errRespond?: {
        errors: string[],
        success: string
    }
}

const initialState: IState = {
    movies: {
        page: 1,
        results: []
    },
    errRespond: null
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
    reducers: {
        setMoviePage: (state, action) => {
            state.movies.page = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(all.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        .addCase(all.rejected, (state, action) => {
            state.errRespond.errors = action.payload
        })
        .addMatcher(isFulfilled(), (state, action) => {
            state.errRespond = null;
        })
})

const {reducer: movieReducer, actions: {setMoviePage}} = movieSlice;

const movieActions = {
    setMoviePage,
    all
}

export {
    movieActions,
    movieReducer
}
