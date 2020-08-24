const getWatchlist = (filmCards) => filmCards.filter((filmCard) => filmCard.isWatchlist).length;
const getHistory = (filmCards) => filmCards.filter((filmCard) => filmCard.isHistory).length;
const getFavorites = (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorites).length;

export const generateFilter = (filmCards) => {
  const filterFilmCards = {
    Watchlist: getWatchlist(filmCards),
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
