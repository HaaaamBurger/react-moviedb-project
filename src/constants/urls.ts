const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    moviesByPage: (id: string) => `/discover/movie?page=${id}`,
    getGenres: '/genre/movie/list',
    getById: (id: number) => `/movie/${id}`,
    getByKeyword: (keyword: string, id: string) => `/search/keyword?query=${keyword}&page=${id}`
}

export {
    urls,
    baseURL
}