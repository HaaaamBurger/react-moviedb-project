import {apiService, IRes} from "./apiService";
import {IMovies} from "../interfaces";
import {urls} from "../constants";
import {IMovie} from "../interfaces/movieInterface";
import {IGenre, IGenres} from "../interfaces/genresInterface";

const movieServices = {
    getMoviesById: (id: string): IRes<IMovies<IMovie>> => apiService.get(urls.moviesById(id)),
    getGenres: ():IRes<IGenres<IGenre>> => apiService.get(urls.getGenres)
}

export {
    movieServices
}