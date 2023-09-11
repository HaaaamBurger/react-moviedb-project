import React from 'react';

import css from './movieInfo.module.css';
import {useAppLocation} from "../../hooks";
import {IMovie} from "../../interfaces/movieInterface";

const MovieInfo = () => {
    const {state} = useAppLocation<IMovie>();

    console.log(state)
    return (
        <div className={css.movieInfoWrapper}>
            <div className={css.movieHeader}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${state.poster_path}`} alt=""/>
                </div>
                <div className={css.movieInfo}>
                    <h2>{state.title}</h2>
                    <a></a>
                </div>
            </div>
        </div>
    );
};

export {
    MovieInfo,
};