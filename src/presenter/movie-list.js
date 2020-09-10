import ContentContainerView from "../view/container.js";
import FilmCardPresenter from "./film.js";
import ButtonShowMoreView from "../view/show-more.js";
import { render, RenderPosition, remove } from "../utils/render.js";
import { updateItem } from "../utils/common.js";
const FILM_CARD_COUNT_PER_STEP = 5;
// const FILM_EXTRA_CARD_COUNT = 2;

export default class MovieList {
  constructor(contentContainer) {
    this._contentContainer = contentContainer;
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    this._filmCardPresenter = {};
    this._contentContainerComponent = new ContentContainerView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._mainFilmsContainer = this._contentContainerComponent.getElement().querySelector(`.films-list .films-list__container`);
    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleTypeViewChange = this._handleTypeViewChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._sourcedFilmCards = filmCards.slice();

    render(this._contentContainer, this._contentContainerComponent, RenderPosition.BEFORE_END);

    this._renderContent();
  }

  _handleTypeViewChange() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updatedFilmCard) {
    this._filmCards = updateItem(this._filmCards, updatedFilmCard);
    this._sourcedFilmCards = updateItem(this._filmCards, updatedFilmCard);
    this._filmCardPresenter[updatedFilmCard.id].init(updatedFilmCard);
  }

  _renderFilmCard(filmList, filmCard) {
    const filmCardPresenter = new FilmCardPresenter(filmList, this._handleFilmCardChange, this._handleTypeViewChange);
    filmCardPresenter.init(filmCard);
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilmCards(from, to, filmList) {
    this._filmCards.slice(from, to).forEach((filmCard) => this._renderFilmCard(filmList, filmCard));
  }

  _renderButtonShowMore() {
    const filmslist = this._contentContainerComponent.getElement().querySelector(`.films-list`);
    render(filmslist, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _renderContent() {
    this._renderFilmCards(0, Math.min(this._filmCards.length, FILM_CARD_COUNT_PER_STEP), this._mainFilmsContainer);

    if (this._filmCards.length > FILM_CARD_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _handleButtonShowMoreClick() {
    this._renderFilmCards(this._renderedFilmCardCount, this._renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP, this._mainFilmsContainer);
    this._renderedFilmCardCount += FILM_CARD_COUNT_PER_STEP;

    if (this._renderedFilmCardCount >= this._filmCards.length) {
      remove(this._buttonShowMoreComponent);
    }
  }
}
