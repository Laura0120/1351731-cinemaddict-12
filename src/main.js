import UserProfile from "./view/profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmCardView from "./view/film.js";
import ContentContainerViewView from "./view/container.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import ButtonShowMoreView from "./view/show-more.js";
import PopupView from "./view/popup.js";
import {render, RenderPosition} from "./util";
import {generateFilmCard} from "./mock/film";
import {generateFilter} from "./mock/filter";

const FILM_CARD_COUNT = 15;
const FILM_CARD_COUNT_PER_STEP = 5;
const FILM_EXTRA_CARD_COUNT = 2;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);
const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);
const contentContainer = new ContentContainerViewView();

const renderFilmCard = (container, filmCard) => {
  const filmCardComponent = new FilmCardView(filmCard);
  const popupComponent = new PopupView(filmCard);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      bodyElement.removeChild(popupComponent.getElement());
      popupComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  [`.film-card__title`, `.film-card__comments`, `.film-card__poster`].forEach((value) =>
    filmCardComponent
      .getElement()
      .querySelector(value)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        bodyElement.appendChild(popupComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      })
  );

  popupComponent
    .getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      bodyElement.removeChild(popupComponent.getElement());
      popupComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(container, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderContent = () => {
  const filmslist = contentContainer.getElement().querySelector(`.films-list`);
  const filmsContainer = contentContainer.getElement().querySelector(`.films-list .films-list__container`);

  for (let i = 0; i < Math.min(filmCards.length, FILM_CARD_COUNT_PER_STEP); i++) {
    renderFilmCard(filmsContainer, filmCards[i]);
  }
  if (filmCards.length > FILM_CARD_COUNT_PER_STEP) {
    let renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    const showMoreButton = new ButtonShowMoreView();
    render(filmslist, showMoreButton.getElement(), RenderPosition.BEFOREEND);

    showMoreButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmCards
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP)
        .forEach((filmCard) => render(filmsContainer, new FilmCardView(filmCard).getElement(), RenderPosition.BEFOREEND));

      renderedFilmCardCount += FILM_CARD_COUNT_PER_STEP;

      if (renderedFilmCardCount >= filmCards.length) {
        filmslist.removeChild(showMoreButton.getElement());
        showMoreButton.removeElement();
      }
    });
  }

  const filmsExtraContainers = contentContainer.getElement().querySelectorAll(`.films-list--extra .films-list__container`);

  filmsExtraContainers.forEach((filmsExtraContainer) => {
    for (let i = 0; i < FILM_EXTRA_CARD_COUNT; i++) {
      renderFilmCard(filmsExtraContainer, filmCards[i]);
    }
  });
};

render(siteHeaderElement, new UserProfile().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, contentContainer.getElement(), RenderPosition.BEFOREEND);
renderContent();
render(footerStatisticsElement, new FooterStatisticsView(FILM_CARD_COUNT).getElement(), RenderPosition.AFTERBEGIN);
