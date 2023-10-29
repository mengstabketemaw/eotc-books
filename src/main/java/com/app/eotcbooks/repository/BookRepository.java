package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, String> {
}
