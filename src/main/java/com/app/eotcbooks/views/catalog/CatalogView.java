package com.app.eotcbooks.views.catalog;

import com.app.eotcbooks.views.MainLayout;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Catalog")
@Route(value = "catalog", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
public class CatalogView extends Composite<VerticalLayout> {

    public CatalogView() {
        getContent().setHeightFull();
        getContent().setWidthFull();
    }
}
