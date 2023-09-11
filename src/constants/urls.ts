const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesById: (id: string) => `/discover/movie?page=${id}`,
    getGenres: '/genre/movie/list'
}

export {
    urls,
    baseURL
}