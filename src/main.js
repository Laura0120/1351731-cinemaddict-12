import UserProfile from './view/profile.js';
import FooterStatisticsView from './view/footer-statistics.js';
import StatisticsView from './view/statistics.js';
import FilterPresenter from './presenter/filter.js';
import MovieListPresenter from './presenter/movie-list.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Api from './api.js';
import { render, RenderPosition, remove } from './utils/render.js';
import { UpdateType, MenuItem } from './const.js';

const AUTHORIZATION = `Basic gl2e508ga2406a `;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);
const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);

render(siteHeaderElement, new UserProfile(), RenderPosition.BEFORE_END);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

let statisticsComponent = null;
const handleNavClick = (evt) => {
  switch (evt.target.dataset.navType) {
    case MenuItem.STATS:
      if (statisticsComponent) {
        return;
      }
      evt.preventDefault();
      movieListPresenter.destroy();
      statisticsComponent = new StatisticsView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFORE_END);
      break;
    default:
      if (statisticsComponent) {
        remove(statisticsComponent);
        movieListPresenter.init();
      }
  }
};

filterPresenter.init();
movieListPresenter.init();
api.getMovies().then((movies) => {
  moviesModel.setMovies(UpdateType.INIT, movies);
});
// .catch(() => {
//   moviesModel.setMovies(UpdateType.INIT, []);
// })
document.querySelector(`.main-navigation`).addEventListener(`click`, handleNavClick);
document.querySelector(`.main-navigation__additional`).addEventListener(`click`, handleNavClick);
render(footerStatisticsElement, new FooterStatisticsView(moviesModel.getMovies().length), RenderPosition.AFTER_BEGIN);
