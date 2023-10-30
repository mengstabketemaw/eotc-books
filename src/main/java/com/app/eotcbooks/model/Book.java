package com.app.eotcbooks.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

@Entity(name = "EOTC_BOOKS")
@Data
public class Book {
    @Id
    String id;
    String address;
    String name;
    String category;
    String lang;
    String pages;

    public String getName() {
        return name.replace("..>","").replace(".pdf","");
    }

    public List<String> getPages(){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return Arrays
                    .stream(mapper.readValue(pages,String[].class))
                    .map(i->"https://res.cloudinary.com/dite3j4b1/image/upload/v1698311142/" + i)
                    .toList();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
