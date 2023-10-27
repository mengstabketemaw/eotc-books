package com.app.eotcbooks.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

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
