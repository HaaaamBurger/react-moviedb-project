import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IGenre, IMovie, IMovieDetails, IMovies} from "../../interfaces";
import {movieServices} from "../../services/movieServices";
import {AxiosError} from "axios";
import {IActors} from "../../interfaces/actorsInterface";



interface IState {
    movies: IMovies;
    errRespond: {
        errors?: string[]
    },
    genres: IGenre[],
    movieForSearch: string,
    filterMovie: IMovie[],
    movieDetail: IMovieDetails,
    actors: IActors
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
    movieDetail: null,
    actors: null
}

const allActors = createAsyncThunk<IActors, {id: string}>(
    'movieSlice/allActors',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieServices.getActors(id)
            return data;
        }catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const allGenres = createAsyncThunk<IGenre[],void>(
    'movieSlice/allGenres',
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
        })
        .addCase(allGenres.fulfilled,(state, action) => {
            state.genres = action.payload
        })
        .addCase(allMovieDetails.fulfilled, (state, action) => {
            state.movieDetail = action.payload;
        })
        .addCase(allActors.fulfilled, (state, action) => {
            state.actors = action.payload
        })
        .addMatcher(isRejected(), (state, action) => {
            state.errRespond = action.payload
        })
        .addMatcher(isFulfilled(), (state) => {
            state.errRespond = null
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
    setFilterMovie,
    allActors
}

export {
    movieActions,
    movieReducer
}
