import { getRandomInteger } from '../utils/common';
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
  GENRE,
  DIRECTOR,
  WRITERS,
  COUNTRY,
  AGE_REATING,
  ACTOR,
} from './const';
import moment from 'moment';

let id = Date.now();

export const generateId = () => {
  id += 1;
  return String(id);
};

const generateRandomLengthString = (array, maxValue, separator) => {
  const stringLength = getRandomInteger(1, maxValue);
  const string =
    new Array(stringLength)
      .fill()
      .map(() => array[getRandomInteger(0, array.length - 1)])
      .join(separator) + `.`;
  return string;
};

export const generateComment = (comment = {}) => ({
  id: generateId(),
  emoji: `../../${COMMENTS_EMOJI[getRandomInteger(0, COMMENTS_EMOJI.length - 1)]}`,
  day: moment(COMMENTS_DATE[getRandomInteger(0, COMMENTS_DATE.length - 1)]),
  autor: COMMENTS_AUTOR[getRandomInteger(0, COMMENTS_AUTOR.length - 1)],
  text: COMMENTS_TEXT[getRandomInteger(0, COMMENTS_TEXT.length - 1)],
  ...comment,
});

// const generateComments = () => {
//   const commentsCount = getRandomInteger(0, 5);
//   const comments = [];
//   for (let i = 0; i < commentsCount; i++) {
//     comments.push(generateComment());
//   }
//   return comments;
// };

// export const generateFilmCard = () => {
//   return {
//     id: generateId(),
//     poster: `../../${POSTARS[getRandomInteger(0, POSTARS.length - 1)]}`,
//     alternativeTitle: NAMES_FILM[getRandomInteger(0, NAMES_FILM.length - 1)],
//     title: NAMES_FILM[getRandomInteger(0, NAMES_FILM.length - 1)],
//     rating: RATING[getRandomInteger(0, RATING.length - 1)],
//     director: DIRECTOR[getRandomInteger(0, DIRECTOR.length - 1)],
//     writers: WRITERS[getRandomInteger(0, WRITERS.length - 1)],
//     actors: generateRandomLengthString(ACTOR, 3, `, `),
//     date: moment(DATE_OF_RELEASE[getRandomInteger(0, DATE_OF_RELEASE.length - 1)]),
//     runtime: moment
//       .utc()
//       .startOf('day')
//       .add({ minutes: DURATION[getRandomInteger(0, DURATION.length - 1)] }),
//     country: COUNTRY[getRandomInteger(0, COUNTRY.length - 1)],
//     genre: GENRE[getRandomInteger(0, GENRE.length - 1)],
//     description: generateRandomLengthString(DESCRIPTIONS, 5, `. `),
//     comments: generateComments(),
//     isWatchlist: Boolean(getRandomInteger(0, 1)),
//     isWatched: Boolean(getRandomInteger(0, 1)),
//     isFavorite: Boolean(getRandomInteger(0, 1)),
//     ageRating: AGE_REATING[getRandomInteger(0, AGE_REATING.length - 1)] + `+`,
//   };
// };
