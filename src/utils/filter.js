import { FilterType } from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies.slice(),
  [FilterType.WATCH_LIST]: (movies) => movies.filter((filmCard) => filmCard.isWatchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((filmCard) => filmCard.isWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((filmCard) => filmCard.isFavorite),
};
