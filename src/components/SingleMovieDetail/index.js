
import React, { Component } from 'react';
import axios from 'axios';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';
const ImageBasePath = 'https://image.tmdb.org/t/p/w500';

class SingleMovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      castDetails: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.fetchMovieDetails(movieId);
    this.fetchCastDetails(movieId);
  }

  fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BaseUrl}/movie/${movieId}?api_key=${ApiKey}&language=en-US`);
      this.setState({ movieDetails: response.data, loading: false });
    } catch (error) {
      this.setState({ error: 'Error fetching movie details', loading: false });
    }
  };

  fetchCastDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BaseUrl}/movie/${movieId}/credits?api_key=${ApiKey}&language=en-US`);
      this.setState({ castDetails: response.data.cast, loading: false });
    } catch (error) {
      this.setState({ error: 'Error fetching cast details', loading: false });
    }
  };

  render() {
    const { movieDetails, castDetails, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="single-movie-detail-container">
        <div className="movie-info">
          <img src={`${ImageBasePath}${movieDetails.poster_path}`} alt={movieDetails.title} />
          <h2>{movieDetails.title}</h2>
          <p>Rating: {movieDetails.vote_average}</p>
          <p>Release Date: {movieDetails.release_date}</p>
          <p>Overview: {movieDetails.overview}</p>
        </div>
        <div className="cast-details">
          <h3>Cast</h3>
          <ul>
            {castDetails.map((cast) => (
              <li key={cast.id}>{cast.name} as {cast.character}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SingleMovieDetail;
