import React, {FC, PropsWithChildren} from 'react';

import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import css from './movie.module.css';

import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const navigate = useNavigate();
    const moviePoster = movie?.poster_path;

    return (
        <div className={css.movieWrapper} onClick={() => navigate(`/movie/${movie.id}`, {state: movie})}>
            {
                moviePoster ?
                    <img src={`https://image.tmdb.org/t/p/w500${moviePoster}`} alt={movie.title}/>:
                        <div className={css.noMovie}>
                            {movie.title}
                            <ImageNotSupportedOutlinedIcon/>
                        </div>
            }
        </div>
    );
};

export {
    Movie,
};