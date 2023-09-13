import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Movie} from "../Movie";
import css from './movies.module.css';
import {movieServices} from "../../services/movieServices";
import {IMovie, IMovies} from "../../interfaces";


const Movies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {movies, errRespond, movieForSearch} = useAppSelector(state => state.movieReducer);
    const [query, setQuery] = useSearchParams({page: '1'})

    console.log(movies)
    useEffect(() => {
        dispatch(movieActions.allMovies({id: query.get('page')}));
        setQuery(prev => ({...prev, page: prev.get('page')}));

        if (movieForSearch) {
            movieServices.getMoviesByKeyword(movieForSearch, query.get('page')).then(({data}) => {
                dispatch(movieActions.setMovies(data))
                console.log(data)
                // const newMovies: IMovie[] = []
                // if (data.results.length) {
                //     data.results.map(movie => {
                //         movieServices.getMoviesById(movie.id).then(({data}) => {
                //             if (data) {
                //                 newMovies.push(data);
                //                 console.log(data)
                //             }
                //         }
                //         ).catch(error => {
                //             console.log(error)
                //         })
                //     })
                //
                // } else {
                //     setQuery(prev => ({...prev, page: 1}));
                // }
            });
        }
    }, [query, dispatch, setQuery, movieForSearch]);

    useEffect(() => {
        if (errRespond) {
            setQuery(prev => ({...prev, page: 1}))
        }
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