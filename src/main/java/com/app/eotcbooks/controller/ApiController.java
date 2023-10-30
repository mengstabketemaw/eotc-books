package com.app.eotcbooks.controller;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private final BookService bookService;


    @GetMapping("/books")
    public Page<Book> getBooks(Pageable page){
        return bookService.getBooks(page);
    }

    @GetMapping("/search")
    public List<Book> search(@RequestParam String key){
        return bookService.searchBook(key);
    }
}
