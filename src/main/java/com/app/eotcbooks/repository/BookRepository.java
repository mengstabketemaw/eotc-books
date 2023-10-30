package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BookRepository extends JpaRepository<Book, String> {
    @Query("""
            select e from EOTC_BOOKS e
            where upper(e.name) like upper(concat('%', ?1, '%')) or upper(e.category) like upper(concat('%', ?2, '%'))""")
    List<Book> search(String name, String category);

}
