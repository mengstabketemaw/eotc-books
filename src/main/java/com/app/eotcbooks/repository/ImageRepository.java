package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Image;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface ImageRepository extends CassandraRepository<Image, String> {
}
