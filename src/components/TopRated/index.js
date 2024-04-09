import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';
const ImageBasePath = 'https://image.tmdb.org/t/p/w500';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/movie/top_rated?api_key=${ApiKey}&language=en-US&page=1`);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="top-rated-container" style={{ backgroundColor: '#808080' }}>
      <h2>Top Rated Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`${ImageBasePath}${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
