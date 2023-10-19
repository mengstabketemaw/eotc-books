package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Image;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;

import java.util.stream.Stream;

public interface ImageRepository extends CassandraRepository<Image, String> {
    Stream<Image> findByBook(String book);

}
