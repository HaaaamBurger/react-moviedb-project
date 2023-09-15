import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions, movieActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Movie} from "../Movie";
import css from './movies.module.css';
import {movieServices} from "../../services/movieServices";


const Movies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {genreMovies, genreId} = useAppSelector(state => state.genreReducer)
    const {movies, errRespond, movieForSearch, filterMovie,} = useAppSelector(state => state.movieReducer);
    const [query, setQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        if (!movieForSearch && !genreId) {
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
        } else if (genreId) {
            if (genreId) {
                dispatch(genreActions.getByGenre({id: genreId, page: query.get('page')}))
            }
        }
    }, [query, movieForSearch, genreId]);


    useEffect(() => {
        if (errRespond) {
            setQuery(prev => ({...prev, page: 1}))
        }
    }, [errRespond]);

    return (
        <div>
            <div className={css.moviesWrapper}>
                {
                    !genreId && !filterMovie.length ?
                        movies.results.map(movie => <Movie key={movie.id} movie={movie}/>) :
                        genreMovies ?
                            genreMovies.results.map(movie => <Movie key={movie.id} movie={movie}/>) :
                            filterMovie.length ? filterMovie.map(movie => <Movie key={movie.id} movie={movie}/>) : null
                }
            </div>
        </div>
    );
};

export {
    Movies,
};