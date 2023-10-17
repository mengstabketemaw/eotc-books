package com.app.eotcbooks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

@Table(value = "image")
public class Image {
    @Id
    String book_id;
    String resource_id;
}
