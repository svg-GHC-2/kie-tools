/*
 * Copyright 2022 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.dashbuilder.client.perspective;

import javax.enterprise.context.ApplicationScoped;

import org.dashbuilder.client.screens.ContentErrorScreen;
import org.uberfire.client.annotations.Perspective;
import org.uberfire.client.annotations.WorkbenchPerspective;
import org.uberfire.client.workbench.panels.impl.LayoutPanelPresenter;
import org.uberfire.mvp.PlaceRequest;
import org.uberfire.mvp.impl.DefaultPlaceRequest;
import org.uberfire.workbench.model.PerspectiveDefinition;
import org.uberfire.workbench.model.impl.PartDefinitionImpl;
import org.uberfire.workbench.model.impl.PerspectiveDefinitionImpl;

@ApplicationScoped
@WorkbenchPerspective(identifier = ContentErrorPerspective.ID)
public class ContentErrorPerspective {

    public static final String ID = "ContentErrorPerspective";

    @Perspective
    public PerspectiveDefinition buildPerspective() {
        PerspectiveDefinition perspective = new PerspectiveDefinitionImpl(LayoutPanelPresenter.class.getName());
        final PlaceRequest place = new DefaultPlaceRequest(ContentErrorScreen.ID);
        PartDefinitionImpl dashboardScreen = new PartDefinitionImpl(place);
        perspective.getRoot().addPart(dashboardScreen);
        perspective.setName("Content Error");
        return perspective;
    }

}
