package com.app.eotcbooks.views.catalog;

import com.app.eotcbooks.model.Book;
import com.app.eotcbooks.views.MainLayout;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.virtuallist.VirtualList;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@PageTitle("Catalog")
@Route(value = "catalog", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
public class CatalogView extends Composite<VerticalLayout> {

    public CatalogView() {
        getContent().setHeightFull();
        getContent().setWidthFull();
        VirtualList<Book> list = new VirtualList<>();
        List<Book> books = IntStream.range(0, 50)
                .mapToObj(i -> new Book())
                .collect(Collectors.toList());
        list.setItems(books);
        list.setHeightFull();
        list.setWidthFull();
        list.setRenderer(new ComponentRenderer<>(book -> new CatalogViewCard("Text", "url")));
        DataProvider<Book,?> dataProvider = DataProvider.fromCallbacks(t-> Stream.of(new Book(), new Book(), new Book()), c->3);
        list.setDataProvider(dataProvider);
        getContent().add(
                list
        );
    }

}
