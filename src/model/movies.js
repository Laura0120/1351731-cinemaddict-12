import moment from 'moment';

import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();
    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovies(updateType, updatedMovie) {
    const index = this._movies.findIndex((movie) => movie.id === updatedMovie.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting movie`);
    }

    this._movies = [...this._movies.slice(0, index), updatedMovie, ...this._movies.slice(index + 1)];

    this._notify(updateType, updatedMovie);
  }

  _getMovie(movieId) {
    const index = this._movies.findIndex((movie) => movie.id === movieId);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting movie`);
    }

    return { index, movie: this._movies[index] };
  }

  deleteComment(updateType, { movieId, comment: deletedComment }) {
    const { movie, index } = this._getMovie(movieId);
    const updatedMovie = { ...movie, comments: movie.comments.filter((comment) => comment.id !== deletedComment.id) };

    this._movies = [...this._movies.slice(0, index), updatedMovie, ...this._movies.slice(index + 1)];

    this._notify(updateType, updatedMovie);
  }

  static adaptToClient(movie, comments) {
    const adaptedMovie = {
      date: movie.film_info.release.date !== null ? moment(movie.film_info.release.date) : movie.film_info.release.date,
      alternativeTitle: movie.film_info.alternative_title,
      rating: movie.film_info.total_rating,
      ageRating: movie.film_info.age_rating,
      country: movie.film_info.release.release_country,
      comments: comments
        ? movie.comments.map((commentId) => comments.find((c) => c.id === commentId))
        : movie.comments.map((commentId) => ({ id: commentId })),
      runtime: movie.film_info.runtime,
      description: movie.film_info.description,
      genre: movie.film_info.genre,
      title: movie.film_info.title,
      poster: movie.film_info.poster,
      writers: movie.film_info.writers,
      actors: movie.film_info.actors,
      director: movie.film_info.director,
      isWatchlist: movie.user_details.watchlist,
      isWatched: movie.user_details.already_watched,
      isFavorite: movie.user_details.favorite,
      watchingDate: movie.user_details.watching_date,
      id: movie.id,
    };

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = {
      id: movie.id,
      comments: movie.comments.map((comment) => comment.id),
      film_info: {
        title: movie.title,
        alternative_title: movie.alternativeTitle,
        total_rating: movie.rating,
        actors: movie.actors,
        age_rating: movie.ageRating,
        description: movie.description,
        director: movie.director,
        genre: movie.genre,
        poster: movie.poster,
        release: {
          date: movie.date !== null ? movie.date.toISOString() : null,
          release_country: movie.country,
        },
        runtime: movie.runtime,
        writers: movie.writers,
      },
      user_details: {
        watchlist: movie.isWatchlist,
        already_watched: movie.isWatched,
        favorite: movie.isFavorite,
        watching_date: movie.watchingDate,
      },
    };

    return adaptedMovie;
  }
}
