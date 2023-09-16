import React from 'react';

import css from "./header.module.css";
import SearchIcon from '@mui/icons-material/Search';

import {alpha, InputBase, styled, Toolbar} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {IMovieSearchInterface} from "../../interfaces";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchField = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {genreId} = useAppSelector(state => state.genreReducer)
    const {pathname} = useLocation();

    const {
        register,
        reset,
        handleSubmit
    } = useForm({mode: 'all'})

    const saveMovie = (movie: IMovieSearchInterface) => {
        navigate('\movies?page=1');
        dispatch(movieActions.setMovieForSearch(movie.searchField));
        reset();
    }

    return (
        <form className={css.searchForm} onSubmit={handleSubmit(saveMovie)}>
            <Toolbar>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        disabled={pathname !== '/movies' || !!genreId}
                        {...register('searchField')}
                    />
                </Search>
            </Toolbar>
        </form>
    );
};

export {
    SearchField,
};