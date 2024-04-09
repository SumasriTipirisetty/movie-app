import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';

const SingleMovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/movie/${movieId}?api_key=${ApiKey}&language=en-US`);
        const castResponse = await axios.get(`${BaseUrl}/movie/${movieId}/credits?api_key=${ApiKey}&language=en-US`);
        setMovieDetails(response.data);
        setCast(castResponse.data.cast);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movieDetails) return null;

  return (
    <div className="whole">
    <div className="single-movie-container">
      <div className="top">
        <div className="movie-details">
          <h2>{movieDetails.title}</h2>
          <h3>Rating: {movieDetails.vote_average}</h3>
          <div className="over">
            <p>{movieDetails.overview}</p>
          </div>
        </div>
        <div className="im">
          <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
        </div>
      </div>

      <div className="cast-container">
        <h3>Cast:</h3>
        <div className="cast-images">
          {cast.map(actor => (
            <div key={actor.id} className="cast-image">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="cast-img"
              />
              <div className="cast-info">
                <p className="cast-name">{actor.name}</p>
                <p className="cast-character">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleMovieDetail;
