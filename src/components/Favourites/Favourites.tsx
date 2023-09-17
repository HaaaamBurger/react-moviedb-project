import css from '../Movies/movies.module.css'

import {FavMovie} from "./FavMovie";
import {IMovieDetails} from "../../interfaces";

const Favourites = () => {
    const getFavMovies: IMovieDetails[] = JSON.parse(localStorage.getItem('favourites')) || [];

    return (
        <div className={css.moviesWrapper}>
            {
                <div>
                    {getFavMovies.map((movie, index) => <FavMovie movie={movie} key={index}/>)}
                </div>
            }
        </div>
    );
}
export {
    Favourites,
};