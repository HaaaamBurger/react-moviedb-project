const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesByPage: (id: string) => `/discover/movie?page=${id}`,
    getGenres: '/genre/movie/list',
    getByKeyword: '/search/movie'
}

export {
    urls,
    baseURL
}