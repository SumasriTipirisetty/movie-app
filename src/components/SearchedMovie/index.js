import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

const ApiKey = '82703bde347abd1cddce530db029c8ef';
const BaseUrl = 'https://api.themoviedb.org/3';
const ImageBasePath = 'https://image.tmdb.org/t/p/w500';

class SearchedMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    if (location && location.search) {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query');
      await this.searchMovies(query);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const searchParams = new URLSearchParams(this.props.location.search);
      const query = searchParams.get('query');
      await this.searchMovies(query);
    }
  }

  searchMovies = async (query) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/search/movie?api_key=${ApiKey}&language=en-US&query=${query}&page=1`
      );
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
  }
}

export default SearchedMovie;
