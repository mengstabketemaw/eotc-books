package com.app.eotcbooks.service;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;


    public Page<Book> getBooks(Pageable pageable){
        return bookRepository.findAll(pageable);
    }

}

