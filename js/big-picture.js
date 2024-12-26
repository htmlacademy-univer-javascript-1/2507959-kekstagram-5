import { isEscapeKey } from './util.js';
const commentListStep = 5;
let currentComments = [];
let currentCommentsCount = 0;
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
const closeButton = bigPicture.querySelector('.big-picture__cancel');


function fillBigPicture(pictureElement, comments) {
  bigPicImg.src = pictureElement.querySelector('.picture__img').src;
  likesCount.textContent = pictureElement.querySelector('.picture__likes').textContent;
  socialCaption.textContent = pictureElement.querySelector('.picture__img').alt;
  commentsCount.textContent = comments.length;
  currentComments = comments;
  currentCommentsCount = 0;
  fillComments();
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.toggle('hidden', comments.length <= commentListStep);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}
function fillComments() {
  const shownComments = currentComments.slice(currentCommentsCount, currentCommentsCount + commentListStep);
  const fragment = document.createDocumentFragment();
  shownComments.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = commentData.avatar;
    comment.querySelector('.social__picture').alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;
    fragment.appendChild(comment);
  });
  socialComments.appendChild(fragment);
  currentCommentsCount += shownComments.length;
  commentsLoader.classList.toggle('hidden', currentCommentsCount >= currentComments.length);
  newCommentCount();
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  socialComments.innerHTML = '';
  currentComments = [];
  currentCommentsCount = 0;
}
function newCommentCount() {
  commentCountBlock.textContent = `${currentCommentsCount} из ${currentComments.length} комментариев`;
}
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}
commentsLoader.addEventListener('click', fillComments);
function openBigPicture(pictureElement, comments) {
  fillBigPicture(pictureElement, comments);
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };
