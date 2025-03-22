import { use, useEffect, useState } from 'react'
import axios from 'axios'; 
import PokeCard from '../../components/PokeCard';
import AutoComplete from '../../components/AutoComplete';


function MainPage() {
  
  // a-b 지우고 e
  // e. 모든 포켓몬 데이터를 가지고 있는 state
  const [allPokemons, setAllpokemons] = useState([]);

  // f. 실제 리스트로 보여주는 포켓몬 데이터를 가지고 있는 state
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  // g. 한번에 보여주는 포케몬 수
  const limitNum = 20; 
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  // c. 검색기능 - autocomplete 으로 감
   const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {  // a
    fetchPokeData();
  }, [])


  const filterDisplayedPokemonData = (allPokemonData, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum;
    // 모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기
    const array = allPokemonData.filter((pokemon, index) => index + 1 <= limit);
    return array;
  }
  
  const fetchPokeData = async() => {
    try { // b
      // 1008 개의 포케몬 데이터 받아오기
      const response = await axios.get(url); 
      // console.log(response.data.results);
      // 모든 포케몬 데이터 기억하기
      setAllpokemons(response.data.results)
      // 실제로 화면에 보여줄 포케몬 리스트 기억하는 state
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.log(error);
    }
  }



  return ( 
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <AutoComplete 
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
          searchTerm={searchTerm}  
          setSearchTerm={setSearchTerm} />
      </header>
      <section className='pt-6 flex flex-col justify-center items-center'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>

          {displayedPokemons.length > 0 ? 
          (
            displayedPokemons.map(({url, name}, index) => (
                <PokeCard key={url} url={url} name={name}/>
            ))
          ) : 
          (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>
              포켓몬이 없습니다!
            </h2>
          )}
        </div>
      </section>
      <div className='text-center'>
          {(allPokemons.length > displayedPokemons.length) && (displayedPokemons.length !==1) && 
            (
              <button
              onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allPokemons, displayedPokemons))}
                className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>
                More
              </button>) 
          }
         
         
      </div>
    </article>
  )
}

export default MainPage
