import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import styles from './MovieDetails.module.css';
import {useParams, useRouteMatch} from "react-router";
import {moviesService} from '../../services';
import {ImagePathBuilder} from '../../utils';


export const MovieDetails = () => {
    const [filmDetails, setFilmDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    // const { params: { id }} = useRouteMatch();
    const {id, ...rest} = useParams();

    console.log(filmDetails)

    const getMovieDetails = async () => {
        try {
            setIsLoading(true);

            const data = await moviesService.getMovieDetailsById(id);

            setFilmDetails(data);

            toast.success('Data loaded!');
        } catch (e) {
            console.error(e);
            toast.error('Error!');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    if (isLoading || !filmDetails || isLoading === null) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.container}>
            <img className={styles.poster} src={ImagePathBuilder(filmDetails.poster_path)}
                 alt={`${filmDetails.original_title} poster`}/>
            <div className={styles.movieDetails}>
                <h1>{filmDetails.original_title}</h1>
                <h2>{filmDetails.tagline}</h2>
                <h3>{filmDetails.genres.map(el => <span key={el.id}>-{el.name}-</span>)}</h3>
                <p>{filmDetails.overview}</p>
            </div>
        </div>
    )
}
