package com.app.eotcbooks.views.catalog;

import com.app.eotcbooks.service.BookService;
import com.app.eotcbooks.views.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.theme.lumo.LumoUtility;

import java.util.List;
import java.util.stream.Collectors;

@PageTitle("Catalog")
@Route(value = "catalog", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
@JavaScript("fancybox.umd.js")
@CssImport("fancybox.css")
public class CatalogView extends Composite<VerticalLayout> {
    private final BookService bookService;
    private HorizontalLayout booksList = new HorizontalLayout();
    public CatalogView(BookService bookService) {
        this.bookService = bookService;

        VerticalLayout verticalLayout = new VerticalLayout();

        booksList.add(getBooks(0));
        booksList.addClassNames(LumoUtility.Padding.MEDIUM);
        booksList.setHeightFull();
        booksList.setWidthFull();

        verticalLayout.add(booksList);
        getContent().setHeightFull();
        getContent().setWidthFull();
        TextField search = new TextField();
        Button button = new Button("Get more");
        booksList.addClassNames(LumoUtility.FlexWrap.WRAP);

        getContent().add(new VerticalLayout(search, booksList, button));
        UI.getCurrent().getPage().executeJs("Fancybox.bind(\"[data-fancybox]\")");
    }

    private List<Component> getBooks(int page) {
        return bookService.getBooks(page, 20)
                .stream()
                .map(CatalogViewCard::new)
                .collect(Collectors.toList());
    }


}
