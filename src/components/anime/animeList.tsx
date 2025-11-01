'use client';

import { useState } from 'react';
import { getAnimeList } from '@/src/sevices/getAnimeList';
import Image from 'next/image';

interface Anime {
    mal_id: number;
    title: string;
    episodes: number | null;
    images: {
        jpg: {
            image_url: string;
        };
    };
}

export default function AnimeList() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);

    const handleFetch = async () => {
        try {
            const data = await getAnimeList();
            setAnimeList(data);
            console.log('Lista de animes:', data);
        } catch (error) {
            console.error('Erro ao buscar animes:', error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <button
                onClick={handleFetch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
                Buscar Animes
            </button>

            <ul className="flex flex-wrap mt-6 w-full">
                {animeList.map((anime) => (
                    <li
                        key={anime.mal_id}
                        className="bg-white p-3 rounded shadow-sm text-gray-800 w-[25%]"
                    >
                        <img src={anime.images.jpg.image_url} />
                        {anime.title}
                        {anime.episodes ? ` - ${anime.episodes} episódios` : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}
