import './css/styles.css';
import { fetchPhotos } from './fetchPhotos.js';
import { Notify } from 'notiflix';

const refs = {
    form: document.querySelector("#search-form"),
    queryInput: document.querySelector("[name='searchQuery']"),
    gallery: document.querySelector(".gallery"),
}


refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();

    const inputValue = event.currentTarget.elements.searchQuery.value;

    fetchPhotos(inputValue)
        .then(data => console.log)
        .catch(error => console.log)
}