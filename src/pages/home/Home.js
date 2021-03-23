import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {FilmList} from "../../components";
import {genresService, moviesService} from '../../services';
import styles from './Home.module.css';
import {PaginationWrapper} from "../../components";

export const Home = () => {
    const history = useHistory();
    const [moviesList, setMoviesList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [movieData, setMovieData] = useState(null);

    const fetchMovies = async (params) => {
        try {
            const {page, results, total_pages, total_results} = await moviesService.getMovies(params);

            setMovieData({page, results, total_pages, total_results});

            return results;
        } catch (e) {
            console.error(e);
        }
    }

    const fetchGenres = async () => {
        try {
            const {genres} = await genresService.getGenres();

            return genres;
        } catch (e) {
            console.error(e);
        }
    }

    const fetchMoviesData = async (movieParams) => {
        const request = genresList.length ? [ fetchMovies(movieParams) ] : [ fetchMovies(movieParams), fetchGenres() ];

        try {
            setIsLoading(true);

            const [ movies, genres = genresList ] = await Promise.all(request);

            const mergeWithGenresMovies = movies.map(movie => {
                const { genre_ids } = movie;
                const movieGenresList = genre_ids.map(genreId => genres.find(el => el.id === genreId));

                return { ...movie, movieGenresList };
            })

            setMoviesList(mergeWithGenresMovies);
            setGenresList(genres);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMoviesData();
    }, []);

    const renderLoadingIndicator = () => <div className={styles.loading}>Loading...</div>;

    const onFilmClick = (film) => history.push(`/movie/${film.id}`);

    const handlePageChange = (page) => fetchMoviesData({ page });

    return (
        <div>
            {isLoading || isLoading === null ? renderLoadingIndicator() : (
                <PaginationWrapper
                    currentPage={movieData.page}
                    totalPages={movieData.total_pages}
                    onPreviousClick={handlePageChange}
                    onNextClick={handlePageChange}
                    handleFirstPage={handlePageChange}
                    handleLastPage={handlePageChange}
                    >
                    <FilmList
                        onFilmClick={onFilmClick}
                        items={moviesList}/>
                </PaginationWrapper>
            )}
        </div>
    )
}
