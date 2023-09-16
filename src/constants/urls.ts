const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesByPage: (id: string): string => `/discover/movie?page=${id}`,
    genres: '/genre/movie/list',
    byId: (id: string): string => `/movie/${id}`,
    byKeyword: (keyword: string, id: string): string => `/search/movie?query=${keyword}&page=${id}`,
    byGenre: (genreId: string, id: string):string => `/discover/movie?with_genres=${genreId}&page=${id}`,
    byActors: (id: string):string => `movie/${id}/casts`
}

export {
    urls,
    baseURL
}