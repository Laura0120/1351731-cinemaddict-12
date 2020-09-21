import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

import SmartView from './smart.js';
import {getCurrentDate, getProfileRating} from '../utils/common.js';
import {watchedMovieInDateRange} from '../utils/statistics.js';
import {StatisticFilters, DataFormats} from '../const.js';

const filterMovies = ({movies, currentFilter, startDate, dateTo}) => {
  if (currentFilter === StatisticFilters.ALL_TIME) {
    return movies.filter((movie) => movie.isWatched);
  }

  return watchedMovieInDateRange(movies, startDate, dateTo);
};

const getGenresCounts = (movies) =>
  movies.reduce((acc, movie) => {
    movie.genre.forEach((genre) => {
      if (acc[genre]) {
        acc[genre] += 1;
      } else {
        acc[genre] = 1;
      }
    });
    return acc;
  }, {});

const getSortedGenresByCounts = (movies) => {
  if (!movies || !movies.length) {
    return [];
  }

  return Object.entries(getGenresCounts(movies)).sort(([, valueA], [, valueB]) => valueB - valueA);
};

const renderGenreChart = (genreCtx, data) => {
  const BAR_HEIGHT = 50;
  const filteredMovies = filterMovies(data);
  const genresCounts = getSortedGenresByCounts(filteredMovies);
  const uniqGenres = [];
  const movieByGenreCounts = [];

  genresCounts.forEach(([genre, count]) => {
    uniqGenres.push(genre);
    movieByGenreCounts.push(count);
  });
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  genreCtx.height = BAR_HEIGHT * uniqGenres.length;

  return new Chart(genreCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqGenres,
      datasets: [
        {
          data: movieByGenreCounts,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = (data) => {
  const filteredMovies = filterMovies(data);
  const totalDuration = moment
    .utc()
    .startOf(`day`)
    .add({
      minutes: filteredMovies.reduce((acc, movie) => {
        acc += movie.runtime;
        return acc;
      }, 0),
    })
    .format(DataFormats.FILM_DURATION_VIEW);

  const topRated = getSortedGenresByCounts(filteredMovies)[0];

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${getProfileRating(data.movies)}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time"
    ${data.currentFilter === StatisticFilters.ALL_TIME ? `checked` : ``}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"
     ${data.currentFilter === StatisticFilters.TODAY ? `checked` : ``}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week"
     ${data.currentFilter === StatisticFilters.WEEK ? `checked` : ``}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month"
     ${data.currentFilter === StatisticFilters.MONTH ? `checked` : ``}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year"
     ${data.currentFilter === StatisticFilters.YEAR ? `checked` : ``}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${filteredMovies.length}
      <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${totalDuration}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topRated ? topRated[0] : ``}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class Statistics extends SmartView {
  constructor(movies) {
    super();

    this._date = {
      dateTo: new Date(),
      today: (() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return currentDate;
      })(),

      weekAgo: (() => {
        const daysToFullWeek = 6;
        const date = getCurrentDate();
        date.setDate(date.getDate() - daysToFullWeek);
        return date;
      })(),

      monthAgo: (() => {
        const daysToFullMonth = 30;
        const date = getCurrentDate();
        date.setDate(date.getDate() - daysToFullMonth);
        return date;
      })(),

      yearAgo: (() => {
        const daysToFullYear = 364;
        const date = getCurrentDate();
        date.setDate(date.getDate() - daysToFullYear);
        return date;
      })(),
    };

    this._data = {
      movies: movies.filter((movie) => movie.isWatched),
      currentFilter: StatisticFilters.ALL_TIME,
      dateTo: this._date.dateTo,
      startDate: null,
    };

    this._genreChart = null;

    this._handleChangeStatFilter = this._handleChangeStatFilter.bind(this);

    this._setChart();
    this._setInnerHandlers();
  }

  _handleChangeStatFilter(evt) {
    if (evt.target.value === this._data.currentFilter) {
      return;
    }

    const startDate = this._getMoviesRangeStart(evt.target.value);

    this.updateData({currentFilter: evt.target.value, startDate});
  }

  _getMoviesRangeStart(value) {
    switch (value) {
      case StatisticFilters.ALL_TIME:
        return null;
      case StatisticFilters.TODAY:
        return this._date.today;
      case StatisticFilters.WEEK:
        return this._date.weekAgo;
      case StatisticFilters.MONTH:
        return this._date.monthAgo;
      case StatisticFilters.YEAR:
        return this._date.yearAgo;
    }

    return this._date.dateTo;
  }

  removeElement() {
    super.removeElement();

    if (this._genreCart !== null) {
      this._genreCart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setChart();
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((element) => element.addEventListener(`click`, this._handleChangeStatFilter));
  }

  _setChart() {
    if (this._genreChart !== null) {
      this._genreChart = null;
    }

    const genreCtx = this.getElement().querySelector(`.statistic__chart`);

    this._genreChart = renderGenreChart(genreCtx, this._data);
  }
}
