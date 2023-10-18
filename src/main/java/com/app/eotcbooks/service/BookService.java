package com.app.eotcbooks.service;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.model.Image;
import com.app.eotcbooks.repository.BookRepository;
import com.app.eotcbooks.repository.ImageRepository;
import com.app.eotcbooks.repository.ResourceRepository;
import com.vaadin.flow.internal.BeanUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.core.io.Resource;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class BookService {
    private final ResourceRepository resourceRepository;
    private final BookRepository bookRepository;
    private final ImageRepository imageRepository;
    public int prevCount = 100;
    public List<Book> getBooks(int page, int pageSize){
        CassandraPageRequest pageable = CassandraPageRequest.of(0, (page+1) * pageSize);
        Slice<Book> all = bookRepository.findAll(pageable);
        return all.stream()
                .skip((long) (page) * pageSize)
                .map(book->{
                    List<String> pages = imageRepository.findByBook(book.getId())
                            .map(image -> "/resources/cover/" + image.getResource_id())
                            .toList();
                    Book b = new Book();
                    BeanUtils.copyProperties(book, b);
                    b.setPages(pages);
                    return b;
                })
                .toList();
    }

    public byte[] getImageAsResource(String id){
        Optional<com.app.eotcbooks.model.Resource> image = resourceRepository.findById(id);
        return image.orElseThrow().getFile();
    }
}

/*
Pageable pageable = CassandraPageRequest.of(PageRequest.of(0, testRequest.getPageSize(),
                Sort.by(Sort.Direction.DESC, SORT_FIELD)), DEFAULT_CURSOR_MARK.equalsIgnoreCase(testRequest
                .getCursorMark()) ? null : PagingState.fromString(testRequest.getCursorMark()));

* */