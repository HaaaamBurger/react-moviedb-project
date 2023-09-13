import {apiService, IRes} from "./apiService";
import {IMovies} from "../interfaces";
import {urls} from "../constants";
import {IMovie} from "../interfaces/movieInterface";
import {IGenre, IGenres} from "../interfaces/genresInterface";

const movieServices = {
    getMoviesById: (id: string): IRes<IMovies<IMovie>> => apiService.get(urls.moviesByPage(id)),
    getGenres: (): IRes<IGenres<IGenre>> => apiService.get(urls.getGenres),
    getSearchMovie: (keyword: string): IRes<IMovies<IMovie>> => apiService.get(urls.getByKeyword, keyword)
}

export {
    movieServices
}