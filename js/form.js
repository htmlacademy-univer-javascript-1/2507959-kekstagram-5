import { isEscapeKey } from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const file = document.querySelector('.img-upload__input');
const cancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const description = form.querySelector('.text__description');
const hashtag = form.querySelector('.text__hashtags');
const body = document.querySelector('.body');

const maxHashCount = 5;
const maxDescriptionLen = 140;
const incorrectSymb = /^#[a-zA-Zа-яёА-ЯЁ0-9]{1,19}$/i;

let errorType = '';

function handleKeydown(evt) {
  if (document.activeElement !== description && document.activeElement !== hashtag) {
    isEscapeKey(evt, formClose);
  }
}

function formOpen() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
}

function formClose() {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydown);
}

cancel.addEventListener('click', formClose);

file.addEventListener('change', formOpen);

const validate = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextClass: 'form__error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

const errorMessages = {
  invalidCount: 'Превышено количество хэш-тегов',
  invalidUnique: 'Хэш-теги повторяются',
  invalidReg: 'Введён невалидный хэш-тег'
};

function validateHashtag(value) {
  const hashtags = value.split(/\s+/).filter(Boolean);
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    errorType = 'invalidUnique';
    return false;
  }
  if (hashtags.length > maxHashCount) {
    errorType = 'invalidCount';
    return false;
  }
  for (const tag of hashtags) {
    if (!incorrectSymb.test(tag)) {
      errorType = 'invalidReg';
      return false;
    }
  }
  return true;
}

function validateDescription(value) {
  return value.length <= maxDescriptionLen;
}

validate.addValidator(hashtag, validateHashtag, () => errorMessages[errorType]);
validate.addValidator(description, validateDescription, 'Длина комментария превышена');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validate.validate()) {
    form.submit();
  }
});

export { formOpen };
