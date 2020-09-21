export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.round(lower + Math.random() * (upper - lower));
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const getProfileRating = (movies) => {
  let profileRatingt = ``;
  if (movies.length >= 1 || movies.length <= 10) {
    profileRatingt = `novice`;
  }
  if (movies.length >= 11 || movies.length <= 20) {
    profileRatingt = `fan`;
  }
  if (movies.length >= 21) {
    profileRatingt = `movie buff`;
  }

  return profileRatingt;
};
