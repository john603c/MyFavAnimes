import api from "./api";

export async function SearchAnime(query: string) {

    try {
        const response = await api.get('/anime', {
            params: { q: query },
        });
        return response.data.data || [];
    } catch (error) {
        console.error('Erro ao buscar animes:', error);
        throw error;
    }

};