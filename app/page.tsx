'use client';

import { useRouter } from 'next/navigation';

export default function InitApp() {
  const router = useRouter();
  const goToPage = () => {
    router.push('/main/home');
  };

  return (
    <div className="flex w-full h-full bg-[#000000]">
      <h1>Welcome to the Anime App</h1>
      <p>Esta aplicação foi desenvolvida utilizando Next.js</p>
      <p>Você pode navegar livremente pela aplicação e conhecer seus recursos</p>
      <p>Baseada na API Jikan MyAnimeList</p>

      <button
        className="bg-amber-400"
        onClick={goToPage}
      >
        Começar!
      </button>
    </div>
  );
}
