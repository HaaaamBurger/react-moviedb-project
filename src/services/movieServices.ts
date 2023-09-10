import {apiService, IRes} from "./apiService";
import {IMovies} from "../interfaces";
import {urls} from "../constants";
import {IMovie} from "../interfaces/movieInterface";

const movieServices = {
    getMoviesById: (id: string): IRes<IMovies<IMovie>> => apiService.get(urls.moviesById(id))
}

export {
    movieServices
}