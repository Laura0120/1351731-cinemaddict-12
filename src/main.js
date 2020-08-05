const FILM_CARD_COUNT = 5;
const FILM_EXTRA_CARD_COUNT = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

import {createUserProfile} from "./view/profile";
import {createMenu} from "./view/menu";
import {createFilter} from "./view/filter";
import {createContentContainer} from "./view/container";
import {createFilmCard} from "./view/film";
import {createButtonShowMore} from "./view/show-more";
import {createFilmDetails} from "./view/film-details";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderContent = () => {
  const filmsContainer = siteMainElement.querySelector(`.films-list .films-list__container`);

  for (let i = 0; i < FILM_CARD_COUNT; i++) {
    render(filmsContainer, createFilmCard(), `beforeend`);
  }

  render(filmsContainer, createButtonShowMore(), `afterend`);

  const filmsExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

  filmsExtraContainers.forEach(function (currentValue) {
    for (let i = 0; i < FILM_EXTRA_CARD_COUNT; i++) {
      render(currentValue, createFilmCard(), `beforeend`);
    }
  });
};

render(siteHeaderElement, createUserProfile(), `beforeend`);
render(siteMainElement, createMenu(), `beforeend`);
render(siteMainElement, createFilter(), `beforeend`);
render(siteMainElement, createContentContainer(), `beforeend`);
renderContent();
render(siteFooterElement, createFilmDetails(), `afterend`);
