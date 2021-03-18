import React, { useEffect, useState } from 'react';
import { FilmList } from "../components";
import { moviesService } from '../services';
import styles from './Home.module.css';


export const Home = () => {
    const [ moviesList, setMoviesList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(null);

    const fetchMovies = async () => {
        try {
            setIsLoading(true);
            const { page, results, total_pages, total_results } = await moviesService.getMovies();

            setMoviesList(results);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }

        console.log(moviesList)
    }
    useEffect(() => {
        fetchMovies();
    }, []);

    const renderLoadingIndicator = () => (
        <div className={styles.loading}>Loading...</div>
    )

    return (
        <div>
            {/*{ true ? renderLoadingIndicator() : <FilmList/> }*/}
            {isLoading || isLoading === null ? renderLoadingIndicator() : <FilmList items={moviesList}/>}
        </div>
    )
}
