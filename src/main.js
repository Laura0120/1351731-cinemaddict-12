import UserProfile from './view/user-profile.js';
import FooterStatisticsView from './view/footer-statistics.js';
import StatisticsView from './view/statistics.js';
import FilterPresenter from './presenter/filter.js';
import MovieListPresenter from './presenter/movie-list.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Api from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {UpdateType, MenuItem} from './const.js';

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api();
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);
const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

let statisticsComponent = null;

const handleNavClick = (navType) => {
  switch (navType) {
    case MenuItem.STATS:
      if (statisticsComponent) {
        return;
      }
      movieListPresenter.destroy();
      statisticsComponent = new StatisticsView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFORE_END);
      break;
    default:
      if (statisticsComponent) {
        remove(statisticsComponent);
        statisticsComponent = null;
        movieListPresenter.init();
      }
  }
};

filterPresenter.setNavClickHandler(handleNavClick);
filterPresenter.init();

movieListPresenter.init();

apiWithProvider
  .getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    render(footerStatisticsElement, new FooterStatisticsView(moviesModel.getMovies().length), RenderPosition.AFTER_BEGIN);
    render(siteHeaderElement, new UserProfile(moviesModel.getMovies()), RenderPosition.BEFORE_END);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
    render(footerStatisticsElement, new FooterStatisticsView(moviesModel.getMovies().length), RenderPosition.AFTER_BEGIN);
    render(siteHeaderElement, new UserProfile(moviesModel.getMovies()), RenderPosition.BEFORE_END);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`).catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
