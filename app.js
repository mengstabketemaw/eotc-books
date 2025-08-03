const galleryContainer = document.getElementById('gallery-container');
const modal = document.getElementById('modal');
const modalImageContainer = document.getElementById('modal-image-container');
const modalImage = document.getElementById('modal-image');
const modalThumbnails = document.getElementById('modal-thumbnails');
const closeModal = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const downloadButton = document.getElementById('download-button');
const searchInput = document.getElementById('search-input');

let books = [];
let filteredBooks = [];
let currentBookIndex = 0;
let currentImageIndex = 0;
let isLoading = false;
const booksPerScroll = 20;
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
let touchStartTime;
let touchEndTime;

const imagePrefix = 'https://res.cloudinary.com/dite3j4b1/image/upload/v1698311142/';

async function fetchBooks() {
    try {
        const response = await fetch('eotc-data.json');
        const data = await response.json();
        books = Object.values(data.Books);
        filteredBooks = books;
        loadMoreBooks();
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function loadMoreBooks() {
    if (isLoading) return;
    isLoading = true;
    const booksToLoad = filteredBooks.slice(currentBookIndex, currentBookIndex + booksPerScroll);
    renderBooks(booksToLoad);
    currentBookIndex += booksPerScroll;
    isLoading = false;
}

function renderBooks(booksToRender) {
    booksToRender.forEach((book, index) => {
        if (book.pages && book.pages.length > 0) {
            const pages = JSON.parse(book.pages);
            if (pages.length > 0) {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const placeholder = document.createElement('div');
                placeholder.classList.add('placeholder');
                placeholder.textContent = 'Loading...';
                galleryItem.appendChild(placeholder);

                const img = new Image();
                img.src = imagePrefix + pages[0];
                img.alt = book.name;
                img.style.display = 'none';

                img.onload = () => {
                    galleryItem.replaceChild(img, placeholder);
                    img.style.display = 'block';
                    const rowHeight = 10;
                    const rowGap = 10;
                    const rowSpan = Math.ceil((img.height + rowGap)/(rowHeight+rowGap));
                    galleryItem.style.gridRowEnd = `span ${rowSpan}`;
                };

                galleryItem.addEventListener('click', () => openModal(books.indexOf(book), 0));
                galleryContainer.appendChild(galleryItem);
            }
        }
    });
}

function openModal(bookIndex, imageIndex) {
    currentBookIndex = bookIndex;
    const book = books[bookIndex];
    const pages = JSON.parse(book.pages);
    if (pages && pages.length > 0) {
        currentImageIndex = imageIndex;
        modal.style.display = 'block';
        updatePageContent();
    }
}

function updatePageContent() {
    const book = books[currentBookIndex];
    const pages = JSON.parse(book.pages);
    modalImage.src = imagePrefix + pages[currentImageIndex];
    downloadButton.href = book.address;
    renderThumbnails(pages);
}

function renderThumbnails(pages) {
    modalThumbnails.innerHTML = '';
    pages.forEach((page, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imagePrefix + page;
        thumbnail.classList.add('thumbnail');
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updatePageContent();
        });
        modalThumbnails.appendChild(thumbnail);
    });
}

function showNextImage() {
    const book = books[currentBookIndex];
    const pages = JSON.parse(book.pages);
    if (pages && pages.length > 0) {
        const newImage = new Image();
        newImage.src = imagePrefix + pages[(currentImageIndex + 1) % pages.length];
        newImage.classList.add('modal-content');
        newImage.style.transform = 'translateX(150%)';

        modalImageContainer.appendChild(newImage);

        setTimeout(() => {
            modalImage.classList.add('slide-out-left');
            newImage.classList.add('slide-in');
        }, 50);

        setTimeout(() => {
            modalImage.remove();
            modalImage = newImage;
            currentImageIndex = (currentImageIndex + 1) % pages.length;
            updatePageContent();
        }, 350);
    }
}

function showPrevImage() {
    const book = books[currentBookIndex];
    const pages = JSON.parse(book.pages);
    if (pages && pages.length > 0) {
        const newImage = new Image();
        newImage.src = imagePrefix + pages[(currentImageIndex - 1 + pages.length) % pages.length];
        newImage.classList.add('modal-content');
        newImage.style.transform = 'translateX(-150%)';

        modalImageContainer.insertBefore(newImage, modalImage);

        setTimeout(() => {
            modalImage.classList.add('slide-out-right');
            newImage.classList.add('slide-in');
        }, 50);

        setTimeout(() => {
            modalImage.remove();
            modalImage = newImage;
            currentImageIndex = (currentImageIndex - 1 + pages.length) % pages.length;
            updatePageContent();
        }, 350);
    }
}

function handleSwipe() {
    const swipeThreshold = 50;
    const verticalThreshold = 75;
    const horizontalDistance = Math.abs(touchendX - touchstartX);
    const verticalDistance = Math.abs(touchendY - touchstartY);
    const elapsedTime = touchEndTime - touchStartTime;

    if (elapsedTime < 500 && horizontalDistance > swipeThreshold && horizontalDistance > verticalDistance) {
        if (touchendX < touchstartX) {
            showNextImage();
        }
        if (touchendX > touchstartX) {
            showPrevImage();
        }
    }
}

modalImageContainer.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
        touchStartTime = new Date().getTime();
    }
});

modalImageContainer.addEventListener('touchend', e => {
    if (e.touches.length === 0) { // No more fingers on the screen
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        touchEndTime = new Date().getTime();
        handleSwipe();
    }
});

function filterBooks(searchTerm) {
    galleryContainer.innerHTML = '';
    currentBookIndex = 0;
    if (searchTerm.length >= 3) {
        filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
        filteredBooks = books;
    }
    loadMoreBooks();
}

searchInput.addEventListener('input', (e) => {
    filterBooks(e.target.value);
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        loadMoreBooks();
    }
});

fetchBooks();
