import ContentContainerView from '../view/container.js';
import MoviePresenter, {ComponentActions as MoviePresenterViewState} from './movie.js';
import SortView from '../view/sort.js';
import ButtonShowMoreView from '../view/show-more.js';
import LoadingView from '../view/loading.js';
import NoMovieView from '../view/no-movie.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {sortByDate, sortByRating} from '../utils/film-card.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter.js';

const FILM_CARD_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector(`.main`);
export default class MovieList {
  constructor(contentContainer, moviesModel, filterModel, api) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._contentContainer = contentContainer;
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = {};
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._buttonShowMoreComponent = null;

    this._loadingComponent = new LoadingView();
    this._noMovieComponent = new NoMovieView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleTypeViewChange = this._handleTypeViewChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderSort();
    this._contentContainerComponent = new ContentContainerView();
    this._mainFilmsContainer = this._contentContainerComponent.getElement().querySelector(`.films-list__container`);
    this._filmslistComponent = this._contentContainerComponent.getElement().querySelector(`.films-list`);
    render(this._contentContainer, this._contentContainerComponent, RenderPosition.BEFORE_END);
    this._renderContent();

    this._moviesModel.addObserver(this._handleFilmCardChange);
    this._filterModel.addObserver(this._handleFilmCardChange);
  }

  destroy() {
    this._clearContent({renderedFilmCardCount: true, resetSortType: true});

    remove(this._contentContainerComponent);

    this._moviesModel.removeObserver(this._handleFilmCardChange);
    this._filterModel.removeObserver(this._handleFilmCardChange);
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortByRating);
    }

    return filteredMovies;
  }

  _handleTypeViewChange() {
    Object.values(this._moviePresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updateType, data) {
    switch (updateType) {
      case UpdateType.FILM_CARD:
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.FILTER:
        this._clearContent({renderedFilmCardCount: true, resetSortType: true});
        this._renderSort();
        this._renderContent();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderContent();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearContent({renderedFilmCardCount: true});
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

  _handleViewAction(actionType, updateType, data) {
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this._api
          .updateMovies(data)
          .then((response) =>
            this._api.getComments(response.id).then((comments) => {
              return Object.assign({}, response, {comments});
            })).then((movie) => {
            this._moviesModel.updateMovies(updateType, movie);
          })
          .catch(() => {
            this._moviePresenter[data.id].setViewState(MoviePresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_COMMENT:
        this._moviePresenter[data.movieId].setViewState(MoviePresenterViewState.COMMENT_SAVING);
        this._api
          .addComment(data)
          .then((response) => {
            this._moviesModel.updateMovies(updateType, response);
          })
          .catch(() => {
            this._moviePresenter[data.movieId].setViewState(MoviePresenterViewState.ABORTING_ADD_COMMENT);
          });

        break;
      case UserAction.DELETE_COMMENT:
        this._moviePresenter[data.movieId].setViewState(MoviePresenterViewState.COMMENT_DELETING, data.comment);
        this._api
          .deleteComment(data)
          .then(() => {
            this._moviesModel.deleteComment(updateType, data);
          })
          .catch(() => {
            this._moviePresenter[data.movieId].setViewState(MoviePresenterViewState.ABORTING_DELETE_COMMENT, data.comment);
          });
        break;
      case UserAction.LOAD_COMMENTS:
        this._moviesModel.updateMovies(updateType, data);
        break;
    }
  }

  _handleButtonShowMoreClick() {
    const filmCardCount = this._getMovies().length;
    const newRenderdfilmCardCount = Math.min(filmCardCount, this._renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._renderedFilmCardCount, newRenderdfilmCardCount);

    this._renderFilmCards(movies, this._mainFilmsContainer);
    this._renderedFilmCardCount = newRenderdfilmCardCount;

    remove(this._buttonShowMoreComponent);

    if (this._renderedFilmCardCount < filmCardCount) {
      this._renderButtonShowMore();
    }
  }

  _renderFilmCard(filmList, movie) {
    const moviePresenter = new MoviePresenter(filmList, this._handleViewAction, this._handleTypeViewChange);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderFilmCards(movies, filmList) {
    movies.forEach((movie) => this._renderFilmCard(filmList, movie));
  }

  _renderLoading() {
    render(this._filmslistComponent, this._loadingComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderNoMovie() {
    render(this._filmslistComponent, this._noMovieComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderButtonShowMore() {
    if (this._buttonShowMoreComponent !== null) {
      this._buttonShowMoreComponent = null;
    }

    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);

    render(this._mainFilmsContainer, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);
  }

  _clearContent({renderedFilmCardCount = false, resetSortType = false} = {}) {
    Object.values(this._moviePresenter).forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._buttonShowMoreComponent);
    remove(this._noMovieComponent);
    remove(this._loadingComponent);

    if (renderedFilmCardCount) {
      this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderContent() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const movies = this._getMovies();
    const filmCardCount = movies.length;
    if (filmCardCount === 0) {
      this._renderNoMovie();
      return;
    }

    this._renderFilmCards(movies.slice(0, Math.min(filmCardCount, this._renderedFilmCardCount)), this._mainFilmsContainer);

    if (filmCardCount > this._renderedFilmCardCount) {
      this._renderButtonShowMore();
    }
  }
}
