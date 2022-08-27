export function fetchPhotos(name, page) {
    const rootUrl = "https://pixabay.com/api/";
    const peremeters = new URLSearchParams({
        key: '29417060-6945200ead3992d525ee3c3b8',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page
    });
    return fetch(`${rootUrl}?${peremeters}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}