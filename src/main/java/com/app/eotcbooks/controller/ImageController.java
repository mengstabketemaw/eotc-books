package com.app.eotcbooks.controller;

import com.app.eotcbooks.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
public class ImageController {
    private final BookService bookService;

    @GetMapping(value = "/cover/{id}", produces = "image/png")
    public byte[] getImage(@PathVariable String id) {
        return bookService.getImageAsResource(id);
    }
}
