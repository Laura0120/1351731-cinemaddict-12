import FilmCardView from '../view/film.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UpdateType, UserAction} from '../const.js';
import {generateComment} from '../mock/film';

const ViewType = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`,
};
const bodyElement = document.querySelector(`body`);

export default class FilmCard {
  constructor(filmListContainer, changeData, changeViewType) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeViewType = changeViewType;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._viewType = ViewType.DEFAULT;

    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._closeHandler = this._closeHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevfilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(filmCard);
    this._filmCardComponent.setPopupClickHandler(this._handlePopupClick);
    this._filmCardComponent.clickHandler(this._handleFavoriteClick, `.film-card__controls-item--favorite`);
    this._filmCardComponent.clickHandler(this._handleWatchlistClick, `.film-card__controls-item--add-to-watchlist`);
    this._filmCardComponent.clickHandler(this._handleWatchedClick, `.film-card__controls-item--mark-as-watched`);

    this._popupComponent = new PopupView(filmCard, this._changeData);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setCloseClickHandler(this._closeHandler);
    this._popupComponent.setDeleteClickHandler(this._handleDeleteComment);
    this._popupComponent.setAddClickHandler(this._handleAddComment);

    if (prevfilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFORE_END);
      return;
    }
    replace(this._filmCardComponent, prevfilmCardComponent);
    replace(this._popupComponent, prevPopupComponent);
    remove(prevfilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._viewType !== ViewType.DEFAULT) {
      this._closeHandler();
    }
  }

  _closeHandler(evt) {
    if (evt) {
      const isEscKey = [`Escape`, `Esc`].includes(evt.key);

      if (evt.key && !isEscKey) {
        return;
      }
    }
    evt.preventDefault();
    remove(this._popupComponent);
    this._viewType = ViewType.DEFAULT;

    document.removeEventListener(`keydown`, this._closeHandler);
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_FILM_CARD, UpdateType.FILM_CARD, Object.assign({}, this._filmCard, {isFavorite: !this._filmCard.isFavorite}));
  }

  _handleWatchlistClick() {
    this._changeData(UserAction.UPDATE_FILM_CARD, UpdateType.FILM_CARD, Object.assign({}, this._filmCard, {isWatchlist: !this._filmCard.isWatchlist}));
  }

  _handleWatchedClick() {
    this._changeData(UserAction.UPDATE_FILM_CARD, UpdateType.FILM_CARD, Object.assign({}, this._filmCard, {isWatched: !this._filmCard.isWatched}));
  }

  _handleDeleteComment(evt) {
    const comments = this._filmCard.comments.filter((comment) => comment.id !== evt.target.dataset.id);

    this._changeData(UserAction.DELETE_COMMENT, UpdateType.FILM_CARD, Object.assign({}, this._filmCard, {comments}));
  }

  _handleAddComment(comment) {
    const comments = [...this._filmCard.comments, generateComment(comment)];

    this._changeData(UserAction.ADD_COMMENT, UpdateType.FILM_CARD, Object.assign({}, this._filmCard, {comments}));
  }

  _handlePopupClick() {
    this._popupComponent.updateElement();
    render(bodyElement, this._popupComponent, RenderPosition.BEFORE_END);
    this._changeViewType();
    this._viewType = ViewType.POPUP;
    document.addEventListener(`keydown`, this._closeHandler);
  }
}
