import React, { useEffect , useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRows';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


export default ()=>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackheader, setbBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{

    let list = await Tmdb.getHomeList();
    setMovieList(list);

    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');  
    setFeaturedData(chosenInfo);
  }
  loadAll();
  }, []);
  
 useEffect(()=>{
   const scrollListener = () =>{
        if(window.scrollY > 10){
          setbBlackHeader(true);
        }else{
          setbBlackHeader(false);
        }
   }
   window.addEventListener('scroll',scrollListener);

   return ()=>{
     window.removeEventListener('scroll',scrollListener);
   }
 },[]);


  return(
    <div className="page">
      <Header black={blackheader}/>

      {featuredData &&
      <FeaturedMovie item={featuredData}/>
      }
        <section className="lists">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
          </section>
          <footer>
            Projeto Netflix-Clone-UI desenvolvido e mantido por:<br/> <a href="">@moraisbandeira</a><br/>
            Dados pegos da API do site Themoviedb.org <span role="img" aria-label="laptop">💻</span>
          </footer>
          {movieList.length <= 0 && 
          <div className="loading">
            <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2000,c_limit/Netflix_LoadTime.gif" alt="carregando"/>
          </div>
          }
    </div>
  );
}