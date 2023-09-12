import React, {useEffect, useState} from 'react';

import css from './movieInfo.module.css';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {IMovie} from "../../interfaces/movieInterface";
import {movieActions} from "../../redux";



const MovieInfo = () => {
    //Виведення данних зі стейті в хеддер для того, щоб користувач зразу мав доступ до інформації

    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.movieReducer)

    const {state: movie} = useAppLocation<IMovie>();
    // const [currentMovie, setCurrentMovie] = useState(movie);

    useEffect(() => {
        dispatch(movieActions.allGenres());
    }, []);


    //Запит на додаткову інформації про фільм, яка вже буде підгружатись


    return (
        <div className={css.movieInfoWrapper}>
            <div className={css.movieHeader}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                </div>
                <div className={css.movieInfo}>
                    <h2>{movie.title}</h2>
                </div>
            </div>
        </div>
    );
};

export {
    MovieInfo,
};