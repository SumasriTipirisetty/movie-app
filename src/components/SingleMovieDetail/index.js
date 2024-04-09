import React, { Component } from 'react';
import axios from 'axios';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';

class SingleMovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: null,
      cast: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    if (!match || !match.params || !match.params.movieId) {
      console.error('Movie ID not found in URL params');
      return;
    }
    const movieId = match.params.movieId;

    try {
      const response = await axios.get(`${BaseUrl}/movie/${movieId}?api_key=${ApiKey}&language=en-US`);
      const castResponse = await axios.get(`${BaseUrl}/movie/${movieId}/credits?api_key=${ApiKey}&language=en-US`);
      this.setState({
        movieDetails: response.data,
        cast: castResponse.data.cast,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: 'Error fetching movie details', loading: false });
    }
  }

  render() {
    const { movieDetails, cast, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!movieDetails) return null;

    return (
      <div className="single-movie-container">
        <h2>{movieDetails.title}</h2>
        <p>{movieDetails.overview}</p>
        <h3>Cast:</h3>
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <span>{actor.name} as {actor.character}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SingleMovieDetail;
