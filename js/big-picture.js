import { onEscapePress } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const clone = bigPicture.querySelector('.social__comment').cloneNode(true);
const onDocumentKeydown = (evt) => onEscapePress(evt, closeBigPicture);
const closeButton = bigPicture.querySelector('.big-picture__cancel');

bigPicture.querySelectorAll('.social__comment').forEach((el) => (el.innerHTML = ''));

function fillBigPicture(picture, comments) {
  bigPicImg.src = picture.querySelector('.picture__img').src;
  likesCount.textContent = picture.querySelector('.picture__likes').textContent;
  commentsCount.textContent = comments.length;
  fillComments(comments);
  socialCaption.textContent = picture.querySelector('.picture__img').alt;
  commentsLoader.classList.add('hidden');
  commentCountBlock.classList.add('hidden');
  bigPicture.classList.remove('hidden');
}

function fillComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    const comment = clone.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;
    socialComments.appendChild(comment);
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openBigPicture(picture, comments) {
  picture.addEventListener('click', () => {
    fillBigPicture(picture, comments);
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

closeButton.addEventListener('click', () => closeBigPicture());
document.addEventListener('keydown', onEscapePress(closeBigPicture));

export { openBigPicture };
