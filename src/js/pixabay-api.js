const API_KEY = "48505401-41d9a45057075903c793c7a55"; 
const BASE_URL = "https://pixabay.com/api/";

export function fetchImages(query) {
  
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json(); 
    })
    .then((data) => {
      if (data.hits.length === 0) {
        throw new Error("No images found"); 
      }
      return data.hits; 
    });
}
