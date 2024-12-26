import { renderPhotos } from './drawer.js';
import { debounce } from './util.js';
import { getData } from './api.js';
import { displayLoadError } from './messages.js';

let photos;
const RANDOM_PHOTOS_LIMIT = 10;
const TIMEOUT = 500;
const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const imgFiltersElement = document.querySelector('.img-filters');
const filterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');
const filterDefaultButton = imgFiltersElement.querySelector('#filter-default');
const filterRandomButton = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersElement.querySelector('#filter-discussed');

const showFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const getRandomPhotos = (pictures) => {
  const randomPhotos = pictures.sort(() => 0.5 - Math.random());
  return randomPhotos.slice(0, RANDOM_PHOTOS_LIMIT);
};

const getDiscussedPhotos = (pictures) => pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

const onFilterChange = debounce((filter, button) => {
  let filteredPhotos;
  switch (filter) {
    case FilterType.DEFAULT:
      filteredPhotos = photos;
      break;
    case FilterType.RANDOM:
      filteredPhotos = getRandomPhotos(photos);
      break;
    case FilterType.DISCUSSED:
      filteredPhotos = getDiscussedPhotos(photos);
      break;
  }
  renderPhotos(filteredPhotos);
  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
}, TIMEOUT);

filterDefaultButton.addEventListener('click', () => onFilterChange(FilterType.DEFAULT, filterDefaultButton));
filterRandomButton.addEventListener('click', () => onFilterChange(FilterType.RANDOM, filterRandomButton));
filterDiscussedButton.addEventListener('click', () => onFilterChange(FilterType.DISCUSSED, filterDiscussedButton));

getData((data) => {
  photos = data;
  showFilters();
  renderPhotos(photos);
}, displayLoadError);


=======
import { renderThumbnails } from './rendering.js';
import { debounce } from './util.js';
import { fetchData } from './api.js';
import { showLoadError } from './message.js';

const RANDOM_PHOTOS_LIMIT = 10;
const DEBOUNCE_DELAY = 500;

const filterType = {
  DEFAULT: 'default',
  DISCUSSED: 'discussed',
  RANDOM: 'random',
};

let initialPhotos;
const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');
const defaultFilterButton = filtersContainer.querySelector('#filter-default');
const randomFilterButton = filtersContainer.querySelector('#filter-random');
const discussedFilterButton = filtersContainer.querySelector('#filter-discussed');

const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

const setActiveButton = (activeButton) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
};

const getRandomPhotos = (pictures) => [...pictures].sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_LIMIT);

const getDiscussedPhotos = (pictures) => [...pictures].sort((a, b) => b.comments.length - a.comments.length);


const applyFilter = (filter, button) => {
  let filteredPhotos;

  switch (filter) {
    case filterType.DEFAULT:
      filteredPhotos = initialPhotos;
      break;
    case filterType.RANDOM:
      filteredPhotos = getRandomPhotos(initialPhotos);
      break;
    case filterType.DISCUSSED:
      filteredPhotos = getDiscussedPhotos(initialPhotos);
      break;
    default:
      filteredPhotos = initialPhotos;
  }
  renderThumbnails(filteredPhotos);
  setActiveButton(button);
};

const debouncedFilterChange = debounce(applyFilter, DEBOUNCE_DELAY);


defaultFilterButton.addEventListener('click', () => debouncedFilterChange(filterType.DEFAULT, defaultFilterButton));
randomFilterButton.addEventListener('click', () => debouncedFilterChange(filterType.RANDOM, randomFilterButton));
discussedFilterButton.addEventListener('click', () => debouncedFilterChange(filterType.DISCUSSED, discussedFilterButton));

fetchData((data) => {
  initialPhotos = data;
  showFilters();
  renderThumbnails(initialPhotos);
}, showLoadError);
