import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResult from '../../assets/no-results.png'
import Spinner from  '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'
import "./style.scss"
 const SearchResult = () => {
    
  const[data, setData]=useState(null)
  const[pageNum, setPageNum]=useState(1)
  const[loading, setLoading]=useState(false)
  const { query } = useParams(); 
console.log(query)
  const fetchInitialData =()=>{
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
        setData(res)
        setPageNum((prev)=> prev +1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData =()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
       if(data?.results){
        setData({
          ...data,
            results: [...data?.results,...res.results]
        }); 
       }else{
         setData(res);
       }
        setPageNum((prev)=> prev +1);
      }
    );
  }
  useEffect(()=>{
    setPageNum(1)
      fetchInitialData();
    },[query])



  return (
    <div className='searchResultsPage'>
      {loading &&<Spinner initial={true}/>   }
      {!loading &&(
          <ContentWrapper>
            {data?.results?.length > 0 ?(
              <>
              <div className="pageTitle">
                {`Search ${data.total_results > 
                  1 ? "results" : "result"} of '${query}'`}
              </div>
              <InfiniteScroll
              className='content'
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore ={pageNum <=data?.total_pages}
              loader ={<Spinner/>}
              >
                {data?.results?.map((item, i)=>{
                  if(item.media_type == "person") return;
                  return(
                    <MovieCard key={i} data={item} fromSearch={true } />
                  )
                })}
              </InfiniteScroll>
              </>
            ):(
              <span className ="resultNotFound">
                 Sorry, Results Not Found
              </span>
            )}
          </ContentWrapper>
        )
      }

    </div>
  )
}
export default SearchResult

