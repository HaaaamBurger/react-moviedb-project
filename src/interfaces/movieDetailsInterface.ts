interface IGenres{
    id: number;
    name: string;
}

interface ICompanies{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface IContries{
    iso_3166_1: string;
    name: string;
}

interface ILanguages{
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number,
        name: string,
        poster_path: string,
        backdrop_path: string
    };
    budget: number;
    genres: IGenres[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ICompanies[];
    production_countries: IContries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ILanguages[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}