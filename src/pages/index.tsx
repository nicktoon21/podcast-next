// Usando o useEffect eu estou usando o SPA.
export default function Home(props) {

  console.log(props.episodes);

  return (
    <h1>Index</h1>
  )
}


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


// Usando SSG para buscar os dados da API
export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return { 
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // revalidando a API a cada 8 horas.
  }
}