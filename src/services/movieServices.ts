import {apiService, IRes} from "./apiService";
import {IMovie, IMovies} from "../interfaces";
import {urls} from "../constants";
import {IGenre, IGenres} from "../interfaces/genresInterface";

const movieServices = {
    getMoviesByPage: (id: string): IRes<IMovies> => apiService.get(urls.moviesByPage(id)),
    getGenres: (): IRes<IGenres<IGenre>> => apiService.get(urls.getGenres),
    getMoviesByKeyword: (keyword: string, id: string): IRes<IMovies> => apiService.get(urls.getByKeyword(keyword, id)),
    getMoviesById: (id: number): IRes<IMovie> => apiService.get(urls.getById(id)),
    getMoviesByGenre: (genreId: string): IRes<IMovies> => apiService.get(urls.getByGenre(genreId))
}

export {
    movieServices
}