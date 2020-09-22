import FilmCardView from '../view/film.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UpdateType, UserAction} from '../const.js';

const ViewType = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`,
};

export const ComponentActions = {
  COMMENT_SAVING: `COMMENT_SAVING`,
  COMMENT_DELETING: `COMMENT_DELETING`,
  ABORTING: `ABORTING`,
  ABORTING_ADD_COMMENT: `ABORTING_ADD_COMMENT`,
  ABORTING_DELETE_COMMENT: `ABORTING_DELETE_COMMENT`,
};

const bodyElement = document.querySelector(`body`);

export default class Movie {
  constructor(filmListContainer, changeData, changeViewType, api, presenter) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeViewType = changeViewType;
    this._api = api;
    this._presenter = presenter;
    this._api = api;

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

    this._popupComponent = new PopupView(filmCard);
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

  setViewState(actionType, data) {
    const resetFormState = () => {
      this._popupComponent.updateData({
        textFieldDisabled: false,
      });
    };

    switch (actionType) {
      case ComponentActions.COMMENT_SAVING:
        this._popupComponent.updateData({
          textFieldDisabled: true,
        });
        break;
      case ComponentActions.COMMENT_SAVED:
        this._popupComponent.updateData(
            {
              textFieldDisabled: false,
              localComment: {},
            },
            true);
        break;
      case ComponentActions.COMMENT_DELETING:
        this._popupComponent.updateDeletingComments({
          [data.id]: true,
        });
        break;
      case ComponentActions.ABORTING:
        this._filmCardComponent.shake(resetFormState);
        this._popupComponent.shake();
        break;
      case ComponentActions.ABORTING_DELETE_COMMENT:
        this._popupComponent.updateDeletingComments({
          [data.id]: false,
        });
        this._filmCardComponent.shake(resetFormState);
        this._popupComponent.shake();
        break;
      case ComponentActions.ABORTING_ADD_COMMENT:
        this._popupComponent.shakeForm(resetFormState);
        break;
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
    this._changeData(
        this._presenter,
        UserAction.UPDATE_FILM_CARD,
        UpdateType.FILM_CARD,
        Object.assign({}, this._filmCard, {isFavorite: !this._filmCard.isFavorite}));
  }

  _handleWatchlistClick() {
    this._changeData(
        this._presenter,
        UserAction.UPDATE_FILM_CARD,
        UpdateType.FILM_CARD,
        Object.assign({}, this._filmCard, {isWatchlist: !this._filmCard.isWatchlist}));
  }

  _handleWatchedClick() {
    this._changeData(
        this._presenter,
        UserAction.UPDATE_FILM_CARD,
        UpdateType.FILM_CARD,
        Object.assign({}, this._filmCard, {isWatched: !this._filmCard.isWatched}));
  }

  _handleDeleteComment(evt) {
    const comment = this._filmCard.comments.find((commentItem) => commentItem.id === evt.target.dataset.id);

    if (!comment) {
      return;
    }

    this._changeData(this._presenter, UserAction.DELETE_COMMENT, UpdateType.FILM_CARD, {movieId: this._filmCard.id, comment});
  }

  _handleAddComment(comment) {
    this._changeData(this._presenter, UserAction.ADD_COMMENT, UpdateType.FILM_CARD, {movieId: this._filmCard.id, comment});
  }

  _handlePopupClick() {
    this._api
      .getComments(this._filmCard.id)
      .then((comments) => {
        this._changeData(this._presenter, UserAction.LOAD_COMMENTS, UpdateType.FILM_CARD, Object.assign({}, this._filmCard, {comments}));
      })
      .catch(() => {
        this.setViewState(ComponentActions.ABORTING);
      });
    this._popupComponent.updateElement();
    render(bodyElement, this._popupComponent, RenderPosition.BEFORE_END);
    this._changeViewType();
    this._viewType = ViewType.POPUP;
    document.addEventListener(`keydown`, this._closeHandler);
  }
}
