package com.app.eotcbooks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

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

    public String getName() {
        return name.replace("..>","").replace(".pdf","");
    }

    public List<String> getPages() {
        String category = this.category.replace("/", "_");
        String name = this.name.replace(".pdf","_");
        String lang = this.lang;
        String imageName = (category + name + lang).replace(" ","_")+"_page_";

        return IntStream
                .range(1,11)
                .mapToObj(i->"https://res.cloudinary.com/dite3j4b1/image/upload/v1698311142/" + imageName + i+".jpg")
                .toList();
    }
}
