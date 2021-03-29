import React, { useEffect, useState } from 'react';
import styles from './MovieDetails.module.css';
import { useParams, useRouteMatch } from "react-router";
import { moviesService } from '../../services';
import { toast } from 'react-toastify';

export const MovieDetails = () => {
    const [filmDetails, setFilmDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    // const { params: { id }} = useRouteMatch();
    const { id, ...rest } = useParams();
    console.log(id)

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
    console.log(filmDetails)
    return (
        <div>
            <h1>{filmDetails.original_title}</h1>
            <h2>{filmDetails.tagline}</h2>
            <h3>{filmDetails.genres.map(el => <span key={el.id}>-{el.name}-</span> )}</h3>
            <p>{filmDetails.overview}</p>
        </div>
    )
}
