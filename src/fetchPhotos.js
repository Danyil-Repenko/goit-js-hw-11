const axios = require('axios').default;
const rootUrl = "https://pixabay.com/api/";

export async function fetchPhotos(name, page) {
    const params = {
        key: '29417060-6945200ead3992d525ee3c3b8',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page,
    };
    const response = await axios.get(rootUrl, { params });
    return response.data;
}