import { useState,useEffect } from 'react'
import { BrowserRouter,Routes,Route  } from 'react-router-dom'
import {fetchDataFromApi}  from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import{getApiConfiguration,getGenres} from './features/HomeSlice'
import { Home } from './pages/home/Home'
 import Footer from './components/footer/Footer'
 import Header from './components/header/Header'
 import Detalis  from './pages/detalis/Detalis'
 import  SearchResult  from './pages/seaechResult/SearchResult'
import  Explore  from './pages/explore/Explore'
import { PageNotFound } from './pages/4O4/PageNotFound'


function App() {

  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)

 useEffect(()=>{
  fetchApiConfig()
  genrescall()
 },[])
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration")
         .then((res) =>{
          console.log(res)

          const url ={
            backdrop:res.images.secure_base_url + "original",
            poster:res.images.secure_base_url + "original",
            profile:res.images.secure_base_url + "original",
          }

          dispatch(getApiConfiguration(url))
         })
  };
  const genrescall =async ()=>{
    let promises =[];
    let endPoint =['tv','movie']
    let allGneres ={};
     
    endPoint.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    });
   const data = await Promise.all(promises)
   data.map(({genres})=>{
    return genres.map((item)=>(allGneres[item.id]= item))
   });
   dispatch(getGenres(allGneres));

  }
  return (
   <BrowserRouter>
   <Header/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Detalis/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
       </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
