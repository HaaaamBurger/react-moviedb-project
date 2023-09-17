import React, {FC, PropsWithChildren} from 'react';

import css from '../../Movie/movie.module.css'

import {useNavigate} from "react-router-dom";
import {IMovieDetails} from "../../../interfaces";

interface IProps extends PropsWithChildren{
    movie: IMovieDetails
}
const FavMovie:FC<IProps> = ({movie}) => {
    const navigation = useNavigate();
    return (
        <div className={css.movieWrapper}>
            <div onClick={() => {
                navigation(`/movie/${movie.id}`)
            }}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            </div>
        </div>
    );
};

export {
    FavMovie,
};