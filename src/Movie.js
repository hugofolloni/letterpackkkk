import { useEffect, useState } from 'react';

const Movie = () => {

    const [movieTitle, setMovieTitle] = useState('')
    const [movieBackground, setMovieBackground] = useState('')
    const [moviePoster, setMoviePoster] = useState('')
    const [movieOverview, setMovieOverview] = useState('')
    const [movieReleaseDate, setMovieReleaseDate] = useState('')
    const [movieRuntime, setMovieRuntime] = useState('')
    const [movieGenres, setMovieGenres] = useState([])
    const [movieRating, setMovieRating] = useState('')
    const [movieProviders, setMovieProviders] = useState([])

    useEffect(() => {
        const movieId = window.location.pathname.replace("/movie/", "");

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=85fb53159e5493391c6fbf87a733cfeb&language=pt-br`)
        .then(res => res.json())
        .then(data => {
            setMovieTitle(data.title);
            setMovieBackground("https://image.tmdb.org/t/p/original" + data.backdrop_path);
            setMoviePoster("https://image.tmdb.org/t/p/w300" + data.poster_path);
            setMovieOverview(data.overview);
            setMovieReleaseDate(data.release_date.split('-')[0]);
            setMovieRuntime(data.runtime);
            setMovieGenres(data.genres[0].name);
            setMovieRating(data.vote_average);
        })

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=85fb53159e5493391c6fbf87a733cfeb&language=pt-br`)
        .then(res => res.json())
        .then(data => {
            var imageProviders = []
            if(data.results.BR.flatrate !== undefined){
                for (var i = 0; i < data.results.BR.flatrate.length; i++) {
                    imageProviders.push(data.results.BR.flatrate[i].logo_path)
                }
            }
            if(imageProviders.length === 0 && data.results.BR.rent !== undefined){
                for(i = 0; i < data.results.BR.rent.length; i++){
                    imageProviders.push(data.results.BR.rent[i].logo_path)
                }
            }
            if(imageProviders.length === 0 && data.results.BR.buy !== undefined){
                for(i = 0; i < data.results.BR.buy.length; i++){
                    imageProviders.push(data.results.BR.buy[i].logo_path)
                }
            }
            setMovieProviders(imageProviders)
        })

    }, [])

    return ( 
        <div className='movie-div'>
           <img src={movieBackground} alt="" className='backdrop'/>
           <div className="movie-infos">
                <img className='movie-poster' src={moviePoster} alt="" />  
                <div className='movie-infos-p-div'>
                    <div className="movie-infos-p-div-first-row">
                        <h1>{movieTitle}</h1>
                        <p>{(Number(movieRating) / 2).toFixed(1)}</p>    
                    </div>
                    <p>{movieOverview}</p>  
                    <div className='more-infos'>
                        <p>{movieGenres}</p>
                        <p>{movieReleaseDate}</p>
                        <p>{movieRuntime} min</p>
                        <div className="movie-providers-div">
                            {movieProviders.map((provider) => {
                                return (<img  src={`https://image.tmdb.org/t/p/w300${provider}`} alt="provider" />)
                            })}
                        </div>
                    </div>
                    
                </div>
           </div>
        </div>
     );
}
 
export default Movie;