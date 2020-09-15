import ContentContainerView from '../view/container.js';
import FilmCardPresenter from './film.js';
import SortView from '../view/sort.js';
import ButtonShowMoreView from '../view/show-more.js';

import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {sortByDate, sortByRating} from '../utils/film-card.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter.js';

const FILM_CARD_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector(`.main`);
export default class MovieList {
  constructor(contentContainer, filmCardsModel, filterModel) {
    this._filmCardsModel = filmCardsModel;
    this._filterModel = filterModel;
    this._contentContainer = contentContainer;
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmCardPresenter = {};

    this._sortComponent = null;
    this._buttonShowMoreComponent = null;

    this._contentContainerComponent = new ContentContainerView();
    this._mainFilmsContainer = this._contentContainerComponent.getElement().querySelector(`.films-list .films-list__container`);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleTypeViewChange = this._handleTypeViewChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmCardsModel.addObserver(this._handleFilmCardChange);
    this._filterModel.addObserver(this._handleFilmCardChange);
  }

  init() {
    this._renderSort();
    render(this._contentContainer, this._contentContainerComponent, RenderPosition.BEFORE_END);
    this._renderContent();
  }

  _getFilmCards() {
    const filterType = this._filterModel.getFilter();
    const filmCards = this._filmCardsModel.getFilmCards();
    const filteredFilmCards = filter[filterType](filmCards);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilmCards.sort(sortByDate);
      case SortType.RATING:
        return filteredFilmCards.sort(sortByRating);
    }

    return filteredFilmCards;
  }

  _handleTypeViewChange() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updateType, data) {
    switch (updateType) {
      case UpdateType.FILM_CARD:
        this._filmCardPresenter[data.id].init(data);
        break;
      case UpdateType.FILTER:
        this._clearContent({resetRenderedTaskCount: true, resetSortType: true});
        this._renderSort();
        this._renderContent();

        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearContent({resetRenderedTaskCount: true});
    this._renderSort();
    this._renderContent();
  }

  _renderSort() {
    const newSortComponent = new SortView(this._currentSortType);
    newSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (this._sortComponent === null) {
      this._sortComponent = newSortComponent;
      render(siteMainElement, this._sortComponent, RenderPosition.BEFORE_END);
    } else {
      const oldSortComponent = this._sortComponent;
      this._sortComponent = newSortComponent;
      replace(newSortComponent, oldSortComponent);
    }
  }

  _handleViewAction(actionType, updateType, updateFilmCard) {
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this._filmCardsModel.updateFilmCards(updateType, updateFilmCard);
        break;
      case UserAction.ADD_COMMENT:
        this._filmCardsModel.updateFilmCards(updateType, updateFilmCard);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmCardsModel.updateFilmCards(updateType, updateFilmCard);
        break;
    }
  }

  _handleButtonShowMoreClick() {
    const filmCardCount = this._getFilmCards().length;
    const newRenderdfilmCardCount = Math.min(filmCardCount, this._renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP);
    const filmCards = this._getFilmCards().slice(this._renderedFilmCardCount, newRenderdfilmCardCount);

    this._renderFilmCards(filmCards, this._mainFilmsContainer);
    this._renderedFilmCardCount = newRenderdfilmCardCount;

    remove(this._buttonShowMoreComponent);

    if (this._renderedFilmCardCount < filmCardCount) {
      this._renderButtonShowMore();
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
    if (this._buttonShowMoreComponent !== null) {
      this._buttonShowMoreComponent = null;
    }

    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);

    render(this._mainFilmsContainer, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);
  }

  _clearContent({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._buttonShowMoreComponent);

    if (resetRenderedTaskCount) {
      this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderContent() {
    const filmCards = this._getFilmCards();

    const filmCardCount = filmCards.length;
    this._renderFilmCards(filmCards.slice(0, Math.min(filmCardCount, this._renderedFilmCardCount)), this._mainFilmsContainer);
    if (filmCardCount > this._renderedFilmCardCount) {
      this._renderButtonShowMore();
    }
  }
}
