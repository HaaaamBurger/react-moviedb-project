import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {Movie} from "../Movie";
import css from './movies.module.css';
import {Alert} from "@mui/material";

const Movies = () => {
    const dispatch = useAppDispatch();
    const {movies, errRespond} = useAppSelector(state => state.movieReducer);
    const [query, setQuery] = useSearchParams({page: '1'})

    useEffect(() => {
        dispatch(movieActions.all({id: query.get('page')}));
        setQuery(prev => ({...prev, page: prev.get('page')}))
    }, [query, dispatch, setQuery]);

    if (errRespond) {
        console.log(errRespond.errors)
        dispatch(movieActions.setMoviePage('1'));
    }

    return (
        <div>
            <div className={css.moviesWrapper}>
                {movies.results.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
        </div>
    );
};

export {
    Movies,
};