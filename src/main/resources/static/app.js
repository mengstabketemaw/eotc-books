let pageNumber = 0;
function loadBook() {

    $.LoadingOverlay("show");

    $('#load-more').hide();

    $.ajax({
        url: `/api/books?page=${pageNumber++}&size=50`,
        method: 'GET',
        success: function (data) {
            $.LoadingOverlay("hide");
            $('#load-more').show();


            const bookListContainer = $('#bookList');
            data.content.forEach(book=>{
                //Cover of the book
                let cover = book.pages[0] || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

                //Create pages of the book
                const pages = $('#book-galleries');

                book.pages.shift();//Remove the first cover

                book.pages.forEach(url=>{
                    const pageImage = `<a href=${url} data-fancybox=${book.id} data-caption=${book.name}><img src=${url} loading="lazy" alt=${book.name} onerror="this.error=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'"></a>`;
                    pages.append(pageImage);
                });


                const bookCard =
                `<div class="col book-card shadow-none p-1 m-2 bg-body-tertiary rounded" style="width: auto">
                    <div class="" style="">
                        <a  href=${cover} data-fancybox=${book.id} data-caption=${book.name} style="display:block; height:128px; overflow:hidden">
                            <img src=${cover} class="img-thumbnail lazy" loading="lazy" alt=${book.name}>
                        </a>
                    </div>
                    <div class="p-2 d-flex flex-column text-capitalize text-nowrap ">
                        <h6 class="overflow-hidden">${book.name} </h6>
                        <span class="fs-6 overflow-hidden">${book.category}</span>
                        <div class="d-flex flex-row-reverse mt-2">
                            <a href=${book.address} role="button" target="_blank" style="background-color: #AA8661" class="mt-3 btn btn-sm float-right text-light" >Download</a>
                        </div>
                    </div>
                </div>`;
                bookListContainer.append(bookCard);
                bookListContainer.append(pages);
            });
        },
        error: function () {
            console.error('Error in REST request');
        }
    });


}

function search_books(key) {

    $.LoadingOverlay("show");
    $('#load-more').hide();
    $('#bookList').addClass('visually-hidden');
    $('#book-not-found').addClass('visually-hidden');
    $('#searchResult').empty();

    $.ajax({
        url: `/api/search?key=${key}`,
        method: 'GET',
        success: function (data) {
            $.LoadingOverlay("hide");
            const bookListContainer = $('#searchResult');
            if(!data.length){
                $('#book-not-found').removeClass('visually-hidden');
                return;
            }
            data.forEach(book=>{
                //Cover of the book
                let cover = book.pages[0] || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

                //Create pages of the book
                const pages = $('<div class="visually-hidden">');
                book.pages.forEach(url=>{
                    const pageImage = `<a href=${url} data-fancybox=${book.id} data-caption=${book.name}><img src=${url} loading="lazy" alt=${book.name} onerror="this.error=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'"></a>`;
                    pages.append(pageImage);
                });

                const bookCard =
                    `<div class="shadow-none p-1 m-2 bg-body-tertiary rounded" style="height: 250px; width: 200px">
                        <div class="" style="">
                            <a  href=${cover} data-fancybox=${book.id} data-caption=${book.name} style="display:block; height:128px; overflow:hidden">
                                <img src=${cover} class="img-thumbnail lazy" loading="lazy" alt=${book.name} style="width: 192px">
                            </a>
                        </div>
                        <div class="p-2 d-flex flex-column text-capitalize text-nowrap ">
                            <h6 class="overflow-hidden">${book.name} </h6>
                            <span class="fs-6 overflow-hidden">${book.category}</span>
                            <div class="d-flex flex-row-reverse mt-2">
                                <a href=${book.address} role="button" target="_blank" style="background-color: #AA8661" class="mt-3 btn btn-sm float-right text-light" >Download</a>
                            </div>
                        </div>
                    </div>`;
                bookListContainer.append(bookCard);
                bookListContainer.append(pages);
            });
        },
        error: function () {
            console.error('Error in REST request');
        }
    });


}

function onSearch(){
    let searchKey = $("#search-input").val().trim();
    if(searchKey === ""){
        $('#load-more').show();
        $('#bookList').removeClass('visually-hidden');
        $('#searchResult').addClass('visually-hidden');
        $('#book-not-found').addClass('visually-hidden');
        $('#searchResult').empty();
    } else
        search_books(searchKey);
}

function showToaster(message,color){
    $.toast({
        text:message,
        bgColor:color
    });

}
$(document).ready( function (){

    $("#search-button").on("click",onSearch);
    $("#search-input").on("keyup",function (event){
       if(event.key === "Enter")
           onSearch();
    });

    $("#form-send").on("click", function (){
        let name = $("#form-name").val();
        let email = $("#form-email").val();
        let user_comment = $("#form-comment").val();

        if(!email || !user_comment){
            showToaster("please provide both email and comment", "red");
            return;
        }
        $.ajax("/api/comment", {
            method: "POST",
            contentType:'application/json',
            data:JSON.stringify({name,email,user_comment}),
            success:function (){
                $("#form-name").val("");
                $("#form-email").val("");
                $("#form-comment").val("");
                showToaster("Message sent successfully","green");
            },
            error:function (){
                showToaster("Something went wrong","error");
            }
        });
    });

    loadBook();

    Fancybox.bind();

} )
