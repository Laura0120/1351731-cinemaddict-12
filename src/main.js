import UserProfile from "./view/profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import MovieListPresenter from "./presenter/movie-list.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import { render, RenderPosition } from "./utils/render.js";
import { generateFilmCard } from "./mock/film";
import { generateFilter } from "./mock/filter";

const FILM_CARD_COUNT = 15;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);
const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);
const movieListPresenter = new MovieListPresenter(siteMainElement);

render(siteHeaderElement, new UserProfile(), RenderPosition.BEFORE_END);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFORE_END);
render(siteMainElement, new SortView(), RenderPosition.BEFORE_END);
movieListPresenter.init(filmCards);
render(footerStatisticsElement, new FooterStatisticsView(FILM_CARD_COUNT), RenderPosition.AFTER_BEGIN);
