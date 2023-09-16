import {apiService, IRes} from "./apiService";
import {IGenre, IGenres, IMovieDetails, IMovies} from "../interfaces";
import {urls} from "../constants";


const movieServices = {
    getMoviesByPage: (id: string): IRes<IMovies> => apiService.get(urls.moviesByPage(id)),
    getGenres: (): IRes<IGenres<IGenre>> => apiService.get(urls.genres),
    getMoviesByKeyword: (keyword: string, id: string): IRes<IMovies> => apiService.get(urls.byKeyword(keyword, id)),
    getMovieById: (id: string): IRes<IMovieDetails> => apiService.get(urls.byId(id)),
    getMoviesByGenre: (genreId: string, id: string): IRes<IMovies> => apiService.get(urls.byGenre(genreId, id)),
    getActors: (id: string): IRes<any> => apiService.get(urls.byActors(id))
}

export {
    movieServices
}