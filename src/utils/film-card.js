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

export const sortByDate = (filmCardA, filmCardB) => {
  const weight = getWeightForNullDate(filmCardA.date, filmCardB.date);

  if (weight !== null) {
    return weight;
  }

  return filmCardA.date.getTime() - filmCardB.date.getTime();
};

export const sortByRating = (filmCardA, filmCardB) => {
  const weight = getWeightForNullDate(filmCardA.rating, filmCardB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmCardA.rating - filmCardB.rating;
};
