import ContentContainerView from '../view/container.js';
import SortView from '../view/sort.js';
import ButtonShowMoreView from '../view/show-more.js';
import LoadingView from '../view/loading.js';
import NoMovieView from '../view/no-movie.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {sortByDate, sortByRating, sortByComments} from '../utils/film-card.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import MoviePresenter, {ComponentActions as MoviePresenterViewState} from './movie.js';

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
    this._topRatedPresenter = {};
    this._mostCommentedPresenter = {};
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
    this._mainMoviesContainerElement = this._contentContainerComponent.getElement().querySelector(`.films-list .films-list__container`);
    this._filmslistComponentElement = this._contentContainerComponent.getElement().querySelector(`.films-list`);
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

  _destroyPresenter(presenter) {
    Object.values(presenter).forEach((item) => item.destroy());
  }

  _clearContent({renderedFilmCardCount = false, resetSortType = false} = {}) {
    [this._moviePresenter, this._topRatedPresenter, this._mostCommentedPresenter].forEach(this._destroyPresenter);

    this._moviePresenter = {};
    this._topRatedPresenter = {};
    this._mostCommentedPresenter = {};

    remove(this._buttonShowMoreComponent);
    remove(this._noMovieComponent);
    remove(this._loadingComponent);
    remove(this._topRatedComponent);
    remove(this._mostCommentedComponent);

    if (renderedFilmCardCount) {
      this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
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
        if (this._moviePresenter[data.id]) {
          this._moviePresenter[data.id].init(data);
        }

        if (this._topRatedPresenter[data.id]) {
          this._topRatedPresenter[data.id].init(data);
        }

        if (this._mostCommentedPresenter[data.id]) {
          this._mostCommentedPresenter[data.id].init(data);
        }
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

  _handleViewAction(presenter, actionType, updateType, data) {
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
            presenter[data.id].setViewState(MoviePresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_COMMENT:
        presenter[data.movieId].setViewState(MoviePresenterViewState.COMMENT_SAVING);
        this._api
          .addComment(data)
          .then((response) => {
            this._moviesModel.updateMovies(updateType, response);
          })
          .catch(() => {
            presenter[data.movieId].setViewState(MoviePresenterViewState.ABORTING_ADD_COMMENT);
          });

        break;
      case UserAction.DELETE_COMMENT:
        presenter[data.movieId].setViewState(MoviePresenterViewState.COMMENT_DELETING, data.comment);
        this._api
          .deleteComment(data)
          .then(() => {
            this._moviesModel.deleteComment(updateType, data);
          })
          .catch(() => {
            presenter[data.movieId].setViewState(MoviePresenterViewState.ABORTING_DELETE_COMMENT, data.comment);
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

    this._renderFilmCards(movies, this._mainMoviesContainerElement, this._moviePresenter);
    this._renderedFilmCardCount = newRenderdfilmCardCount;

    remove(this._buttonShowMoreComponent);

    if (this._renderedFilmCardCount < filmCardCount) {
      this._renderButtonShowMore();
    }
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

  _renderFilmCard(filmList, movie, presenter) {
    const moviePresenter = new MoviePresenter(filmList, this._handleViewAction, this._handleTypeViewChange, this._api, presenter);
    moviePresenter.init(movie);
    presenter[movie.id] = moviePresenter;
  }

  _renderFilmCards(movies, filmList, presenter) {
    movies.forEach((movie) => this._renderFilmCard(filmList, movie, presenter));
  }

  _renderTopMovies() {
    const movies = this._moviesModel.getMovies();
    const topRatedMovies = [...movies].sort(sortByRating);
    const mostCommentedMovies = [...movies].sort(sortByComments);

    const topRatedPool = [topRatedMovies[0], topRatedMovies[1]].filter((movie) => movie.rating > 0);
    const mostCommentedPool = [mostCommentedMovies[0], mostCommentedMovies[1]].filter((movie) => movie.comments.length > 0);

    if (topRatedPool.length > 0) {
      render(this._contentContainerComponent, this._topRatedComponent, RenderPosition.BEFORE_END);
      const topRatedMoviesContainerElement = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
      topRatedPool.forEach((movie) => this._renderFilmCard(topRatedMoviesContainerElement, movie, this._topRatedPresenter));
    }

    if (mostCommentedPool.length > 0) {
      render(this._contentContainerComponent, this._mostCommentedComponent, RenderPosition.BEFORE_END);
      const mostComentedMoviesContainerElement = this._mostCommentedComponent.getElement().querySelector(`.films-list__container`);
      mostCommentedPool.forEach((movie) => this._renderFilmCard(mostComentedMoviesContainerElement, movie, this._mostCommentedPresenter));
    }
  }

  _renderLoading() {
    render(this._filmslistComponentElement, this._loadingComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderNoMovie() {
    render(this._filmslistComponentElement, this._noMovieComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderButtonShowMore() {
    if (this._buttonShowMoreComponent !== null) {
      this._buttonShowMoreComponent = null;
    }

    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);

    render(this._mainMoviesContainerElement, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);
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

    this._renderFilmCards(movies.slice(0, Math.min(filmCardCount, this._renderedFilmCardCount)), this._mainMoviesContainerElement, this._moviePresenter);

    if (filmCardCount > this._renderedFilmCardCount) {
      this._renderButtonShowMore();
    }

    this._renderTopMovies();
  }
}
