import moment from 'moment';

export const watchedMovieInDateRange = (movies, dateFrom, dateTo) => {
  if (dateFrom === null) {
    return movies;
  }

  const watchedMovie = movies.filter(
      (movie) =>
        moment(movie.watchingDate).isSame(dateFrom) ||
        moment(movie.watchingDate).isBetween(dateFrom, dateTo) ||
        moment(movie.watchingDate).isSame(dateTo)
  );

  return watchedMovie;
};
