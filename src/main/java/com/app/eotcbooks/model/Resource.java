package com.app.eotcbooks.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Table;

@Table(value = "resource")
@Data
public class Resource {
    @Id
    String id;
    @CassandraType(type = CassandraType.Name.BLOB)
    byte[] file;
}
