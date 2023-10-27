let pageNumber = 0;
function loadBook() {
    $('#loading-place-holder').show();
    $('#load-more').hide();

    $.ajax({
        url: '/api/books?page=' + pageNumber++,
        method: 'GET',
        success: function (data) {
            $('#loading-place-holder').hide();
            $('#load-more').show();


            const bookListContainer = $('#bookList');
            data.forEach(book=>{
                //Cover of the book
                let cover = book.pages[0] || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

                //Create pages of the book
                const pages = $('<div class="visually-hidden">');
                book.pages.forEach(url=>{
                    const pageImage = `<a href=${url} data-fancybox=${book.id} data-caption=${book.name}><img src=${url} class="img-thumbnail" alt=${book.name} onerror="this.error=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'"></a>`;
                    pages.append(pageImage);
                });

                const bookDiv = $('<div class="shadow-none p-1 mb-5 bg-body-tertiary rounded" style="height: 250px; width: 200px">');
                bookDiv.append(`<a href=${cover} data-fancybox=${book.id} data-caption=${book.name}><img src=${cover} style="height: 123px; width: 200px" class="img-fluid img-thumbnail" alt=${book.name} onerror="this.error=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'"></a>`);
                const cardBody = $('<div class="pt-2 pr-2 pl-1 d-flex flex-column text-capitalize">');
                cardBody.append(`<h6>${book.name}</h6>`);
                cardBody.append(`<span class="fs-6">${book.category}</span>`);
                cardBody.append(`
                                <div class="d-flex flex-row-reverse mt-2">
                                    <a href=${book.address} type="button" class="mt-3 btn btn-sm float-right text-light" style="background-color: #AA8661">Download</a>
                                </div>
                                `);
                bookDiv.append(cardBody)
                bookListContainer.append(bookDiv);
                bookListContainer.append(pages);
            });
        },
        error: function () {
            console.error('Error in REST request');
        }
    });


}

loadBook();



Fancybox.bind()

