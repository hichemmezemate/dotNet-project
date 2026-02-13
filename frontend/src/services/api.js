import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5067/api',
});

export const sendDemande = async (demande, token) => {
    return api.post('/demande', demande, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};