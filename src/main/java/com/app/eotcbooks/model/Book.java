package com.app.eotcbooks.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.ArrayList;
import java.util.List;

@Table(value = "book")
@Data
public class Book {
    @Id
    String id;
    String address;
    String name;
    String category;
    String lang;
    @Transient
    List<String> pages = new ArrayList<>();
}
