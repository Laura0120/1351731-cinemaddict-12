import MoviesModel from '../model/movies.js';
import {END_POINT_MOVIE, AUTHORIZATION} from '../const.js';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  getMovies() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((movies) => movies.map((movie) => MoviesModel.adaptToClient(movie)));
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`}).then(Api.toJSON);
  }

  updateMovies(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  addComment({movieId, comment}) {
    return this._load({
      url: `/comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(Api.toJSON)
      .then((result) => MoviesModel.adaptToClient(result.movie, result.comments));
  }

  deleteComment({comment}) {
    return this._load({
      url: `/comments/${comment.id}`,
      method: Method.DELETE,
    });
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, AUTHORIZATION);

    return fetch(`${END_POINT_MOVIE}/${url}`, {method, body, headers}).then(Api.checkStatus).catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < SuccessHTTPStatusRange.MIN && response.status > SuccessHTTPStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
