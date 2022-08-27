import './css/styles.css';
import { fetchPhotos } from './fetchPhotos.js';
import { Notify } from 'notiflix';

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
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
      }
      const markup = data.hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
          return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      refs.gallery.innerHTML = markup;
    })
    .catch(() => Notify.warning("Sorry, an error occurred on the server. Please try again some time later."))
}