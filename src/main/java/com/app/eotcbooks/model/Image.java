package com.app.eotcbooks.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

@Table(value = "image")
@Data
public class Image {
    @Id
    String resource_id;
    @Column("book_id")
    String book;
}
