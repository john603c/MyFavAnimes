import api from "./api";

export const getAnimeList = async () => {
    try {
        const response = await api.get('/anime');
        return response.data.data; // A lista de animes vem em "data.data"
    } catch (error) {
        console.error('Erro ao buscar lista de animes:', error);
        throw error;
    }
};