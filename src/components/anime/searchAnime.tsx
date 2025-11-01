'use client';

import { useState, useEffect } from 'react';
import { SearchAnime } from '@/src/sevices/searchAnime';

export default function SearchAnimeComponent() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                setLoading(true);
                setError('');
                const data = await SearchAnime(query);
                setResults(data);
            } catch {
                setError('Erro ao buscar animes.');
            } finally {
                setLoading(false);
            }
        }, 500); // debounce de 500ms

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Buscar Anime</h1>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Digite o nome do anime..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />

            {loading && <p className="text-center mt-3">Carregando...</p>}
            {error && <p className="text-center text-red-500 mt-3">{error}</p>}

            <ul className="mt-4 space-y-3">
                {results.map((anime) => (
                    <li key={anime.mal_id} className="flex items-center gap-3 border-b pb-2">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                            <h2 className="font-semibold">{anime.title}</h2>
                            <p className="text-sm text-gray-500">{anime.year || 'Ano desconhecido'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
