import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IMovies} from "../../interfaces";
import {movieServices} from "../../services/movieServices";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/movieInterface";
import {IGenre} from "../../interfaces/genresInterface";

interface IState {
    movies: IMovies<IMovie>;
    errRespond: {
        errors?: string[]
    },
    genres: IGenre[],
    movieForSearch: string
}

const initialState: IState = {
    movies: {
        page: 1,
        results: []
    },
    errRespond: null,
    genres: [],
    movieForSearch: null
}

const allGenres = createAsyncThunk<IGenre[],void>(
    'allGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieServices.getGenres();
            return data.genres;
        }catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const allMovies = createAsyncThunk<IMovies<IMovie>, { id: string }>(
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
        },
        setError: (state, action) => {
            state.errRespond = action.payload
        },
        setMovieForSearch: (state, action) => {
            state.movieForSearch = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(allMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.errRespond = null;
        })
        .addCase(allMovies.rejected, (state, action) => {
            state.errRespond = action.payload
        })
        .addCase(allGenres.fulfilled,(state, action) => {
            state.genres = action.payload
        })
})

const {reducer: movieReducer, actions: {setMoviePage,setError,setMovieForSearch}} = movieSlice;

const movieActions = {
    setMoviePage,
    allMovies,
    allGenres,
    setError,
    setMovieForSearch
}

export {
    movieActions,
    movieReducer
}
