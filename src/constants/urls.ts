const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesById: (id: string) => `/discover/movie?page=${id}`
}

export {
    urls,
    baseURL
}