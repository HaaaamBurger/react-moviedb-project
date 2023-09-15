import {apiService, IRes} from "./apiService";
import {IGenre, IGenres, IMovieDetails, IMovies} from "../interfaces";
import {urls} from "../constants";


const movieServices = {
    getMoviesByPage: (id: string): IRes<IMovies> => apiService.get(urls.moviesByPage(id)),
    getGenres: (): IRes<IGenres<IGenre>> => apiService.get(urls.getGenres),
    getMoviesByKeyword: (keyword: string, id: string): IRes<IMovies> => apiService.get(urls.getByKeyword(keyword, id)),
    getMovieById: (id: string): IRes<IMovieDetails> => apiService.get(urls.getById(id)),
    getMoviesByGenre: (genreId: string, id: string): IRes<IMovies> => apiService.get(urls.getByGenre(genreId, id))
}

export {
    movieServices
}