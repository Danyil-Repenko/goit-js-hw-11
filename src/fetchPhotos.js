const rootUrl = "https://pixabay.com/api/";

export async function fetchPhotos(name) {
    const peremeters = new URLSearchParams({
        key: '29417060-6945200ead3992d525ee3c3b8',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: 1,
    });
    const response = await fetch(`${rootUrl}?${peremeters}`);
    return await response.json();
}