package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Resource;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface ResourceRepository extends CassandraRepository<Resource, String> {
    
}
