import Smart from "./smart.js";

const generatePopup = (filmCard, start, end) => {
  return Object.entries(filmCard)
    .slice(start, end)
    .map(([detailsItemName, detailsValue]) => {
      return {
        detailsItem: detailsItemName === `date` ? `Release Date` : detailsItemName,
        detailsItemValue: detailsValue,
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
  const filmGenre = genre.split(` `);
  return ` <tr class="film-details__row">
  <td class="film-details__term">${filmGenre.length > 1 ? `Genres` : `Genre`}</td>
  <td class="film-details__cell">${filmGenre.map((element) => `<span class="film-details__genre">${element}</span>`).join(``)}</td>
</tr>`;
};

const createComment = (comment) => {
  const { emoji, day, autor, text } = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src= ${emoji} width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${autor}</span>
      <span class="film-details__comment-day">${day}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

const createComments = (comments) => comments.map((comment) => createComment(comment)).join(``);

const createPopup = (filmCard) => {
  const { poster, ageRating, name, originalName, rating, genre, description, comments, emoji } = filmCard;
  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
    
              <p class="film-details__age">${ageRating}</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originalName}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
              ${createPopupTable(generatePopup(filmCard, 4, 10))} 
              ${createFilmGenre(genre)}
              </table>
              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
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
              ${emoji !== null ? `<img src="../../images/emoji/${emoji}.png" width="100%" height="100%" alt="emoji-smile"></img>` : ``}
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
  constructor(filmCard, changeData) {
    super();
    this._data = filmCard;
    this._changeData = changeData;
    this._сloseClickHandler = this._сloseClickHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
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
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiClickHandler);
  }

  _сloseClickHandler(evt) {
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
    this.updateData({
      emoji: evt.target.value,
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
