import { GetStaticProps } from 'next';
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurantionToTimeString } from '../utils/convertDurantionToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  published_at: string;
  // ...  
};

type HomeProps = {
  episodes: Episode[]; //or Array<Episode>
};

// Usando o useEffect eu estou usando o SPA.
export default function Home(props: HomeProps) {

  return (
    <h1>Index</h1>
  );
};

// Usando SSG para buscar os dados da API
export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('episodes', {
    params: {
      _limit:12,
      _sort: 'published_at',
      _order: 'desc',
    }
  });
  
  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurantionToTimeString(episode.file.duration),      
      description: episode.description,
      url: episode.fiel.url,
    }
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // revalidando a API a cada 8 horas.
  }
};



//Usando o SSR para buscar os dados da API
/* export async function getServerSideProps(){
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }
}
 */