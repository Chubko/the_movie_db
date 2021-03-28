export const mergeMoviesWithGenres = (movies, genres) => {
    return  movies.map(movie => {
        const { genre_ids } = movie;
        const movieGenresList = genre_ids.map(genreId => genres.find(el => el.id === genreId));

        return { ...movie, movieGenresList };
    })
}
