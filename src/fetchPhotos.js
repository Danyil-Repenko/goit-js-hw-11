export function fetchPhotos(name) {
    const rootUrl = "https://pixabay.com/api/";
    // const peremeters = {
    //     key: '29417060 - 6945200ead3992d525ee3c3b8',
    //     q: name,
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: true,
    // };
    return fetch(`${rootUrl}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}