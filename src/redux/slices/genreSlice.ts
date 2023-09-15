import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovies} from "../../interfaces";
import {AxiosError} from "axios";
import {movieServices} from "../../services/movieServices";

interface IState{
    genreMovies: IMovies,
    genreId: string
}

const initialState: IState = {
    genreMovies: {
        page: 1,
        results: [],
        total_pages: null,
        total_results: null
    },
    genreId: null
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
            state.genreId = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(getByGenre.fulfilled, (state, action) => {
            state.genreMovies = action.payload
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