import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre, IMovie, IMovieDetails, IMovies} from "../../interfaces";
import {movieServices} from "../../services/movieServices";
import {AxiosError} from "axios";



interface IState {
    movies: IMovies;
    errRespond: {
        errors?: string[]
    },
    genres: IGenre[],
    movieForSearch: string,
    filterMovie: IMovie[],
    movieDetail: IMovieDetails
}

const initialState: IState = {
    movies: {
        page: 1,
        results: [],
        total_pages: null,
        total_results: null
    },
    errRespond: null,
    genres: [],
    movieForSearch: null,
    filterMovie: [],
    movieDetail: null
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

const allMovies = createAsyncThunk<IMovies, { id: string }>(
    'movieSlice/all',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieServices.getMoviesByPage(id)
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const allMovieDetails = createAsyncThunk<IMovieDetails, {id: string}>(
    'movieSlice/movieDetails',
        async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieServices.getMovieById(id);
            return data;
        }catch (e) {
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
        },
        setMovies: (state, action) => {
            state.movies = action.payload
        },
        setFilterMovie: (state, action) => {
            state.filterMovie = action.payload
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
        .addCase(allMovieDetails.fulfilled, (state, action) => {
            state.movieDetail = action.payload;
        })
})

const {reducer: movieReducer, actions: {setMoviePage,setError,setFilterMovie,setMovieForSearch,setMovies}} = movieSlice;

const movieActions = {
    allMovies,
    allGenres,
    allMovieDetails,
    setMoviePage,
    setError,
    setMovieForSearch,
    setMovies,
    setFilterMovie
}

export {
    movieActions,
    movieReducer
}
