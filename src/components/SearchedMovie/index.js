import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';
const ImageBasePath = 'https://image.tmdb.org/t/p/w500';

const SearchedMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchMovies = async (query) => {
      try {
        const response = await axios.get(
          `${BaseUrl}/search/movie?api_key=${ApiKey}&language=en-US&query=${query}&page=1`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      searchMovies(query);
    }
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="searched-movie-container">
      <h2>Searched Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img src={`${ImageBasePath}${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchedMovie;
