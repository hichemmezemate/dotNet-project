import axios from 'axios';

const BASE_URL = 'http://localhost:5067/api';

export const createDemande = async (demande, token) => {
    return await axios.post(`${BASE_URL}/Demande`, demande, {
        headers: { Authorization: `Bearer ${token}` }
    });
};