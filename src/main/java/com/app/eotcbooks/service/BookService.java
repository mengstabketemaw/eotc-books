package com.app.eotcbooks.service;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.repository.BookRepository;
import com.app.eotcbooks.repository.ImageRepository;
import com.app.eotcbooks.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {
    private final ResourceRepository resourceRepository;
    private final BookRepository bookRepository;
    private final ImageRepository imageRepository;
    public List<Book> getBooks(int page, int pageSize){
        CassandraPageRequest pageable = CassandraPageRequest.of(0, (page+1) * pageSize);
        Slice<Book> all = bookRepository.findAll(pageable);
        return all.stream()
                .skip((long) (page) * pageSize)
                .toList();
    }

    public byte[] getImageAsResource(String id){
        Optional<com.app.eotcbooks.model.Resource> image = resourceRepository.findById(id);
        return image.orElseThrow().getFile();
    }
}

