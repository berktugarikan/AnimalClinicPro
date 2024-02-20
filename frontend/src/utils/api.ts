import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Örnek bir GET isteği
export const fetchData = async (path) => {
    try {
        const response = await api.get(path);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
    }
};

// Örnek bir POST isteği
export const postData = async (path, data) => {
    console.log(data)
    try {
        const response = await api.post(path, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('Error posting data');
    }
};

// Diğer istekler buraya eklenebilir

export default api;
