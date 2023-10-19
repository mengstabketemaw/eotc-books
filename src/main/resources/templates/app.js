const bookListContainer = $('#bookList');
for (let i = 0; i < 50; i++) {
    const bookDiv = $('<div class="shadow-none p-1 mb-5 bg-body-tertiary rounded" style="height: 250px; width: 200px">');
    bookDiv.append('<a href="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" data-fancybox data-caption="Single image"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" class="img-thumbnail" alt="..."></a>');
    const cardBody = $('<div class="p-2 d-flex flex-column">');
    cardBody.append('<h6>' + "Booko name" + '</h6>');
    cardBody.append('<span class="fs-6">' + "Category" + '</span>');
    cardBody.append(`
    <div class="d-flex flex-row-reverse mt-2">
        <a href="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" role="button" style="background-color: #AA8661" class="mt-3 btn btn-sm float-right text-light">Download</a>
    </div>
    `);
    bookDiv.append(cardBody)
    bookListContainer.append(bookDiv);
}

Fancybox.bind()

