import {getRandomInt} from './util.js';


const generateComment = function () {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const names = ['Борис','Мурка','Пушок','Феликс', 'Котофей', 'Кекс', 'Карамелька', 'Мурзик', 'Барсик', 'Дымок'];

  const generateCom = () => ({
    id: getRandomInt(100, 999),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: `${messages[getRandomInt(0, messages.length - 1)]} ${Math.random() > 0.5 ? messages[getRandomInt(0, messages.length - 1)] : ''}`.trim(),
    name: names[getRandomInt(0, names.length - 1)]
  });

  const generateComments = () => {
    const commentsCount = getRandomInt(0, 30);
    return Array.from({ length: commentsCount }, generateCom);
  };
  return generateComments;
};

export const generatePhotos = () => {
  const photos = [];
  for (let i = 0; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Это моя любимая фотография №${i}`,
      likes: getRandomInt(15, 200),
      comments: generateComment(),
    };
    photos.push(photo);
  }
  return photos;
};

