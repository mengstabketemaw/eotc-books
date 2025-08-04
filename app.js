const galleryContainer = document.getElementById('gallery-container');
const modal = document.getElementById('modal');
const modalImageContainer = document.getElementById('modal-image-container');
let modalImage = document.getElementById('modal-image');
const modalThumbnails = document.getElementById('modal-thumbnails');
const closeModal = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const downloadButton = document.getElementById('download-button');
const searchInput = document.getElementById('search-input');
const modalBookName = document.getElementById('modal-book-name');

let books = [];
let filteredBooks = [];
let currentBookIndex = 0;
let currentModalBookIndex = 0;
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
    currentModalBookIndex = bookIndex;
    const book = books[bookIndex];
    const pages = JSON.parse(book.pages);
    if (pages && pages.length > 0) {
        currentImageIndex = imageIndex;
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        modalBookName.textContent = book.name; // Set book name
        updatePageContent();
        updateButtonStates();
    }
}

function updateButtonStates() {
    const book = books[currentModalBookIndex];
    const pages = JSON.parse(book.pages);
    nextButton.style.display = currentImageIndex >= pages.length - 1 ? 'none' : 'block';
    prevButton.style.display = currentImageIndex <= 0 ? 'none' : 'block';
}

function updatePageContent() {
    const book = books[currentModalBookIndex];
    const pages = JSON.parse(book.pages);
    modalImage.classList.add('fade-out');
    setTimeout(() => {
        modalImage.src = imagePrefix + pages[currentImageIndex];
        modalImage.classList.remove('fade-out');
        modalImage.classList.add('fade-in');
    }, 300);
    downloadButton.href = book.address;
    modalBookName.textContent = book.name; // Update book name on page change
    renderThumbnails(pages);
    updateButtonStates();
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
    const activeThumbnail = modalThumbnails.querySelector('.active');
    if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function showNextImage() {
    const book = books[currentModalBookIndex];
    const pages = JSON.parse(book.pages);
    if (currentImageIndex < pages.length - 1) {
        currentImageIndex++;
        updatePageContent();
    }
}

function showPrevImage() {
    const book = books[currentModalBookIndex];
    const pages = JSON.parse(book.pages);
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updatePageContent();
    }
}


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

const aboutLink = document.getElementById('about-link');
const aboutModal = document.getElementById('about-modal');
const closeAboutModal = document.querySelector('.close-about');

aboutLink.addEventListener('click', () => {
    aboutModal.style.display = 'block';
    document.body.classList.add('modal-open');
});

aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

closeAboutModal.addEventListener('click', () => {
    aboutModal.style.display = 'none';
    document.body.classList.remove('modal-open');
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
});

prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        loadMoreBooks();
    }
});

fetchBooks();