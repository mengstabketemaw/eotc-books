package com.app.eotcbooks.service;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.repository.BookRepository;
import com.app.eotcbooks.repository.ImageRepository;
import com.app.eotcbooks.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {
    private final ResourceRepository resourceRepository;
    private final BookRepository bookRepository;

    public Slice<Book> getBooks(Pageable pageable){
        return bookRepository.findAll(pageable);
    }

    public byte[] getImageAsResource(String id){
        Optional<com.app.eotcbooks.model.Resource> image = resourceRepository.findById(id);
        return image.orElseThrow().getFile();
    }
}
