import {getRandomInteger} from "./util";
import {
  POSTARS,
  NAMES_FILM,
  DESCRIPTIONS,
  COMMENTS_EMOJI,
  COMMENTS_TEXT,
  COMMENTS_AUTOR,
  COMMENTS_DATE,
  DATE_OF_RELEASE,
  RATING,
  DURATION,
  GERNE,
  DIRECTOR,
  WRITERS,
  COUNTRY,
  AGE_REATING,
  ACTOR,
} from "./const";

const generateRandomLengthString = (array, maxValue, separator) => {
  const stringLength = getRandomInteger(1, maxValue);
  const string = new Array(stringLength)
    .fill()
    .map(() => array[getRandomInteger(0, array.length - 1)])
    .join(separator);
  return string;
};

export const generateComment = () => {
  const commentsCount = getRandomInteger(0, 5);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      emoji: COMMENTS_EMOJI[getRandomInteger(0, COMMENTS_EMOJI.length - 1)],
      day: COMMENTS_DATE[getRandomInteger(0, COMMENTS_DATE.length - 1)],
      autor: COMMENTS_AUTOR[getRandomInteger(0, COMMENTS_AUTOR.length - 1)],
      text: COMMENTS_TEXT[getRandomInteger(0, COMMENTS_TEXT.length - 1)],
    };
    comments.push(comment);
  }
  return comments;
};

export const generateFilmCard = () => {
  return {
    poster: POSTARS[getRandomInteger(0, POSTARS.length - 1)],
    name: NAMES_FILM[getRandomInteger(0, NAMES_FILM.length - 1)],
    originalName: NAMES_FILM[getRandomInteger(0, NAMES_FILM.length - 1)],
    rating: RATING[getRandomInteger(0, RATING.length - 1)],
    Director: DIRECTOR[getRandomInteger(0, DIRECTOR.length - 1)],
    Writers: WRITERS[getRandomInteger(0, WRITERS.length - 1)],
    Actors: generateRandomLengthString(ACTOR, 3, `, `),
    date: DATE_OF_RELEASE[getRandomInteger(0, DATE_OF_RELEASE.length - 1)],
    Runtime: DURATION[getRandomInteger(0, DURATION.length - 1)],
    Country: COUNTRY[getRandomInteger(0, COUNTRY.length - 1)],
    genre: GERNE[getRandomInteger(0, GERNE.length - 1)],
    description: generateRandomLengthString(DESCRIPTIONS, 5, ` `),
    comments: generateComment(),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1)),
    ageRating: AGE_REATING[getRandomInteger(0, AGE_REATING.length - 1)] + `+`,
  };
};
