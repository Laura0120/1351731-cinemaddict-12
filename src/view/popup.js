import he from 'he';
import moment from 'moment';

import { render, replace, RenderPosition } from '../utils/render.js';
import Smart from './smart.js';
import { DATE_FORMATS } from '../const';

const generatePopup = (filmCard, start, end) => {
  return Object.entries(filmCard)
    .slice(start, end)
    .map(([detailsItem, detailsItemValue]) => {
      if (detailsItem === `date`) {
        return {
          detailsItem: `Release Date`,
          detailsItemValue: detailsItemValue.format(DATE_FORMATS.DATE_OF_RELEASE_VIEW),
        };
      }

      if (detailsItem === 'runtime') {
        return {
          detailsItem,
          detailsItemValue: moment.utc().startOf(`day`).add({ minutes: detailsItemValue }).format(DATE_FORMATS.FILM_DURATION_VIEW),
        };
      }

      return {
        detailsItem,
        detailsItemValue,
      };
    });
};

const createPopupTableItem = (detail) => {
  const { detailsItem, detailsItemValue } = detail;
  return ` <tr class="film-details__row">
  <td class="film-details__term">${detailsItem}</td>
  <td class="film-details__cell">${detailsItemValue}</td>
</tr>`;
};

const createPopupTable = (detailsTableItems) => {
  return detailsTableItems.map((detailsTableItem) => createPopupTableItem(detailsTableItem)).join(``);
};

const createFilmGenre = (genre) => {
  return ` <tr class="film-details__row">
  <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
  <td class="film-details__cell">${genre.map((element) => `<span class="film-details__genre">${element}</span>`).join(` `)}</td>
</tr>`;
};

const createComment = (commentObj) => {
  const { emotion, date, author, comment, id } = commentObj;

  if (!comment) {
    return;
  }

  const dateObj = moment(date);
  const commentDate = moment().utc().diff(dateObj, 'days') >= 2 ? dateObj.format(DATE_FORMATS.COMMENT_DATE_VIEW) : dateObj.fromNow();

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="../../images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete" data-id="${id}">Delete</button>
      </p>
    </div>
  </li>`;
};

const createComments = (comments) => comments.map((comment) => createComment(comment)).join(``);

const createPopup = (movie) => {
  const { poster, ageRating, alternativeTitle, title, rating, genre, description, comments, isWatched, isFavorite, isWatchlist } = movie;
  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating + `+`}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${alternativeTitle}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
              ${createPopupTable(generatePopup(movie, 4, 10))}
              ${createFilmGenre(genre)}
              </table>
              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" ${
              isWatchlist ? `checked` : ``
            } class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" ${
              isWatched ? `checked` : ``
            } class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" ${
              isFavorite ? `checked` : ``
            }  class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createComments(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
};

export default class Popup extends Smart {
  constructor(movie, changeData) {
    super();
    this._data = movie;
    this._changeData = changeData;
    this._сloseClickHandler = this._сloseClickHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCommentAdd = this._handleCommentAdd.bind(this);

    this._newComment = {};

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopup(this._data);
  }

  restoreHandlers() {
    this.setCloseClickHandler(this._callback.popupCloseClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiClickHandler);
    this.getElement().addEventListener(`keydown`, this._handleCommentAdd);
  }

  _сloseClickHandler(evt) {
    this._newComment.emotion = null;
    this._callback.popupCloseClick(evt);
  }

  _handleFavoriteClick() {
    this._callback.favoriteClick();
  }

  _handleWatchlistClick() {
    this._callback.watchlistClick();
  }

  _handleWatchedClick() {
    this._callback.watchedClick();
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    const emotion = evt.target.value;

    if (emotion === this._newComment.emotion) {
      return;
    }

    const img = document.createElement('img');
    const className = `film-details__chosen-emoji`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.alt = 'emoji-smile';
    img.src = `../../images/emoji/${emotion}.png`;
    img.className = className;

    if (Boolean(this._newComment.emotion)) {
      replace(img, this.getElement().querySelector(`.film-details__chosen-emoji`));
    } else {
      render(this.getElement().querySelector(`.film-details__add-emoji-label`), img, RenderPosition.BEFORE_END);
    }

    this._newComment.emotion = emotion;
  }

  _handleDeleteClick(evt) {
    evt.preventDefault();
    this._callback.deleteClick(evt);
  }

  _handleCommentAdd(evt) {
    if (![`Enter`, `Command`].includes(evt.key) || !evt.ctrlKey) {
      return;
    }

    evt.preventDefault();

    // if (!this._newComment.emotion) {
    //   this._newComment.emotion = `../../images/emoji/smile.png`;
    // }

    this._callback.addCommentClick({ ...this._newComment, comment: evt.target.value, date: moment().utc() });

    this._newComment = {};
  }

  setAddClickHandler(callback) {
    this._callback.addCommentClick = callback;
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => {
        button.addEventListener(`click`, this._handleDeleteClick);
      });
  }

  setCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._сloseClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._handleFavoriteClick);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._handleWatchlistClick);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._handleWatchedClick);
  }
}
