package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Book;
import org.springframework.data.cassandra.repository.CassandraRepository;


public interface BookRepository extends CassandraRepository<Book, String> {
}
