import React from 'react'
import { useEffect,useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const Newscomp=(props)=> {
     const [articles, setarticles] = useState([]);
     const [loading, setloading] = useState(false);
     const [page, setpage] = useState(1);
     const [totalResults, settotalResults] = useState(0);

    const fetchMoreData = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cata}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`;
        setpage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setloading(false)
    }

    const updateNews =async ()=>{
        props.setProgress(10); 
        let url =   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cata}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
        setloading(true)
        props.setProgress(30); 
        let data = await fetch(url);
        props.setProgress(50); 
        let parsedData = await data.json();
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        props.setProgress(100); 
    }

    useEffect(() => {
        document.title=`NewsPanda - ${props.cata.toUpperCase()}`;
        updateNews();
    }, []) 

    //pagination using class based didnt change to function based as no longer useful after infinite scroll
    // handlePrevClick= async () => {

    //     this.setState({ 
    //          page: this.state.page-1,
    //          loading:false,
    //         })
    //         this.updateNews();

    // } 
    //  handleNextClick = async ()=> {
    //      if(!(this.state.page + 1>Math.ceil(this.state.totalResults/props.pagesize))){
    //     this.setState({ 
    //          page: this.state.page+1,
    //          loading:false,
    //         })
    //         this.updateNews();
    //     }
    // }
        return (
            <div className="container">
                    <h1 className="mb-2 text-center" style={{marginTop:"5rem"}}>NewPanda - Top {props.cata.toUpperCase()} Headlines:</h1>
                    {loading && <Spinner/>}
                    <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!== totalResults}
                    loader={<Spinner/>}
                    >
                <div className="row ">
                    {articles.map((ele)=>{
                        return <div className="col-md-4 my-2 h-25" style={{height:"25rem",overflow:"hidden"}} key={ele.url}>
                                <NewsItem title={ele.title?ele.title.slice(0,50):""} description={ele.description?ele.description.slice(0,100):""} imageUrl={ele.urlToImage?ele.urlToImage:"https://source.unsplash.com/user/erondu/1600x900"} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                                </div>
                    })}                       
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-evenly my-lg-5">
                    <button disabled={this.state.page<=1} type="button" className="mx-2 my-2 btn btn-outline-secondary" onClick={this.handlePrevClick}> &larr; Prev</button>
                    <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/props.pagesize)} type="button" className="mx-2 my-2 btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
}

Newscomp.defaultProps = {
    country: "in",
    cata:"general",
    pagesize: 9,
}
Newscomp.propTypes = {
    country: PropTypes.string,
    cata: PropTypes.string,
    pagesize:PropTypes.number,
}

export default Newscomp
