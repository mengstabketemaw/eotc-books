package com.app.eotcbooks.views.catalog;

import com.app.eotcbooks.model.Book;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.theme.lumo.LumoUtility.AlignItems;
import com.vaadin.flow.theme.lumo.LumoUtility.Background;
import com.vaadin.flow.theme.lumo.LumoUtility.BorderRadius;
import com.vaadin.flow.theme.lumo.LumoUtility.Display;
import com.vaadin.flow.theme.lumo.LumoUtility.FlexDirection;
import com.vaadin.flow.theme.lumo.LumoUtility.FontSize;
import com.vaadin.flow.theme.lumo.LumoUtility.FontWeight;
import com.vaadin.flow.theme.lumo.LumoUtility.JustifyContent;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;
import com.vaadin.flow.theme.lumo.LumoUtility.Overflow;
import com.vaadin.flow.theme.lumo.LumoUtility.Padding;
import com.vaadin.flow.theme.lumo.LumoUtility.TextColor;
import com.vaadin.flow.theme.lumo.LumoUtility.Width;

import java.util.Locale;

public class CatalogViewCard extends ListItem {

    public CatalogViewCard(Book book) {
        addClassNames(Background.CONTRAST_5, Display.FLEX, FlexDirection.COLUMN, AlignItems.START, Padding.MEDIUM, Margin.MEDIUM,
                BorderRadius.LARGE);
        Div images = new Div();
        for(String src : book.getPages()){
            Anchor a = new Anchor();
            Image image = new Image();
            image.setSrc(src);
            a.add(image);
            a.setHref(src);
            a.getElement().setAttribute("data-fancybox",book.getName());
            a.getElement().setAttribute("data-caption", book.getCategory());
            images.add(a);
        }
        images.setVisible(false);

        Div div = new Div();
        div.addClassNames(Background.CONTRAST, Display.FLEX, AlignItems.CENTER, JustifyContent.CENTER,
                Margin.Bottom.MEDIUM, Overflow.HIDDEN, BorderRadius.MEDIUM, Width.FULL);
        div.setHeight("160px");



        Image image = new Image();
        image.setWidth("120px");
        image.setSrc(book.getPages().stream().findFirst().orElse("https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"));
        image.setAlt(book.getName());

        Anchor a = new Anchor();
        a.add(image);
        a.setHref(book.getPages().stream().findFirst().orElse("https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"));
        a.getElement().setAttribute("data-fancybox",book.getName());
        a.getElement().setAttribute("data-caption", book.getCategory());
        a.add(image);

        div.add(a);

        Paragraph header = new Paragraph();
        header.addClassNames(FontSize.XLARGE, FontWeight.SEMIBOLD);
        header.setText(book.getName().replaceAll("[^a-zA-Z]","").replaceAll("(?i)\\.?pdf",""));


        Paragraph subtitle = new Paragraph(book.getCategory());
        subtitle.addClassNames(FontSize.SMALL, TextColor.SECONDARY);
        subtitle.setText(book.getCategory().replaceAll("/"," "));

        Paragraph description = new Paragraph(book.getLang());
        description.addClassName(Margin.Vertical.MEDIUM);


        Anchor badge = new Anchor();
        badge.setHref(book.getAddress());
        badge.setTarget("blank");
        badge.getElement().setAttribute("theme","badge");
        badge.setText("Download");

        Div card = new Div(div, header, subtitle, description, badge);
        card.setHeight("400px");
        card.setWidth("320px");

        add(card, images);

    }
}
