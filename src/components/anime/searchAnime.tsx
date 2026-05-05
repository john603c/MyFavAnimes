'use client';

import { useState, useEffect } from 'react';
import { SearchAnime } from '@/src/sevices/searchAnime';

import { Star } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Heart } from 'lucide-react';

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

            <div className='flex flex-row gap-4 items-center'>

            <p className="text-lg font-bold text-center">Buscar</p>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Digite o nome do anime..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />

            </div>

            {loading && <p className="text-center mt-3">Carregando...</p>}
            {error && <p className="text-center text-red-500 mt-3">{error}</p>}

            <ul className="flex flex-col mt-4 space-y-3">
                {results.map((anime) => (
                    <li key={anime.mal_id} className="flex items-start gap-3 min-h-[212px] border-2 border-gray-400 bg-white rounded-lg p-2">
                        
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="max-w-[150px] max-h-[212px] object-cover rounded my-auto"
                        />

                        <div className='grid gap-1 min-h-[212px] w-full'>

                            <div className='flex flex-col gap-0.5'>
                                <h2 className="flex text-lg gap-3 items-start m-0 font-semibold">
                                    {anime.title} 
                                </h2>

                                {/*<p className="text-xs italic text-gray-500">{anime.year || 'Ano desconhecido'}</p> */}
                                <span className='flex items-center gap-1 text-lg text-yellow-500'><Star size={18} />{anime.score || 'N/A'}</span>
                            </div>
                            
                            <div className='grid grid-cols-2 mx-auto w-full'>
                                
                                <span className=' flex items-center justify-center gap-1 text-xs'><Eye size={18} className='text-gray-500' /> Detalhes</span>
                                
                                <span className='flex items-center justify-center gap-1 text-xs'><Heart size={18} className='text-red-500' />Favoritar</span>
                                
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
