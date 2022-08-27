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

  fetchPhotos(inputValue, page)
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
      }
      const markup = data.hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
          return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
        })
        .join('')
      refs.gallery.innerHTML = markup;
    })
    .catch(() => Notify.warning("Sorry, an error occurred on the server. Please try again some time later."))
}