import ContentContainerView from "../view/container.js";
import FilmCardView from "../view/film.js";
import ButtonShowMoreView from "../view/show-more.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILM_CARD_COUNT_PER_STEP = 5;
const FILM_EXTRA_CARD_COUNT = 2;

const bodyElement = document.querySelector(`body`);

export default class MovieList {
  constructor(contentContainer) {
    this._contentContainer = contentContainer;
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    this._contentContainerComponent = new ContentContainerView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._filmslist = this._contentContainerComponent.getElement().querySelector(`.films-list`);
    this._handlebuttonShowMoreClick = this._handlebuttonShowMoreClick.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    render(this._contentContainer, this._contentContainerComponent, RenderPosition.BEFOREEND);

    this._renderContent();
  }

  _renderFilmCard(filmList, filmCard) {
    const filmCardComponent = new FilmCardView(filmCard);
    const popupComponent = new PopupView(filmCard);

    this._filmList = filmList;

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        remove(popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardComponent.setPopupClickHandler(() => {
      render(bodyElement, popupComponent, RenderPosition.BEFOREEND);
      popupComponent.setPopupCloseClickHandler(() => {
        remove(popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(this._filmList, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderButtonShowMore() {
    const filmslist = this._contentContainerComponent.getElement().querySelector(`.films-list`);
    render(filmslist, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);
    this._buttonShowMoreComponent.setClickHandler(this._handlebuttonShowMoreClick);
  }

  _renderContent() {
    this._mainFilmsContainer = this._contentContainerComponent.getElement().querySelector(`.films-list .films-list__container`);

    for (let i = 0; i < Math.min(this._filmCards.length, FILM_CARD_COUNT_PER_STEP); i++) {
      this._renderFilmCard(this._mainFilmsContainer, this._filmCards[i]);
    }

    if (this._filmCards.length > FILM_CARD_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }

    const filmsExtraContainers = this._contentContainerComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);

    filmsExtraContainers.forEach((filmsExtraContainer) => {
      for (let i = 0; i < FILM_EXTRA_CARD_COUNT; i++) {
        this._renderFilmCard(filmsExtraContainer, this._filmCards[i]);
      }
    });
  }

  _handlebuttonShowMoreClick() {
    this._filmCards
      .slice(this._renderedFilmCardCount, this._renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((filmCard) => this._renderFilmCard(this._mainFilmsContainer, filmCard));
    this._renderedFilmCardCount += FILM_CARD_COUNT_PER_STEP;

    if (this._renderedFilmCardCount >= this._filmCards.length) {
      remove(this._buttonShowMoreComponent);
    }
  }
}
