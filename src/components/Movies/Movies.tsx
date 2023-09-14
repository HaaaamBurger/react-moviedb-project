import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Movie} from "../Movie";
import css from './movies.module.css';
import {movieServices} from "../../services/movieServices";
import {apiService} from "../../services/apiService";


const Movies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {genreMovies} = useAppSelector(state => state.genreReducer)
    const {movies, errRespond, movieForSearch, filterMovie,} = useAppSelector(state => state.movieReducer);
    const [query, setQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        if (genreMovies.results.length){
            dispatch(movieActions.setMovies(genreMovies));
        }
    }, [genreMovies]);

    console.log(movies)

    useEffect(() => {
        if (!movieForSearch) {
            dispatch(movieActions.allMovies({id: query.get('page')}));
            setQuery(prev => ({...prev, page: prev.get('page')}));
        } else if (movieForSearch) {
            movieServices.getMoviesByKeyword(movieForSearch, query.get('page')).then(({data}) => {
                if (data.results.length) {
                    dispatch(movieActions.setMovies(data));
                } else {
                    navigate('/movies?page=1');
                    dispatch(movieActions.setMovieForSearch(null));
                }
            })
        }

    }, [query, movieForSearch]);


    useEffect(() => {
        if (errRespond) {
            setQuery(prev => ({...prev, page: 1}))
        }
    }, [errRespond]);

    return (
        <div>
            <div className={css.moviesWrapper}>
                {
                    !filterMovie.length ?
                        movies.results.map(movie => <Movie key={movie.id} movie={movie}/>) :
                        filterMovie.map(movie => <Movie key={movie.id} movie={movie}/>)
                }
            </div>
        </div>
    );
};

export {
    Movies,
};