import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import {FilmList} from "../../components";
import {genresService, moviesService} from '../../services';
import styles from './Home.module.css';


export const Home = () => {
    const history = useHistory();
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    const fetchMovies = async () => {
        try {
            const {page, results, total_pages, total_results} = await moviesService.getMovies();

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

    const fetchMoviesData = async () => {
        const request = [fetchMovies(), fetchGenres()];
        try {
            setIsLoading(true);

            const [movies, genres] = await Promise.all(request);

            const mergeWithGenresMovies = movies.map(movie => {
                const {genre_ids} = movie;
                const movieGenresList = genre_ids.map(genreId => genres.find(el => el.id === genreId));

                return {...movie, movieGenresList};
            })

            setMoviesList(mergeWithGenresMovies);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMoviesData();
    }, []);

    const renderLoadingIndicator = () => (
        <div className={styles.loading}>Loading...</div>
    )

    const onFilmClick = (film) => {
        history.push(`/movie/${film.id}`);
    }

    return (
        <div>
            {/*{ true ? renderLoadingIndicator() : <FilmList/> }*/}
            {isLoading || isLoading === null ? renderLoadingIndicator() : (
                <FilmList
                    onFilmClick={onFilmClick}
                    items={moviesList}/>)}
        </div>
    )
}
