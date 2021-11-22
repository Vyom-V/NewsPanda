import React from 'react'

const NewsItem =(props)=> {

    let {title,description,imageUrl,newsUrl,author,date,source}=props;  //this is destructuring 
        return (
            <div className="my-3">
                <div className="card"> 
                     <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: '10',left:'85%'}}>{source}</span>
                    <img src={imageUrl} style={{height:"10rem" ,overflow:"hidden"}} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title" >{title}...</h5>
                        <p className="card-text" >{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">Read More</a>
                    </div>
                </div>
            </div>
        )

}

export default NewsItem
