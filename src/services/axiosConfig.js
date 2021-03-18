import axios from "axios";

export const AXIOS = axios.create({
    baseURL: 'https://api.themoviedb.org/4',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2I0MTQ5NGE0NTlkODc2MTkxYjYxNWUxMTc3Yjg1YyIsInN1YiI6IjYwMDU3M2UwZTk0MmVlMDAzZmU1YzBmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIJ_urD6sVscyvociKqS5WW1lYQ7jCbmeBvDFTy2VI8'
    }
});
