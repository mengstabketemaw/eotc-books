package com.app.eotcbooks.service;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.model.Comment;
import com.app.eotcbooks.repository.BookRepository;
import com.app.eotcbooks.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;

    public Page<Book> getBooks(Pageable pageable){
        return bookRepository.findAll(pageable);
    }

    public List<Book> searchBook(String key){
        return bookRepository.search(key,key);
    }

    public void saveComment(Comment comment){
        commentRepository.save(comment);
    }

}

