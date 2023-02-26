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

    useEffect(() => {
        const movieId = window.location.pathname.replace("/movie/", "");

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=85fb53159e5493391c6fbf87a733cfeb&language=pt`)
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
    }, [])

    return ( 
        <div className='movie-div'>
           <img src={movieBackground} alt="" className='backdrop'/>
           <div className="movie-infos">
                <img src={moviePoster} alt="" />  
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
                    </div>
                    
                </div>
           </div>
        </div>
     );
}
 
export default Movie;