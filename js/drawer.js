import { generatePhotos } from './data.js';
import {openBigPicture} from './big-picture.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();


picturesContainer.forEach((photo) => {
  const element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__img').alt = photo.description;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  openBigPicture(generatePhotos, photo.comments);
  return element;
});

const renderPhotos = () => {
  generatePhotos.forEach((photo) => {
    fragment.appendChild(generatePhotos(photo));
  });
  picturesContainer.appendChild(fragment);
};
export {renderPhotos};
