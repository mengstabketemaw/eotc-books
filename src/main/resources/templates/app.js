const bookListContainer = $('#bookList');

for (let i = 0; i < 50; i++) {

    const book =
    `<div class="shadow-none p-1 mb-5 bg-body-tertiary rounded" style="height: 250px; width: 200px">
        <div class="" style="">
            <a href="Amharic.jpg" style="display:block; height:128px; overflow:hidden" data-fancybox data-caption="Single image">
                <img src="Amharic.jpg" class="img-thumbnail" alt="this is ann image" style="width: 192px">
            </a>
        </div>
        <div class="p-2 d-flex flex-column">
            <h6> Book name </h6>
            <span class="fs-6">Category</span>
            <div class="d-flex flex-row-reverse mt-2">
                <a href="" role="button" style="background-color: #AA8661" class="mt-3 btn btn-sm float-right text-light" >Download</a>
            </div>
        </div>
    </div>`;
    bookListContainer.append(book);
}

Fancybox.bind()

