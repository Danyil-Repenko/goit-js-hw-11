import './css/styles.css';
import { fetchPhotos } from './fetchPhotos.js';
import { creatMarkup } from './markup.js'
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from 'lodash.throttle';
import OnlyScroll from 'only-scrollbar';

const refs = {
  form: document.querySelector("#search-form"),
  queryInput: document.querySelector("[name='searchQuery']"),
  gallery: document.querySelector("div.gallery"),
}

const scroll = new OnlyScroll(document.scrollingElement, {
  damping: 0.6,
});

refs.form.addEventListener('submit', onSearch);
window.addEventListener('scroll', throttle(checkPosition, 350));

let inputValue = null;
let galleryLightBox = null;
let currentPage = null;
let isLoading = null;
let shouldLoad = null;

function onSearch(event) {
  event.preventDefault();

  window.scrollTo(0, 0);
  inputValue = event.currentTarget.elements.searchQuery.value.trim();
  setValues();

  fetchPhotos(inputValue, currentPage)
    .then(data => {
      if (data.hits.length === 0 || inputValue === '') {
        processNoMatchesFound();
        return
      }

      refs.gallery.innerHTML = '';
      processData(data);
    })
    .catch(processServerError)
}

function setValues() {
  currentPage = 1;
  isLoading = false;
  shouldLoad = true;
}

function processData(data) {
  loadPhotos(data);
  Notify.success(`Hooray! We found ${data.totalHits} images.`)
  galleryLightBox = new SimpleLightbox('.gallery a');
}

function loadPhotos(data) {
  const markup = creatMarkup(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function checkPosition() {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight
  const scrolled = window.scrollY
  const threshold = height - screenHeight / 4
  const position = scrolled + screenHeight

  if (position >= threshold) {
    loadMore();
  }
}

function loadMore() {
  if (isLoading || !shouldLoad) {
    return
  }
  currentPage += 1;
  fetchPhotos(inputValue, currentPage)
    .then(data => {
      isLoading = true

      loadPhotos(data);
      galleryLightBox.refresh();
      isLoading = false;
    })
    .catch(() => {
      shouldLoad = false
      Notify.info("We're sorry, but you've reached the end of search results.");
    })
}


function processNoMatchesFound() {
  refs.gallery.innerHTML = '';
  Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function processServerError() {
  Notify.warning("Sorry, an error occurred on the server. Please try again some time later.");
}
