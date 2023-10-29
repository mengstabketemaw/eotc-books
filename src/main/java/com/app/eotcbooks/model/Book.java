package com.app.eotcbooks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Book {
    @Id
    String id;
    String address;
    String name;
    String category;
    String lang;
    List<String> pages = new ArrayList<>();
}
