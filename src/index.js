import './css/styles.css';
import { fetchPhotos } from './fetchPhotos.js';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  form: document.querySelector("#search-form"),
  queryInput: document.querySelector("[name='searchQuery']"),
  gallery: document.querySelector("div.gallery"),
  loadMoreButton: document.querySelector("button.load-more"),
}

refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.searchQuery.value.trim();

  fetchPhotos(inputValue)
    .then(data => {
      if (data.hits.length === 0 || inputValue === '') {
        processNoMatchesFound();
        return
      }
      processData(data);
    })
    .catch(processServerError)
}

function processData(data) {
  loadPhotos(data);
  Notify.success(`Hooray! We found ${data.totalHits} images.`)
  const galleryLightBox = new SimpleLightbox('.gallery a');
}

function loadPhotos(data) {
  const markup = creatMarkup(data);
  refs.gallery.innerHTML = markup;
}

function creatMarkup({ hits }) {
  return hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a href="${largeImageURL}">
          <div class="image-container">
  <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </div>
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`
    })
    .join('')
}

function processNoMatchesFound() {
  refs.gallery.innerHTML = '';
  Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function processServerError() {
  Notify.warning("Sorry, an error occurred on the server. Please try again some time later.");
}
