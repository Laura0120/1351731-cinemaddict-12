import FilmCardView from "../view/film.js";
import PopupView from "../view/popup.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";

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
      evt.preventDefault();

      const isEscKey = [`Escape`, `Esc`].includes(evt.key);

      if (evt.key && !isEscKey) {
        return;
      }
    }

    remove(this._popupComponent);
    this._viewType = ViewType.DEFAULT;

    document.removeEventListener(`keydown`, this._closeHandler);
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._filmCard, { isFavorite: !this._filmCard.isFavorite }));
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._filmCard, { isWatchlist: !this._filmCard.isWatchlist }));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._filmCard, { isWatched: !this._filmCard.isWatched }));
  }

  _handlePopupClick() {
    this._popupComponent.updateElement();
    render(bodyElement, this._popupComponent, RenderPosition.BEFORE_END);
    this._changeViewType();
    this._viewType = ViewType.POPUP;
    document.addEventListener(`keydown`, this._closeHandler);
  }
}
