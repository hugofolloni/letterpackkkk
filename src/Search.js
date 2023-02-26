import { useState, useEffect } from "react";

const Search = () => {

    const [searchText, setSearchText] = useState('')
    const [responseList, setResponseList] = useState([])

    useEffect(() => {
        const search = window.location.pathname.replace("/search/", "").replace("%20", " ");
        setSearchText(search);

        var fullList = [];
        var pages = 1;
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=85fb53159e5493391c6fbf87a733cfeb&language=pt&query=${search}&page=1`)
        .then(res => res.json())
        .then(data => {
            pages = data.total_pages;
            fullList.push(...data.results);
            console.log(fullList, pages)
        })
        .then(() => {
            for (var i = 2; i < pages; i++) {
                console.log(i)
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=85fb53159e5493391c6fbf87a733cfeb&language=pt&query=${search}&page=${i}`)
                .then(res => res.json())
                .then(data => {
                    fullList.push(...data.results);
                })
            }
        })	
        .then(() => {
            console.log(fullList)
            fullList.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
            const searchResponse = fullList.slice(0, 30);
            setResponseList(searchResponse);
        })
    
    }, [])


    return ( 
        <div className="search-results-div">
            <div className="response-list-div">
                {responseList.map((response) => {
                    return (<MoviePoster response={response}/>)
                })}
            </div>
        </div>
     );
}

const MoviePoster = (props) => {
    const response = props.response
    const imgSrc = "https://image.tmdb.org/t/p/w300" + response.poster_path;

    const [side, setSide] = useState("front")

    return (
        <div className="response-div" onMouseEnter={() => setSide("back")} onMouseLeave={() => setSide("front")} onClick={() => window.location.href=`/movie/${response.id}`}>
            {side === "back" ? (
                <div className="back">
                    <h3>{response.title}</h3>
                    <p>{response.overview}</p>
                </div>
            ) : (
                <div className="front">
                    <img src={imgSrc} alt="poster" />
                </div>
            )}
        </div>
    )
}
 
export default Search;