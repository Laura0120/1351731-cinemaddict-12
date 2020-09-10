export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.round(lower + Math.random() * (upper - lower));
};

export const updateItem = (array, updatedItem) => {
  const index = array.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return array;
  }

  return [...array.slice(0, index), updatedItem, ...array.slice(index + 1)];
};
