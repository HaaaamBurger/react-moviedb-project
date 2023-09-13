import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {Movie} from "../Movie";
import css from './movies.module.css';
import {movieServices} from "../../services/movieServices";


const Movies = () => {
    const dispatch = useAppDispatch();
    const {movies, errRespond, movieForSearch} = useAppSelector(state => state.movieReducer);
    const [query, setQuery] = useSearchParams({page: '1'})

    // useEffect(() => {
    //    fetch('https://api.themoviedb.org/3/search/movie?query=war&api_key=657c7ca56f4858ad333da131d8b07962')
    //        .then(response => response.json())
    //        .then(data => console.log(data))
    // }, []);

    useEffect(() => {
        dispatch(movieActions.allMovies({id: query.get('page')}));
        setQuery(prev => ({...prev, page: prev.get('page')}));

        // if (movieForSearch) {
        //
        // }
    }, [query, dispatch, setQuery,movieForSearch]);

    useEffect(() => {
        setQuery(prev => ({...prev, page: 1}))
    }, [errRespond]);

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