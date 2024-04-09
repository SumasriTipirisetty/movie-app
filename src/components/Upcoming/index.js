import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';
const ImageBasePath = 'https://image.tmdb.org/t/p/w500';

class Upcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUpcomingMovies();
  }

  fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/movie/upcoming?api_key=${ApiKey}&language=en-US&page=1`);
      this.setState({ movies: response.data.results, loading: false });
    } catch (error) {
      this.setState({ error: 'Error fetching data', loading: false });
    }
  };

  render() {
    const { movies, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="upcoming-container">
        <h2>Upcoming Movies</h2>
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
  }
}

export default Upcoming;