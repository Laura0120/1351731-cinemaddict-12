import AbstractView from "./abstract.js";

const createFooterStatistics = (filmsCount) => {
  return `<p>${filmsCount} movies inside</p>`;
};

export default class FooterStatistics extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }
}
