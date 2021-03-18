import { AXIOS } from './axiosConfig';

class MoviesService {
    async getMovies() {
        const { data } = await AXIOS.get('/discover/movie');
        return data;
    }

    async getMovieDetailsById(movieId) {
        const { data } = await AXIOS.get(`/movie/${movieId}`);
        return data;
    }
}

export const moviesService = new MoviesService();
