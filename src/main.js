import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".card-list");
const loader = document.createElement("div");
loader.className = "loader";
document.body.appendChild(loader);


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim(); 

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
    });
    return;
  }

  clearGallery(); 
  loader.style.display = "block";

  fetchImages(query)
    .then((images) => {
      if (images.length === 0) {
        iziToast.error({
          title: "Error",
          message: "Sorry, no images found! Please try again.",
        });
        return;
      }
      renderGallery(images, gallery);
    })
    .catch(() => {
      iziToast.error({
        title: "Error",
        message: "An error occurred while fetching images. Please try again!",
      });
    })
    .finally(() => {
      loader.style.display = "none"; 
    });
});




