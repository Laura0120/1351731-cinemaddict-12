import UserProfile from './view/profile.js';
import FilterPresenter from './presenter/filter.js';
import MovieListPresenter from './presenter/movie-list.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmCardsModel from './model/film-cards.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render.js';
import {generateFilmCard} from './mock/film';

const FILM_CARD_COUNT = 15;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);

const filmCardsModel = new FilmCardsModel();
filmCardsModel.setFilmCards(filmCards);

const filterModel = new FilterModel();

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);
const movieListPresenter = new MovieListPresenter(siteMainElement, filmCardsModel, filterModel);

render(siteHeaderElement, new UserProfile(), RenderPosition.BEFORE_END);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmCardsModel);
filterPresenter.init();
movieListPresenter.init();
render(footerStatisticsElement, new FooterStatisticsView(FILM_CARD_COUNT), RenderPosition.AFTER_BEGIN);
