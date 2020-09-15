import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (filmCards) => filmCards.slice(),
  [FilterType.WATCH_LIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.isWatchlist),
  [FilterType.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.isWatched),
  [FilterType.FAVORITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorite),
};
