import { getAnimeList } from "@/src/sevices/getAnimeList";
import AnimeList from "@/src/components/anime/animeList";
import { Header } from "@/src/components/header/header";
import SearchAnimeComponent from "@/src/components/anime/searchAnime";

const handleFetch = async () => {
    try {
        const data = await getAnimeList();
        console.log('Lista de animes:', data);
    } catch (error) {
        console.error('Erro ao buscar animes:', error);
    }
};


export default function Home() {

    return (
        <div className="flex flex-col justify-center">

            <Header />

            <div className="w-full flex justify-center my-4">
                <SearchAnimeComponent />
            </div>

        </div>
    );
}