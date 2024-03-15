import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Nav } from "react-bootstrap";
import Loadercomponent from './loader';
import style from './App.css'

const url = "https://superheroapi.com/api/24996598703318374/";



function App() {


  const [loading, setLoading] = useState(false);
  const [hero, sethero] = useState([]);
  const [heroname, setheroname] = useState([]);
  const [finding, found] = useState(false);
  const [searchHero, setsearchheroes] = useState([])

  function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const reset = ()=>{found(false)};

async function gettingheroes(input){
    const url = 'https://superheroapi.com/api/24996598703318374/search/'
    try {
        const res = await fetch(`${url}${input}`);
        const data = await res.json();
        console.log(data);
        setsearchheroes(data);
        found(true);
    } catch (error) {
        console.error("Error fetching hero:", error);
        return null;
    }
}


  async function fetchData() {
    setLoading(true);
    try {
      const allHeroes = [];
      const randomnum = getRandomNumber(0,720);
      console.log(randomnum)
      for (let i = randomnum; i <= randomnum+5 ; i++) {
        const response = await fetch(`${url}/${i}`);
        const data = await response.json();
        allHeroes.push(data);
      }
      console.log(allHeroes);
      sethero(allHeroes);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    reset();fetchData();
  }, []);

  if(loading){
    return(
    <div>
        <Loadercomponent />
    </div>
    );
  }

  if (finding) { 
    return (
        <div>
            <Nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <a className="navbar-brand" style={{color:'white'}}  href="#" onClick={reset}>SuperHeroAPI</a>
                <form onSubmit={(e) => {e.preventDefault(); gettingheroes(heroname)}} class="form-inline my-2 my-lg-0">
                <input onChange={(e) => setheroname(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </Nav>
            <h1 style={{color:'white'}}>Your Search results</h1>
            <div style={{display: 'flex' }}>
            {searchHero.results.slice(0, 7).map(hero => (  
            <div key={hero.id} className="card">
                <h2 className='name1'>{hero.name}</h2>
                <img src={hero.image.url} alt=":(" className="card-img-top" style={{width: "100%", height: "100%", objectFit: "cover", backgroundColor:'rgb(36, 36, 36)'}}/>
            </div>))}
            </div>
        </div>
    )
    }

  return (
    <div>
      <Nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" style={{color:'white'}} href="#">SuperHeroAPI</a>
        <form onSubmit={(e) => {e.preventDefault();  if (heroname && typeof heroname === 'string' && heroname.trim() !== '') {gettingheroes(heroname);}}} class="form-inline my-2 my-lg-0">
            <input onChange={(e) => setheroname(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Example bat" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </Nav>
      <h1 style={{color:'white', textAlign:'center'}}>Displays 5 random heroes from the API</h1>
      <div className='card-container'>
        {hero.map( myhero => (
        <div key={myhero.id} className="card">
            <div className="card-body" style={{padding:'0', margin:'0'}}>
                <div class="name">{myhero.name}</div>
                <img src={myhero.image.url} alt=":(" className="card-img-top" style={{width: "100%", height: "100%", objectFit: "cover", backgroundColor:'rgb(36, 36, 36)'}}/>
            </div>
       </div>
        ))}
      </div>
    </div>
  );
}

export default App;
