import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { FilmList, PaginationWrapper } from "../../components";
import { genresService, moviesService } from '../../services';
import { mergeMoviesWithGenres } from '../../utils';
import styles from './Home.module.css';


export const Home = () => {
    const history = useHistory();
    const [genresList, setGenresList] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [moviesData, setMoviesData] = useState(null);

    const fetchMovies = async (params) => {
        try {
            return await moviesService.getMovies(params);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchGenres = async () => {
        try {
            const { genres } = await genresService.getGenres();

            return genres;
        } catch (e) {
            console.error(e);
        }
    }


    const fetchMoviesData = async (params) => {
        const request = [ fetchMovies(params), fetchGenres() ];

        try {
            setIsLoading(true);

            const [{ results, ...rest }, genres ] = await Promise.all(request);

            setMoviesData({ movies: mergeMoviesWithGenres(results, genres), ...rest });
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

    const handlePageChange = async (page) => {
        const { results, ...rest } = await fetchMovies({ page });

        setMoviesData({
            movies: mergeMoviesWithGenres(results, genresList),
            ...rest
        });
    }

    return (
        <div>
            {isLoading || isLoading === null ? renderLoadingIndicator() : (
                <PaginationWrapper
                    currentPage={moviesData.page}
                    totalPages={moviesData.total_pages}
                    onPreviousClick={handlePageChange}
                    onNextClick={handlePageChange}
                    handleFirstPage={handlePageChange}
                    handleLastPage={handlePageChange}
                    >

                    <FilmList
                        onFilmClick={onFilmClick}
                        items={moviesData.movies}
                        key={moviesData.movies.id}
                    />
                </PaginationWrapper>
            )}
        </div>
    )
}
