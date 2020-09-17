/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: UpdateType, SortType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RITING: `rating`,
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_profile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/profile.js */ "./src/view/profile.js");
/* harmony import */ var _view_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/filter.js */ "./src/view/filter.js");
/* harmony import */ var _view_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/sort.js */ "./src/view/sort.js");
/* harmony import */ var _presenter_movie_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presenter/movie-list.js */ "./src/presenter/movie-list.js");
/* harmony import */ var _view_footer_statistics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/footer-statistics.js */ "./src/view/footer-statistics.js");
/* harmony import */ var _model_film_cards_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model/film-cards.js */ "./src/model/film-cards.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _mock_film__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/film */ "./src/mock/film.js");
/* harmony import */ var _mock_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/filter */ "./src/mock/filter.js");










const FILM_CARD_COUNT = 15;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(_mock_film__WEBPACK_IMPORTED_MODULE_7__["generateFilmCard"]);
const filters = Object(_mock_filter__WEBPACK_IMPORTED_MODULE_8__["generateFilter"])(filmCards);

const filmCardsModel = new _model_film_cards_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
filmCardsModel.setFilmCards(filmCards);

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);
const movieListPresenter = new _presenter_movie_list_js__WEBPACK_IMPORTED_MODULE_3__["default"](siteMainElement, filmCardsModel);

Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(siteHeaderElement, new _view_profile_js__WEBPACK_IMPORTED_MODULE_0__["default"](), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFORE_END);
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(siteMainElement, new _view_filter_js__WEBPACK_IMPORTED_MODULE_1__["default"](filters), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFORE_END);
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(siteMainElement, new _view_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"](), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFORE_END);
movieListPresenter.init();
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(footerStatisticsElement, new _view_footer_statistics_js__WEBPACK_IMPORTED_MODULE_4__["default"](FILM_CARD_COUNT), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].AFTER_BEGIN);


/***/ }),

/***/ "./src/mock/const.js":
/*!***************************!*\
  !*** ./src/mock/const.js ***!
  \***************************/
/*! exports provided: NAMES_FILM, POSTARS, DESCRIPTIONS, COMMENTS_EMOJI, COMMENTS_TEXT, COMMENTS_AUTOR, COMMENTS_DATE, DATE_OF_RELEASE, RATING, DURATION, GENRE, DIRECTOR, WRITERS, COUNTRY, AGE_REATING, ACTOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAMES_FILM", function() { return NAMES_FILM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POSTARS", function() { return POSTARS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESCRIPTIONS", function() { return DESCRIPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENTS_EMOJI", function() { return COMMENTS_EMOJI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENTS_TEXT", function() { return COMMENTS_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENTS_AUTOR", function() { return COMMENTS_AUTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENTS_DATE", function() { return COMMENTS_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_OF_RELEASE", function() { return DATE_OF_RELEASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RATING", function() { return RATING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DURATION", function() { return DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GENRE", function() { return GENRE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTOR", function() { return DIRECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WRITERS", function() { return WRITERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTRY", function() { return COUNTRY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AGE_REATING", function() { return AGE_REATING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTOR", function() { return ACTOR; });
const NAMES_FILM = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const POSTARS = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`,
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;
const DESCRIPTIONS = description.split(`.`);

const COMMENTS_EMOJI = [`images/emoji/angry.png`, `images/emoji/puke.png`, `images/emoji/sleeping.png`, `images/emoji/smile.png`];

const COMMENTS_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const COMMENTS_AUTOR = [`Tim Macoveev`, `John Doe`];
const COMMENTS_DATE = [`2019/12/31 23:59`, `2 days ago`, `Today`];
const DATE_OF_RELEASE = [`01 April 1995`, `01 April 1929`, `01 April 1933`, `01 April 1955`, `01 April 1964`];
const RATING = [`8.3`, `3.2`, `9.0`, `2.3`, `6.3`];
const DURATION = [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `1h 16m`];
const GENRE = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`];
const DIRECTOR = [`Quentin Tarantino`, `Wes Anderson`, `Christopher Nolan`, `Denis Villeneuve`, `Martin Scorsese`];
const WRITERS = [`Billy Wilder`, `Robert Townen`, `Francis Ford Coppola`, `William Goldman`, `Charlie Kaufman`];
const COUNTRY = [`USA`, `Germany`, `Italy`, `France`];
const AGE_REATING = [0, 6, 12, 16, 18];

const ACTOR = [
  `Marilyn Monroe`,
  `Will Smith`,
  `Johnny Depp`,
  `Robert Downey Jr.`,
  `Angelina Jolie`,
  `Charlie Chaplin`,
  `Lisa Kudrow`,
  `David Hasselhoff`,
  `Dirk Benedict`,
  `Ruby Rose`,
  `Ruby Rose`,
  `Jane Russell`,
  `Russell Crowe`,
];


/***/ }),

/***/ "./src/mock/film.js":
/*!**************************!*\
  !*** ./src/mock/film.js ***!
  \**************************/
/*! exports provided: generateFilmCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilmCard", function() { return generateFilmCard; });
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const */ "./src/mock/const.js");


let id = Date.now();
const generateId = () => {
  id += 1;
  return id;
};

const generateRandomLengthString = (array, maxValue, separator) => {
  const stringLength = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, maxValue);
  const string =
    new Array(stringLength)
      .fill()
      .map(() => array[Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, array.length - 1)])
      .join(separator) + `.`;
  return string;
};

const generateComments = () => {
  const commentsCount = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 5);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      emoji: `../../${_const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_EMOJI"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_EMOJI"].length - 1)]}`,
      day: _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_DATE"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_DATE"].length - 1)],
      autor: _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_AUTOR"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_AUTOR"].length - 1)],
      text: _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_TEXT"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_TEXT"].length - 1)],
    };
    comments.push(comment);
  }
  return comments;
};

const generateFilmCard = () => {
  return {
    id: generateId(),
    poster: `../../${_const__WEBPACK_IMPORTED_MODULE_1__["POSTARS"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["POSTARS"].length - 1)]}`,
    name: _const__WEBPACK_IMPORTED_MODULE_1__["NAMES_FILM"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["NAMES_FILM"].length - 1)],
    originalName: _const__WEBPACK_IMPORTED_MODULE_1__["NAMES_FILM"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["NAMES_FILM"].length - 1)],
    rating: _const__WEBPACK_IMPORTED_MODULE_1__["RATING"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["RATING"].length - 1)],
    Director: _const__WEBPACK_IMPORTED_MODULE_1__["DIRECTOR"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["DIRECTOR"].length - 1)],
    Writers: _const__WEBPACK_IMPORTED_MODULE_1__["WRITERS"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["WRITERS"].length - 1)],
    Actors: generateRandomLengthString(_const__WEBPACK_IMPORTED_MODULE_1__["ACTOR"], 3, `, `),
    date: _const__WEBPACK_IMPORTED_MODULE_1__["DATE_OF_RELEASE"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["DATE_OF_RELEASE"].length - 1)],
    Runtime: _const__WEBPACK_IMPORTED_MODULE_1__["DURATION"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["DURATION"].length - 1)],
    Country: _const__WEBPACK_IMPORTED_MODULE_1__["COUNTRY"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["COUNTRY"].length - 1)],
    genre: _const__WEBPACK_IMPORTED_MODULE_1__["GENRE"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["GENRE"].length - 1)],
    description: generateRandomLengthString(_const__WEBPACK_IMPORTED_MODULE_1__["DESCRIPTIONS"], 5, `. `),
    comments: generateComments(),
    isWatchlist: Boolean(Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    isWatched: Boolean(Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    isFavorite: Boolean(Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    ageRating: _const__WEBPACK_IMPORTED_MODULE_1__["AGE_REATING"][Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["AGE_REATING"].length - 1)] + `+`,
    emoji: null,
  };
};


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilter", function() { return generateFilter; });
const getWatchList = (filmCards) => filmCards.filter((filmCard) => filmCard.isWatchlist).length;
const getHistory = (filmCards) => filmCards.filter((filmCard) => filmCard.isHistory).length;
const getFavorites = (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorites).length;

const generateFilter = (filmCards) => {
  const filterFilmCards = {
    Watchlist: getWatchList(filmCards),
    History: getHistory(filmCards),
    Favorites: getFavorites(filmCards),
  };

  return Object.entries(filterFilmCards).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms,
    };
  });
};


/***/ }),

/***/ "./src/model/film-cards.js":
/*!*********************************!*\
  !*** ./src/model/film-cards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmCards; });
/* harmony import */ var _utils_observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/observer.js */ "./src/utils/observer.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");



class FilmCards extends _utils_observer_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/presenter/film.js":
/*!*******************************!*\
  !*** ./src/presenter/film.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmCard; });
/* harmony import */ var _view_film_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/film.js */ "./src/view/film.js");
/* harmony import */ var _view_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/popup.js */ "./src/view/popup.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");




const ViewType = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`,
};
const bodyElement = document.querySelector(`body`);

class FilmCard {
  constructor(filmListContainer, changeData, changeViewType) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeViewType = changeViewType;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._viewType = ViewType.DEFAULT;

    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._closeHandler = this._closeHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevfilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new _view_film_js__WEBPACK_IMPORTED_MODULE_0__["default"](filmCard);
    this._filmCardComponent.setPopupClickHandler(this._handlePopupClick);
    this._filmCardComponent.clickHandler(this._handleFavoriteClick, `.film-card__controls-item--favorite`);
    this._filmCardComponent.clickHandler(this._handleWatchlistClick, `.film-card__controls-item--add-to-watchlist`);
    this._filmCardComponent.clickHandler(this._handleWatchedClick, `.film-card__controls-item--mark-as-watched`);

    this._popupComponent = new _view_popup_js__WEBPACK_IMPORTED_MODULE_1__["default"](filmCard, this._changeData);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setCloseClickHandler(this._closeHandler);

    if (prevfilmCardComponent === null || prevPopupComponent === null) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(this._filmListContainer, this._filmCardComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].BEFORE_END);
      return;
    }
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._filmCardComponent, prevfilmCardComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._popupComponent, prevPopupComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(prevfilmCardComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(prevPopupComponent);
  }

  destroy() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(this._filmCardComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(this._popupComponent);
  }

  resetView() {
    if (this._viewType !== ViewType.DEFAULT) {
      this._closeHandler();
    }
  }

  _closeHandler(evt) {
    if (evt) {
      evt.preventDefault();

      const isEscKey = [`Escape`, `Esc`].includes(evt.key);

      if (evt.key && !isEscKey) {
        return;
      }
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["remove"])(this._popupComponent);
    this._viewType = ViewType.DEFAULT;

    document.removeEventListener(`keydown`, this._closeHandler);
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._filmCard, { isFavorite: !this._filmCard.isFavorite }));
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._filmCard, { isWatchlist: !this._filmCard.isWatchlist }));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._filmCard, { isWatched: !this._filmCard.isWatched }));
  }

  _handlePopupClick() {
    this._popupComponent.updateElement();
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(bodyElement, this._popupComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].BEFORE_END);
    this._changeViewType();
    this._viewType = ViewType.POPUP;
    document.addEventListener(`keydown`, this._closeHandler);
  }
}


/***/ }),

/***/ "./src/presenter/movie-list.js":
/*!*************************************!*\
  !*** ./src/presenter/movie-list.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovieList; });
/* harmony import */ var _view_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/container.js */ "./src/view/container.js");
/* harmony import */ var _film_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./film.js */ "./src/presenter/film.js");
/* harmony import */ var _view_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/sort.js */ "./src/view/sort.js");
/* harmony import */ var _view_show_more_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/show-more.js */ "./src/view/show-more.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _utils_film_card_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/film-card.js */ "./src/utils/film-card.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../const.js */ "./src/const.js");








const FILM_CARD_COUNT_PER_STEP = 5;
// const FILM_EXTRA_CARD_COUNT = 2;
const siteMainElement = bodyElement.querySelector(`.main`);
class MovieList {
  constructor(contentContainer, filmCardsModel) {
    this._filmCardsModel = filmCardsModel;
    this._contentContainer = contentContainer;
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = _const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].DEFAULT;
    this._filmCardPresenter = {};

    this._sortComponent = null;
    this._buttonShowMoreComponent = null;

    this._contentContainerComponent = new _view_container_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    // this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._mainFilmsContainer = this._contentContainerComponent.getElement().querySelector(`.films-list .films-list__container`);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleTypeViewChange = this._handleTypeViewChange.bind(this);

    this._filmCardsModel.addObserver(this._handleFilmCardChange);
  }

  init() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(this._contentContainer, this._contentContainerComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_4__["RenderPosition"].BEFORE_END);

    this._renderContent();
  }

  _getFilmCards() {
    switch (this._currentSortType) {
      case _const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].DATE:
        return this._filmCardsModel.getFilmCards().slice().sort(_utils_film_card_js__WEBPACK_IMPORTED_MODULE_5__["sortByDate"]);
      case _const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].RATING:
        return this._filmCardsModel.getFilmCards().slice().sort(_utils_film_card_js__WEBPACK_IMPORTED_MODULE_5__["sortByRating"]);
    }

    return this._filmCardsModel.getFilmCards();
  }

  _handleTypeViewChange() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(data, updateType) {
    switch (updateType) {
      case _const_js__WEBPACK_IMPORTED_MODULE_6__["UpdateType"].PATCH:
        this._filmCardPresenter[data.id].init(data);
        break;
      case _const_js__WEBPACK_IMPORTED_MODULE_6__["UpdateType"].MINOR:
        this._clearContentContainer();
        this._renderContentContainer();
        break;
      case _const_js__WEBPACK_IMPORTED_MODULE_6__["UpdateType"].MAJOR:
        this._clearContentContainer({ resetRenderedFilmCardCount: true, resetSortType: true });
        this._renderContentContainer();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearContentContainer({ resetRenderedFilmCardCount: true });
    this._renderContentContainer();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new _view_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"](this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(siteMainElement, this._sortComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_4__["RenderPosition"].AFTERBEGIN);
  }

  _handleViewAction(updateFilmCard) {
    this._filmCardsModel.updateFilmCards(updateFilmCard);
  }

  _handleButtonShowMoreClick() {
    const filmCardCount = this._getFilmCards().length;
    const newRenderdfilmCardCount = Math.min(filmCardCount, this._renderedFilmCardCount + FILM_CARD_COUNT_PER_STEP);
    const filmCards = this._getFilmCards().slice(this._renderedFilmCardCount, newRenderdfilmCardCount);

    this._renderFilmCards(filmCards, this._mainFilmsContainer);
    this._renderedFilmCardCount = newRenderdfilmCardCount;

    if (this._renderedFilmCardCount >= filmCardCount) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["remove"])(this._buttonShowMoreComponent);
    }
  }

  _renderFilmCard(filmList, filmCard) {
    const filmCardPresenter = new _film_js__WEBPACK_IMPORTED_MODULE_1__["default"](filmList, this._handleViewAction, this._handleTypeViewChange);
    filmCardPresenter.init(filmCard);
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilmCards(filmCards, filmList) {
    filmCards.forEach((filmCard) => this._renderFilmCard(filmList, filmCard));
  }

  _renderButtonShowMore() {
    if (this._buttonShowMoreComponent !== null) {
      this._buttonShowMoreComponent = null;
    }

    this._buttonShowMoreComponent = new _view_show_more_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(filmslist, this._buttonShowMoreComponent, _utils_render_js__WEBPACK_IMPORTED_MODULE_4__["RenderPosition"].BEFOREEND);
  }

  _clearContent() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmCardCount = FILM_CARD_COUNT_PER_STEP;
  }

  _clearContentontener({ resetRenderedFilmCardCount = false, resetSortType = false } = {}) {
    const filmCardCount = this._getfilmCards().length;

    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["remove"])(this._sortComponent);
    // remove(this._noFilmCardComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["remove"])(this._buttonShowMoreComponent);

    if (resetRenderedFilmCardCount) {
      this._renderedfilmCardCount = FILM_CARD_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedfilmCardCount = Math.min(filmCardCount, this._renderedfilmCardCount);
    }

    if (resetSortType) {
      this._currentSortType = _const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].DEFAULT;
    }
  }

  _renderBoard() {
    const filmCards = this._getFilmCards();

    const filmCardCount = filmCards.length;

    // if (filmCardCount === 0) {
    //   this._renderNoTasks();
    //   return;
    // }

    this._renderSort();

    // Теперь, когда _renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство _renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
    this._renderContent(filmCards.slice(0, Math.min(filmCardCount, this._renderedTaskCount)), this._mainFilmsContainer);

    if (filmCardCount > this._renderedfilmCardCount) {
      this._buttonShowMoreComponent();
    }
  }

  // _renderContent() {
  //   const filmCardCount = this._getFilmCards().length;
  //   const filmCards = this._getFilmCards().slice(0, Math.min(filmCardCount, FILM_CARD_COUNT_PER_STEP));
  //   this._renderFilmCards(filmCards, this._mainFilmsContainer);

  //   if (filmCardCount > FILM_CARD_COUNT_PER_STEP) {
  //     this._renderButtonShowMore();
  //   }
  // }
}


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: getRandomInteger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.round(lower + Math.random() * (upper - lower));
};


/***/ }),

/***/ "./src/utils/film-card.js":
/*!********************************!*\
  !*** ./src/utils/film-card.js ***!
  \********************************/
/*! exports provided: sortByDate, sortByRating */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByDate", function() { return sortByDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByRating", function() { return sortByRating; });
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (filmCardA, filmCardB) => {
  const weight = getWeightForNullDate(filmCardA.date, filmCardB.date);

  if (weight !== null) {
    return weight;
  }

  return filmCardA.date.getTime() - filmCardB.date.getTime();
};

const sortByRating = (filmCardA, filmCardB) => {
  const weight = getWeightForNullDate(filmCardA.rating, filmCardB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmCardA.rating - filmCardB.rating;
};


/***/ }),

/***/ "./src/utils/observer.js":
/*!*******************************!*\
  !*** ./src/utils/observer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observer; });
class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(payload, event) {
    this._observers.forEach((observer) => observer(payload, event));
  }
}


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: RenderPosition, render, renderTemplate, createElement, replace, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderTemplate", function() { return renderTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony import */ var _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract.js */ "./src/view/abstract.js");


const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

const render = (container, child, place) => {
  if (child instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      container.append(child);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  if (container instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};


/***/ }),

/***/ "./src/view/abstract.js":
/*!******************************!*\
  !*** ./src/view/abstract.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Abstract; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = () => {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/view/container.js":
/*!*******************************!*\
  !*** ./src/view/container.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContentContainer; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createContentContainer = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
  
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>
  
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>
  </section>`;
};

class ContentContainer extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createContentContainer();
  }
}


/***/ }),

/***/ "./src/view/film.js":
/*!**************************!*\
  !*** ./src/view/film.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmCard; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const COUNT_SIMBOL_DESCRIPTION = 140;

const createFilmCard = (filmCard) => {
  const {poster, name, rating, date, Runtime, genre, description, comments} = filmCard;
  return `<article class="film-card" >
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.slice(date.length - 5)}</span>
      <span class="film-card__duration">${Runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > COUNT_SIMBOL_DESCRIPTION ? description.slice(0, 140) + `...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

class FilmCard extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._filmCard);
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    const clickControls = [];
    [`.film-card__title`, `.film-card__comments`, `.film-card__poster`].forEach((value) => {
      clickControls.push(this.getElement().querySelector(value));
    });

    if (clickControls.includes(event.target)) {
      this._callback.popupClick();
    }
  }

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().addEventListener(`click`, this._popupClickHandler);
  }

  clickHandler(callback, selector) {
    this.getElement().querySelector(selector).addEventListener(`click`, callback);
  }
}


/***/ }),

/***/ "./src/view/filter.js":
/*!****************************!*\
  !*** ./src/view/filter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${name}<span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterTemplate = (filters) => {
  const filterItems = filters.map((filter) => createFilterItemTemplate(filter)).join(``);
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

class Filter extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}


/***/ }),

/***/ "./src/view/footer-statistics.js":
/*!***************************************!*\
  !*** ./src/view/footer-statistics.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FooterStatistics; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createFooterStatistics = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

class FooterStatistics extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }
}


/***/ }),

/***/ "./src/view/popup.js":
/*!***************************!*\
  !*** ./src/view/popup.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Popup; });
/* harmony import */ var _smart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./smart.js */ "./src/view/smart.js");


const generatePopup = (filmCard, start, end) => {
  return Object.entries(filmCard)
    .slice(start, end)
    .map(([detailsItemName, detailsValue]) => {
      return {
        detailsItem: detailsItemName === `date` ? `Release Date` : detailsItemName,
        detailsItemValue: detailsValue,
      };
    });
};

const createPopupTableItem = (detail) => {
  const {detailsItem, detailsItemValue} = detail;
  return ` <tr class="film-details__row">
  <td class="film-details__term">${detailsItem}</td>
  <td class="film-details__cell">${detailsItemValue}</td>
</tr>`;
};

const createPopupTable = (detailsTableItems) => {
  return detailsTableItems.map((detailsTableItem) => createPopupTableItem(detailsTableItem)).join(``);
};

const createFilmGenre = (genre) => {
  const filmGenre = genre.split(` `);
  return ` <tr class="film-details__row">
  <td class="film-details__term">${filmGenre.length > 1 ? `Genres` : `Genre`}</td>
  <td class="film-details__cell">${filmGenre.map((element) => `<span class="film-details__genre">${element}</span>`).join(``)}</td>
</tr>`;
};

const createComment = (comment) => {
  const {emoji, day, autor, text} = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src= ${emoji} width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${autor}</span>
      <span class="film-details__comment-day">${day}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

const createComments = (comments) => comments.map((comment) => createComment(comment)).join(``);

const createPopup = (filmCard) => {
  const {poster, ageRating, name, originalName, rating, genre, description, comments, emoji} = filmCard;
  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
    
              <p class="film-details__age">${ageRating}</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originalName}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
              ${createPopupTable(generatePopup(filmCard, 4, 10))} 
              ${createFilmGenre(genre)}
              </table>
              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
    
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    
            <ul class="film-details__comments-list">
            ${createComments(comments)}
            </ul>
    
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              ${emoji !== null ? `<img src="../../images/emoji/${emoji}.png" width="100%" height="100%" alt="emoji-smile"></img>` : ``}
              </div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
};

class Popup extends _smart_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmCard, changeData) {
    super();
    this._data = filmCard;
    this._changeData = changeData;
    this._сloseClickHandler = this._сloseClickHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopup(this._data);
  }

  restoreHandlers() {
    this.setCloseClickHandler(this._callback.popupCloseClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiClickHandler);
  }

  _сloseClickHandler(evt) {
    this._callback.popupCloseClick(evt);
  }

  _handleFavoriteClick() {
    this._callback.favoriteClick();
  }

  _handleWatchlistClick() {
    this._callback.watchlistClick();
  }

  _handleWatchedClick() {
    this._callback.watchedClick();
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value,
    });
  }

  setCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._сloseClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._handleFavoriteClick);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._handleWatchlistClick);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._handleWatchedClick);
  }
}


/***/ }),

/***/ "./src/view/profile.js":
/*!*****************************!*\
  !*** ./src/view/profile.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserProfile; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createUserProfile = () => {
  return `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

class UserProfile extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createUserProfile();
  }
}


/***/ }),

/***/ "./src/view/show-more.js":
/*!*******************************!*\
  !*** ./src/view/show-more.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ButtonShowMore; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createButtonShowMore = () => `<button class="films-list__show-more">Show more</button>`;

class ButtonShowMore extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  getTemplate() {
    return createButtonShowMore();
  }
}


/***/ }),

/***/ "./src/view/smart.js":
/*!***************************!*\
  !*** ./src/view/smart.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Smart; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


class Smart extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._data = {};
  }
  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(this._data, update);

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}


/***/ }),

/***/ "./src/view/sort.js":
/*!**************************!*\
  !*** ./src/view/sort.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createSortTemplate = () => {
  return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`;
};

class Sort extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createSortTemplate();
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map