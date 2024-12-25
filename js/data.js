import { getRandomInt } from './util.js';
import { getRandomArray } from './util.js';
const generateComment = function (count) {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const comments = [];
  const names = ['Борис', 'Мурка', 'Пушок', 'Феликс', 'Котофей', 'Кекс', 'Карамелька', 'Мурзик', 'Барсик', 'Дымок'];

  for (let i = 1; i < count; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInt(1, 7)}.svg`,
      message: getRandomArray(messages),
      name: getRandomArray(names)
    });
  }
  return comments;
};

const generatePhotos = () => {
  const photos = [];
  const descriptions = [
    'Уютненько',
    'Красивенько',
    'Красота',
    'Хорошего Вам дня!',
    'Незабываемый день!'
  ];
  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArray(descriptions),
      likes: getRandomInt(15, 200),
      comments: generateComment(getRandomInt(0, 30)),
    };
    photos.push(photo);
  }
  return photos;
};

export default generatePhotos;
