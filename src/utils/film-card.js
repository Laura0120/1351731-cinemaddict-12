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

export const sortByDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.date, movieB.date);

  if (weight !== null) {
    return weight;
  }

  return movieB.date.diff(movieA.date, `seconds`);
};

export const sortByRating = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.rating, movieB.rating);

  if (weight !== null) {
    return weight;
  }

  return movieB.rating - movieA.rating;
};

export const sortByComments = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.comments, movieB.comments);

  if (weight !== null) {
    return weight;
  }

  return movieB.comments.length - movieA.comments.length;
};
