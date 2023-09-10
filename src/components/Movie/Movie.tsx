import React, {FC, PropsWithChildren} from 'react';
import {IMovie} from "../../interfaces/movieInterface";


interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    return (
        <div>
            <img src={moviePoster} alt={movie.title}/>
        </div>
    );
};

export {
    Movie,
};