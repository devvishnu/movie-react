import React from 'react'
import "./HeroBanner.scss"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import ContentWrapper  from "../../../components/contentWrapper/ContentWrapper"
import Img from '../../../components/lazyloadimages/Img'



const HeroBanner = () => {
 
  const[background, setbackground]=useState('');
  const[query, setQuery]=useState('');
   const navigate =useNavigate();
     
   const{url} =useSelector((state)=>state.home)

   const{data,loading} =useFetch("/movie/upcoming")

   useEffect(()=>{
    const bg =url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
    setbackground(bg)
   },[data])
  const searchQueryHandler=(event)=>{
    if(event.key === "Enter" && query.length>0){
      navigate(`/search/${query}`)
    }
  };

  return (
    <div className="heroBanner">
     {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>}
      <div className="opacity-layer">

      </div>
      <ContentWrapper>
          <div className="heroBannerContant">
            <span className="title">welcome</span>
            <span className="subTytle">
              millions of movies, TV shows and people to discover. Explore now.
            </span>
              <div className="searchInput">
                <input 
                  type="text"
                  placeholder='Search for a movie or tv show....'
                  onKeyUp={searchQueryHandler}
                  onChange={(e)=>setQuery(e.target.value)}
                />
                <button>Search</button>
              </div>
          </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner