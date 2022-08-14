import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);
const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `    
        <div class="gallery__item">
            <a class="gallery__link" href="large-image.jpg">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>
    `;
    })
    .join("");
}

function onGalleryContainerClick(a) {
  a.preventDefault();

  if (!a.target.classList.contains("gallery__image")) {
    return;
  }
}

galleryContainer.addEventListener("click", openModal);

function openModal(a) {
  if (!a.target.classList.contains("gallery__image")) {
    return;
  } else {
    const instance = basicLightbox.create(
      `<img src="${a.target.dataset.source}" width="800" height="600">`,
      {
        onShow: () => {
          window.addEventListener("keydown", clickEscPress);
        },
        onClose: () => {
          window.removeEventListener("keydown", clickEscPress);
        },
      }
    );
    instance.show();

    function clickEscPress(a) {
      if (a.code === "Escape") {
        instance.close();
      }
    }
  }
}
