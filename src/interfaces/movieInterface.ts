export interface IMovie {
    page: number,
    results: [
        genre_ids: number[],
        original_title: string,
        overview: string,
        poster_path: string,
        release_date: string
    ]
}