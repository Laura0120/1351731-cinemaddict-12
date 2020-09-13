import ContentContainerView from "../view/container.js";
import FilmCardPresenter from "./film.js";
import ButtonShowMoreView from "../view/show-more.js";

import { render, RenderPosition, remove } from "../utils/render.js";
import { sortByDate, sortByRating } from "../utils/film-card.js";
import { SortType, UpdateType } from "../const.js";
const FILM_CARD_COUNT_PER_STEP = 5;
// const FILM_EXTRA_CARD_COUNT = 2;

export default class MovieList {
  constructor(contentContainer, filmCardsModel) {
    this._filmCardsModel = filmCardsModel;
    this._contentContainer = contentContainer;
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmCardPresenter = {};

    this._sortComponent = null;
    this._buttonShowMoreComponent = null;

    this._contentContainerComponent = new ContentContainerView();
    // this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._mainFilmsContainer = this._contentContainerComponent.getElement().querySelector(`.films-list .films-list__container`);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleTypeViewChange = this._handleTypeViewChange.bind(this);

    this._filmCardsModel.addObserver(this._handleFilmCardChange);
  }

  init() {
    render(this._contentContainer, this._contentContainerComponent, RenderPosition.BEFORE_END);

    this._renderContent();
  }

  _getFilmCards() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmCardsModel.getFilmCards().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmCardsModel.getFilmCards().slice().sort(sortByRating);
    }

    return this._filmCardsModel.getFilmCards();
  }

  _handleTypeViewChange() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(data, updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearContentContainer();
        this._renderContentContainer();
        break;
      case UpdateType.MAJOR:
        
        this._clearContentContainer({ resetRenderedFilmCardCount: true, resetSortType: true });
        this._renderContentContainer();
        break;
    }
    this._filmCardPresenter[data.id].init(data);
  }

  _handleViewAction(updateFilmCard) {
    this._filmCardsModel.updateFilmCards(updateFilmCard);
  }

  _handleButtonShowMoreClick() {
    const filmCardCount = this._getFilmCards().length;
    const newRenderdfilmCardCount = Math.min(filmCardCount, this._renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP);
    const filmCards = this._getFilmCards().slice(this._renderedFilmCardCount, newRenderdfilmCardCount);

    this._renderFilmCards(filmCards, this._mainFilmsContainer);
    this._renderedFilmCardCount = newRenderdfilmCardCount;

    if (this._renderedFilmCardCount >= filmCardCount) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _renderFilmCard(filmList, filmCard) {
    const filmCardPresenter = new FilmCardPresenter(filmList, this._handleViewAction, this._handleTypeViewChange);
    filmCardPresenter.init(filmCard);
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilmCards(filmCards, filmList) {
    filmCards.forEach((filmCard) => this._renderFilmCard(filmList, filmCard));
  }

  _renderButtonShowMore() {
    const filmslist = this._contentContainerComponent.getElement().querySelector(`.films-list`);
    render(filmslist, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _renderContent() {
    const filmCardCount = this._getFilmCards().length;
    const filmCards = this._getFilmCards().slice(0, Math.min(filmCardCount, FILM_CARD_COUNT_PER_STEP));
    this._renderFilmCards(filmCards, this._mainFilmsContainer);

    if (filmCardCount > FILM_CARD_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }
}
