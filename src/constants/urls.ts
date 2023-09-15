const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesByPage: (id: string): string => `/discover/movie?page=${id}`,
    getGenres: '/genre/movie/list',
    getById: (id: string): string => `/movie/${id}`,
    getByKeyword: (keyword: string, id: string): string => `/search/movie?query=${keyword}&page=${id}`,
    getByGenre: (genreId: string, id: string):string => `/discover/movie?with_genres=${genreId}&page=${id}`
}

export {
    urls,
    baseURL
}