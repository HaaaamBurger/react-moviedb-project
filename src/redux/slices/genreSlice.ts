import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IMovies} from "../../interfaces";
import {AxiosError} from "axios";
import {movieServices} from "../../services/movieServices";

interface IState{
    genreMovies: IMovies;
    genreId: string;
    genreError: {
        errors?: string,
    },
    filterError: boolean;
}

const initialState: IState = {
    genreMovies: {
        page: 1,
        results: [],
        total_pages: null,
        total_results: null
    },
    genreId: null,
    genreError: null,
    filterError: false
}

const getByGenre = createAsyncThunk<IMovies, {id: string,page: string}>(
    'genreSlice/getByGenre',
    async ({id,page}, {rejectWithValue}) => {
        try {
            const {data} = await movieServices.getMoviesByGenre(id, page)
            return data;
        }catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {
        setGenreId: (state, action) => {
            state.genreId = action.payload;
        },
        setFilterError: (state, action) => {
            state.filterError = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(getByGenre.fulfilled, (state, action) => {
            state.genreMovies = action.payload;
        })
        .addMatcher(isRejected(), (state, action) => {
            state.genreError = action.payload;
        })
        .addMatcher(isFulfilled(), (state) => {
            state.genreError = null;
        })
})

const {reducer: genreReducer, actions} = genreSlice;

const genreActions = {
    ...actions,
    getByGenre
}

export {
    genreActions,
    genreReducer
}