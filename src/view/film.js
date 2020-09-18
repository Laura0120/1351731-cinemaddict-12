import moment from 'moment';

import AbstractView from './abstract.js';
import { DATE_FORMATS } from '../const';

const COUNT_SYMBOL_DESCRIPTION = 140;

const createFilmCard = (filmCard) => {
  const { poster, alternativeTitle, rating, date, runtime, genre, description, comments, isWatched, isFavorite, isWatchlist } = filmCard;
  return `<article class="film-card" >
    <h3 class="film-card__title">${alternativeTitle}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.format(DATE_FORMATS.DATE_OF_RELEASE_YEAR_VIEW)}</span>
      <span class="film-card__duration">${moment
        .utc()
        .startOf(`day`)
        .add({ minutes: runtime })
        .format(DATE_FORMATS.FILM_DURATION_VIEW)}</span>
      <span class="film-card__genre">${genre.join(` `)}</span>
    </p>
    <img src= "${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > COUNT_SYMBOL_DESCRIPTION ? description.slice(0, 140) + `...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
      ${isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
      ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite
      ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._filmCard);
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    const clickControls = [];
    [`.film-card__title`, `.film-card__comments`, `.film-card__poster`].forEach((value) => {
      clickControls.push(this.getElement().querySelector(value));
    });

    if (clickControls.includes(evt.target)) {
      this._callback.popupClick();
    }
  }

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().addEventListener(`click`, this._popupClickHandler);
  }

  clickHandler(callback, selector) {
    this.getElement().querySelector(selector).addEventListener(`click`, callback);
  }
}
