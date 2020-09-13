import Observer from "../utils/observer.js";
import { UpdateType } from "../const";

export default class FilmCards extends Observer {
  constructor() {
    super();
    this._filmCards = [];
  }

  setFilmCards(filmCards) {
    this._filmCards = filmCards.slice();
  }

  getFilmCards() {
    return this._filmCards;
  }

  updateFilmCards(updatedFilmCard) {
    const index = this._filmCards.findIndex((filmCard) => filmCard.id === updatedFilmCard.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._filmCards = [...this._filmCards.slice(0, index), updatedFilmCard, ...this._filmCards.slice(index + 1)];

    this._notify({ payload: updatedFilmCard });
  }
}
