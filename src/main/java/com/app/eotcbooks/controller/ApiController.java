package com.app.eotcbooks.controller;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private final BookService bookService;

    @GetMapping("/books")
    public List<Book> getBooks(@RequestParam int page){
        return bookService.getBooks(page, 10);
    }

    @GetMapping(value = "/cover/{id}", produces = "image/png")
    public byte[] getImage(@PathVariable String id) {
        return bookService.getImageAsResource(id);
    }
}
