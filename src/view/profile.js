import AbstractView from './abstract.js';
import {getProfileRating} from '../utils/common.js';

const createUserProfile = (movies) => {
  return `<section class="header__profile profile">
      <p class="profile__rating">${getProfileRating(movies)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class UserProfile extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies.filter((movie) => movie.isWatched);
  }

  getTemplate() {
    return createUserProfile(this._movies);
  }
}
