import MoviesModel from '../model/movies.js';
import {isOnline} from '../utils/common.js';

const getSyncedMovies = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.movie);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          const items = createStoreStructure(movies.map((movie) => MoviesModel.adaptToServer(movie)));
          this._store.setItems(items);
          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(storeMovies.map((movie) => MoviesModel.adaptToClient(movie)));
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId);
    }

    return Promise.resolve([]);
  }

  updateMovies(movie) {
    if (isOnline()) {
      return this._api.updateMovies(movie)
        .then((updatedMovie) => {
          this._store.setItem(updatedMovie.id, MoviesModel.adaptToServer(updatedMovie));
          return updatedMovie;
        });
    }

    this._store.setItem(movie.id, MoviesModel.adaptToServer(Object.assign({}, movie)));

    return Promise.resolve(movie);
  }

  addComment({movieId, comment}) {
    return this._api.addComment({movieId, comment});
  }


  deleteComment({comment}) {
    return this._api.deleteComment({comment});
  }

  sync() {
    if (isOnline()) {
      const storeMovies = Object.values(this._store.getItems());
      return this._api.sync(storeMovies)
        .then((response) => {
          const updatedMovies = getSyncedMovies(response.updated);
          const items = createStoreStructure([...updatedMovies]);
          this._store.setItems(items);
        });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }


}
