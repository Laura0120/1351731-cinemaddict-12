const filterFilmCards = {
  Watchlist: (filmCards) => filmCards.filter((filmCard) => filmCard.isWatchlist).length,
  History: (filmCards) => filmCards.filter((filmCard) => filmCard.isHistory).length,
  Favorites: (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorites).length,
};

export const generateFilter = (filmCards) => {
  return Object.entries(filterFilmCards).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filmCards),
    };
  });
};
