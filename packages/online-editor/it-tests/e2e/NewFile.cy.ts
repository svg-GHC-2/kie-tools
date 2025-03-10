/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
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

describe("New file test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should create new empty BPMN", () => {
    // click Create new workflow button (new BPMN)
    cy.get("[data-ouia-component-id='new-bpmn-button']").click();

    // wait until loading dialog disappears
    cy.loadEditor();

    // check editor title name
    cy.get("[aria-label='Edit file name']").should("have.value", "Untitled");

    cy.getEditor().within(() => {
      // open properties panel and check values
      cy.get("[data-title='Properties']").click();
      cy.get("[name$='diagramSet.name']").should("have.value", "Untitled");
      cy.get("[name$='diagramSet.packageProperty']").should("have.value", "com.example");
      cy.get("[name$='diagramSet.id']").should("have.value", "Untitled");

      // open diagram panel and check nodes
      cy.get("[data-title='Explore Diagram']").click();
      cy.get("a.gwt-Anchor").should(($nodes) => {
        expect($nodes).length(1);
        expect($nodes.eq(0)).text("Untitled");
      });
    });
  });

  it("should create new empty DMN", () => {
    // click Create new decision model button (new DMN)
    cy.get("[data-ouia-component-id='new-dmn-button']").click();

    // wait until loading dialog disappears
    cy.loadEditor();

    // check editor title name
    cy.get("[aria-label='Edit file name']").should("have.value", "Untitled");

    cy.getEditor().within(() => {
      // open Decision navigator and check nodes
      cy.get("[data-title='Decision Navigator']").click();
      cy.get("li[data-i18n-prefix='DecisionNavigatorTreeView.']").should(($nodes) => {
        expect($nodes).length(1);
        expect($nodes.eq(0)).attr("title", "Untitled");
      });

      // open properties panel, check values and close panel
      cy.get("[data-title='Properties']").click();
      cy.get("[name$='definitions.nameHolder']").should("have.value", "Untitled");
      cy.get("[data-title='Properties']").click();

      // open Data Types tab and check there is no item
      cy.get("[data-ouia-component-id='Data Types'] a").click();
      cy.get("[data-i18n-key='NoCustomDataTitle']").should("be.visible");
    });
  });

  it("should create new empty PMML", () => {
    // click Create new Scorecard button (new PMML)
    cy.get("[data-ouia-component-id='new-pmml-button']").click();

    // load pmml editor
    cy.getEditor().within(() => {
      cy.get("[data-testid='editor-page']", { timeout: 60000 }).should("be.visible");
    });

    // check editor title name
    cy.get("[aria-label='Edit file name']").should("have.value", "Untitled");

    cy.getEditor().within(() => {
      // check no characteristics are defined
      cy.get("[data-ouia-component-id='no-characteristics-defined-title']").should("be.visible");

      // open and close PMML DataDictionary modal
      cy.get("[data-title='DataDictionary']").click();
      cy.get("[data-ouia-component-id='no-data-fields-title']").should("be.visible");
      cy.get("[data-title='DataDictionaryModalClose']").click();

      // open and close PMML MiningSchema modal
      cy.get("[data-title='MiningSchema']").click();
      cy.get("[data-ouia-component-id='mining-schema-no-data-fields-title']").should("be.visible");
      cy.get("[data-title='MiningSchemaModalClose']").click();

      // open and close PMML Outputs modal
      cy.get("[data-title='Outputs']").click();
      cy.get("[data-ouia-component-id='outputs-overview']").scrollTo("center");
      cy.get("[data-ouia-component-id='no-outputs-title']").should("be.visible");
      cy.get("[data-title='OutputsModalClose']").click();
    });
  });
});
