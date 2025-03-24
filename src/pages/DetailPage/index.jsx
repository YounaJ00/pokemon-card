import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loading } from '../../assets/Loading';
import { LessThan } from '../../assets/LessThan';
import { GreaterThan } from '../../assets/GreaterThan';


const DetailPage = () => {
  
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const params = useParams();
  const pokemonId = params.id;
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

  useEffect(() => {
    fetchPokeData();
  }, [])
  
  
  async function fetchPokeData() {
    const url = `${baseUrl}${pokemonId}`
    try {
      const {data: pokemonData} = await axios.get(url);
      
      if(pokemonData) {
        const {name, id, types, weight, height, stats, abilities} = pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
 
        const DamageRelations = await Promise.all(
          types.map(async(i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations
          })
        )

        
        const formattedPokemonData = {
          id,
          name,
          weight: weight/10,
          height: height/10,
          previous: nextAndPreviousPokemon.previous,
          next: nextAndPreviousPokemon.next,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations,
          types: types.map(type => type.type.name)
        }

        setPokemon(formattedPokemonData);
        setIsLoading(false);
      }


    } catch (error) {
      console.log(error);
      setIsLoading(false);

    }
  }

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD
  ]) => [
    {name: 'Hit Points', baseStat: statHP.base_stat},
    {name: 'Attack', baseStat: statATK.base_stat},
    {name: 'Defense', baseStat: statDEP.base_stat},
    {name: 'Special Attack', baseStat: statSATK.base_stat},
    {name: 'Special Defense', baseStat: statSDEP.base_stat},
    {name: 'Speed', baseStat: statSPD.base_stat}
  ]

  const formatPokemonAbilities = (abilities) => {
    return abilities.filter((_, index) => index <= 1)
                          .map((obj) => obj.ability.name.replaceAll('-', ' ') )
  }

  async function getNextAndPreviousPokemon(id) {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const {data: pokemonData} = await axios.get(urlPokemon); 

    const nextResponse = pokemonData.next && (await axios.get(pokemonData.next))
    const previousResponse = pokemonData.previous && (await axios.get(pokemonData.previous))

    return {
      next: nextResponse?.data?.results?.[0]?.name,
      previous: previousResponse?.data?.results?.[0]?.name
    };
  }

  if(isLoading) {
    return (
      <div className={
        `absolute h-auto w-auto top-1/3 -translate-x-1/2 lefr-1/2 z-50`
      }>
        <Loading className='w-12 h-12 z-50 animate-spin text-slate-900'/> 
      </div>
    )
  }

  if(!isLoading && !pokemon) {
    return (
      <div>...NOR FOUND!!!</div>
    )
  }

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
  const bg = `bg-${pokemon?.types?.[0]}`;
  const text = `text-${pokemon?.types?.[0]}`;
  console.log(pokemon, bg, text)

  

  return (
      <article className='flex items-center gap-1 flex-col w-full'>
          <div 
              className={
                `${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hiddenddddd`
              }>

                {/* 상세 페이지 previous & next */}
                {pokemon.previous && (
                  <Link
                    className='absolute top-[40%] -translate-y-1/2 z-50 left-1'
                    to={`/pokemon/${pokemon.previous}`}
                    >
                    <LessThan className='w-5 h-8 p-1' />
                  </Link>
                )}

                {pokemon.next && (
                  <Link
                    className='absolute top-[40%] -translate-y-1/2 z-50 right-1'
                    to={`/pokemon/${pokemon.next}`}
                    >
                    <GreaterThan className='w-5 h-8 p-1' />
                  </Link>
                )}
            dfjdkfjdkfjdf
          </div>
      </article>
  )
  

}

export default DetailPage