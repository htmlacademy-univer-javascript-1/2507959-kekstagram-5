export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscapeKey = (evt) => evt.key === 'Escape';

export const getRandomArray = (elements) => elements[getRandomInt(0, elements.length - 1)];
export default {isEscapeKey};
