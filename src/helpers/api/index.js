import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(value, page = 1) {
  const searchParams = new URLSearchParams({
    key: `33064708-e869c07a3c852e671a2fdaacb`,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
    q: value,
  });

  const response = await axios.get(`?${searchParams}`);
  console.log("response", response);
  return response.data;
  
}
