import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `<a href="#" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}
  " data-filter-type="${type}">${name} ${name !== `All movies` ? `<span class='main-navigation__item-count'>${count}</span>` : ``}</a> `;
};

const createFilterTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);
  return `<nav class="main-navigation">
    <div class="main-navigation__items" data-nav-type="filter">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional" data-nav-type="stats">Stats</a>
  </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._navFilterClickHandler = this._navFilterClickHandler.bind(this);
    this._navStatsClickHandler = this._navStatsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _navFilterClickHandler(evt) {
    this._callback.navClick(evt.target.dataset.navType);
  }

  _navStatsClickHandler(evt) {
    evt.preventDefault();
    this._callback.navClick(evt.target.dataset.navType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.currentTarget.dataset.filterType);
  }

  setFilterClickHandler(callback) {
    this._callback.navClick = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._navFilterClickHandler);
  }

  setStatsClickHandler(callback) {
    this._callback.navClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._navStatsClickHandler);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((element) => {
        element.addEventListener(`click`, this._filterTypeChangeHandler);
      });
  }
}
