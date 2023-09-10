import {apiService, IRes} from "./apiService";
import {IMovie} from "../interfaces";
import {urls} from "../constants";

const movieServices = {
    getMoviesById: (id: string): IRes<IMovie> => apiService.get(urls.moviesById(id))
}

export {
    movieServices
}