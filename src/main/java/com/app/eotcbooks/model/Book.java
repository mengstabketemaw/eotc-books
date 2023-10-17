package com.app.eotcbooks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

@Table(value = "book")
public class Book {
    @Id
    String id;
    String address;
    String name;
    String category;
    String lang;
}
