import {createUserProfile} from "./view/profile";
import {createMenu} from "./view/menu";
import {createSort} from "./view/sort";
import {createContentContainer} from "./view/container";
import {createFilmCard} from "./view/film";
import {createButtonShowMore} from "./view/show-more";
import {createFooterStatistics} from "./view/footer-statistics";
import {createFilmDetails} from "./view/film-details";
import {generateFilmCard} from "./mock/film";
import {generateFilter} from "./mock/filter";

const FILM_CARD_COUNT = 15;
const FILM_CARD_COUNT_PER_STEP = 5;
const FILM_EXTRA_CARD_COUNT = 2;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderContent = () => {
  const filmsContainer = siteMainElement.querySelector(`.films-list .films-list__container`);

  for (let i = 0; i < Math.min(filmCards.length, FILM_CARD_COUNT_PER_STEP); i++) {
    render(filmsContainer, createFilmCard(filmCards[i]), `beforeend`);
  }
  if (filmCards.length > FILM_CARD_COUNT_PER_STEP) {
    let renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    render(filmsContainer, createButtonShowMore(), `afterend`);
    const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

    loadMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmCards
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP)
        .forEach((filmCard) => render(filmsContainer, createFilmCard(filmCard), `beforeend`));

      renderedFilmCardCount += FILM_CARD_COUNT_PER_STEP;

      if (renderedFilmCardCount >= filmCards.length) {
        loadMoreButton.remove();
      }
    });
  }

  const filmsExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

  filmsExtraContainers.forEach(function (currentValue) {
    for (let i = 0; i < FILM_EXTRA_CARD_COUNT; i++) {
      render(currentValue, createFilmCard(filmCards[i]), `beforeend`);
    }
  });
};

render(siteHeaderElement, createUserProfile(), `beforeend`);
render(siteMainElement, createMenu(filters), `beforeend`);
render(siteMainElement, createSort(), `beforeend`);
render(siteMainElement, createContentContainer(), `beforeend`);
renderContent();
render(footerStatisticsElement, createFooterStatistics(FILM_CARD_COUNT), `afterbegin`);
render(siteFooterElement, createFilmDetails(filmCards[0]), `afterend`);
