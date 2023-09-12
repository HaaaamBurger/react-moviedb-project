const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesByPage: (id: string) => `/discover/movie?page=${id}`,
    getGenres: '/genre/movie/list'
}

export {
    urls,
    baseURL
}