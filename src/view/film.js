import AbstractView from "./abstract.js";

const COUNT_SIMBOL_DESCRIPTION = 140;

const createFilmCard = (filmCard) => {
  const {poster, name, rating, date, Runtime, genre, description, comments} = filmCard;
  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.slice(date.length - 5)}</span>
      <span class="film-card__duration">${Runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > COUNT_SIMBOL_DESCRIPTION ? description.slice(0, 140) + `...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
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

    if (clickControls.includes(event.target)) {
      this._callback.popupClick();
    }
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().addEventListener(`click`, this._popupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }
}
