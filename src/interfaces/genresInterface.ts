interface IGenre{
    id: number;
    name: string;
}

interface IGenres<DATA>{
    genres: DATA[]
}

export type{
    IGenre,
    IGenres
}