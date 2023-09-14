import React, {FC, PropsWithChildren} from 'react';

import css from './movie.module.css';

import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const navigate = useNavigate();
    const moviePoster = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`

    return (
        <div className={css.movieWrapper} onClick={() => navigate(`/movie/:${movie.id}`, {state: movie})}>
            <img src={moviePoster} alt={movie.title}/>
        </div>
    );
};

export {
    Movie,
};