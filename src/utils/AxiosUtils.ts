import axios from 'axios';


export const getAxios = () => {


    const axiosInstance = axios.create({
        timeout: process.env.REACT_APP_DEFAULT_TIMEOUT ? parseInt(process.env.REACT_APP_DEFAULT_TIMEOUT) : 0,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    return axiosInstance;
}
