'use client';

import { useState, useEffect } from 'react';
import { SearchAnime } from '@/src/sevices/searchAnime';

import { Star } from 'lucide-react';

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
        <div className="w-full md:w-lg p-4">
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

            <ul className="flex flex-col mt-4 space-y-3">
                {results.map((anime) => (
                    <li key={anime.mal_id} className="flex items-start gap-3 pb-2>">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="max-w-[150px] object-cover rounded"
                        />
                        <div>
                            <h2 className="flex text-sm gap-3 items-start mt-3 mb-1 font-semibold">
                                {anime.title} 
                                <span className='flex items-center gap-1 text-sm text-yellow-500'><Star size={12} />{anime.score || 'N/A'}</span>
                            </h2>
                            <p className="text-xs text-gray-500">{anime.year || 'Ano desconhecido'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
