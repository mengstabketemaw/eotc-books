const bookListContainer = $('#bookList');
for (let i = 0; i < 50; i++) {
    const bookDiv = $('<div class="border mt-2 text-bg-light mb-3" style="height: 250px; width: 200px">');
    bookDiv.append('<a href="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" data-fancybox data-caption="Single image"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" class="img-thumbnail" alt="..."></a>');
    const cardBody = $('<div class="pt-2 pr-2 pl-1 d-flex flex-column">');
    cardBody.append('<h6>' + "Booko name" + '</h6>');
    cardBody.append('<span class="fs-6">' + "Category" + '</span>');
    cardBody.append(`
    <div class="d-flex flex-row-reverse mt-2">
        <a href="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" type="button" class="btn btn-primary btn-sm float-right">download</a>
    </div>
    `);
    bookDiv.append(cardBody)
    bookListContainer.append(bookDiv);
}

Fancybox.bind()

