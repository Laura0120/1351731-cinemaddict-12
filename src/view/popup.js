import he from 'he';
import moment from 'moment';

import {render, replace, RenderPosition} from '../utils/render.js';
import {isOnline} from '../utils/common.js';
import Smart from './smart.js';
import {DataFormats, SHAKE_ANIMATION_TIMEOUT} from '../const.js';


const createFilmGenre = (genre) => {
  return ` <tr class="film-details__row">
  <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
  <td class="film-details__cell">${genre.map((element) => `<span class="film-details__genre">${element}</span>`).join(` `)}</td>
</tr>`;
};

const createComment = (commentObj, isDisabled = false) => {
  const {emotion, date, author, comment, id} = commentObj;

  if (!comment) {
    return ``;
  }

  const dateObj = moment(date);
  const commentDate = moment().utc().diff(dateObj, `days`) >= 2 ? dateObj.format(DataFormats.COMMENT_DATE_VIEW) : dateObj.fromNow();

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="../../images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete" data-id="${id}" ${isDisabled || !isOnline() ? `disabled` : ``}>
        ${isDisabled ? `Deleting...` : `Delete`} </button>
      </p>
    </div>
  </li>`;
};

const createComments = (data) => {
  const {
    movie: {comments},
    deletingComments,
  } = data;

  return comments.map((comment) => createComment(comment, deletingComments[comment.id])).join(``);
};

const createPopup = (data) => {
  const {movie, localComment} = data;
  const {
    poster,
    ageRating,
    alternativeTitle,
    title,
    rating,
    genre,
    director,
    writers,
    actors,
    date,
    runtime,
    country,
    description,
    comments,
    isWatched,
    isFavorite,
    isWatchlist, textFieldDisabled
  } = movie;
  const {comment, emotion} = localComment;

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
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
              <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date.format(DataFormats.DATE_OF_RELEASE_VIEW)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${moment
                .utc()
                .startOf(`day`)
                .add({minutes: runtime})
                .format(DataFormats.FILM_DURATION_VIEW)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            ${createFilmGenre(genre)}
              </table>
              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" ${isWatchlist ? `checked` : ``}
             class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" ${isWatched ? `checked` : ``}
             class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" ${isFavorite ? `checked` : ``}
              class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createComments(data)}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
             ${emotion ? `<img alt="emoji-smile" src="../../images/emoji/${emotion}.png"
             class="film-details__chosen-emoji" style="width: 100%; height: 100%;">` : ``}
              </div>

              <label class="film-details__comment-label">

                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${textFieldDisabled || !isOnline() ? `disabled` : ``}>${comment ? comment : ``}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${!isOnline() ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping"  ${!isOnline() ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke"  ${!isOnline() ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry"  ${!isOnline() ? `disabled` : ``}>
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
  constructor(movie) {
    super();
    this._data = {movie, deletingComments: {}, textFieldDisabled: false, localComment: {}};
    this._сloseClickHandler = this._сloseClickHandler.bind(this);
    this._favoriteClickHandle = this._favoriteClickHandle.bind(this);
    this._watchlistClickHandle = this._watchlistClickHandle.bind(this);
    this._watchedClickHandle = this._watchedClickHandle.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._deleteButtonClickHandle = this._deleteButtonClickHandle.bind(this);
    this._сommentAddHandle = this._сommentAddHandle.bind(this);

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
    this.getElement().addEventListener(`keydown`, this._сommentAddHandle);
  }

  _сloseClickHandler(evt) {
    this._callback.popupCloseClick(evt);
  }

  _favoriteClickHandle() {
    this._callback.favoriteClick();
  }

  _watchlistClickHandle() {
    this._callback.watchlistClick();
  }

  _watchedClickHandle() {
    this._callback.watchedClick();
  }

  _deleteButtonClickHandle(evt) {
    evt.preventDefault();
    this._callback.deleteClick(evt);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    const emotion = evt.target.value;

    if (emotion === this._data.localComment.emotion) {
      return;
    }

    const img = document.createElement(`img`);
    img.style.width = `100%`;
    img.style.height = `100%`;
    img.alt = `emoji-smile`;
    img.src = `../../images/emoji/${emotion}.png`;
    img.className = `film-details__chosen-emoji`;

    if (this._data.localComment.emotion) {
      replace(img, this.getElement().querySelector(`.film-details__chosen-emoji`));
    } else {
      render(this.getElement().querySelector(`.film-details__add-emoji-label`), img, RenderPosition.BEFORE_END);
    }

    this._data.localComment.emotion = emotion;
  }

  _сommentAddHandle(evt) {
    if (![`Enter`, `Command`].includes(evt.key) || !evt.ctrlKey) {
      return;
    }

    evt.preventDefault();

    this._data.localComment = Object.assign({}, this._data.localComment, {comment: evt.target.value, date: moment().utc()});
    this._callback.addCommentClick(this._data.localComment);
  }

  setAddClickHandler(callback) {
    this._callback.addCommentClick = callback;
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => {
        button.addEventListener(`click`, this._deleteButtonClickHandle);
      });
  }

  setCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._сloseClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._favoriteClickHandle);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._watchlistClickHandle);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._watchedClickHandle);
  }

  updateDeletingComments(data) {
    this.updateData({deletingComments: Object.assign({}, this._data.deletingComments, data)});
  }

  shakeForm(callback) {
    this.getElement().querySelector(`.film-details__comment-input`).style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().querySelector(`.film-details__comment-input`).style.animation = ``;
      if (callback) {
        callback();
      }
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
