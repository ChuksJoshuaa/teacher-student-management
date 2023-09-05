import React from "react";
// import { mount } from "@cypress/react";
import { mount } from "cypress/react18";
import { Form } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("Form Component", () => {
  it("renders the form", () => {
    mount(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    cy.get("#form__container").should("be.visible");
  });

  it("should fill and submit the teacher form", () => {
    mount(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    fillTeacherForm();
    cy.get('[data-testid="submit-btn"]').click();
  });

  it("should display success message and redirect after form submission", () => {
    mount(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    cy.intercept("POST", "/api/record", {
      statusCode: 200,
      body: { success: true },
    }).as("formSubmission");

    fillTeacherForm();
    cy.get('[data-testid="submit-btn"]').click();
    cy.wait("@formSubmission");

    cy.url().should("include", "/teacher");
  });

  it("should show error when form is submitted with empty fields", () => {
    mount(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="errors"]').should("exist");
    cy.get('[data-testid="errors"]').should(
      "contain",
      "This field is required"
    );
    cy.get(".input-invalid").should("exist");
  });
});

function fillTeacherForm() {
  cy.get('input[name="nationalIdNumber"]').type("1234567890");
  cy.get('input[name="name"]').type("John");
  cy.get('input[name="surname"]').type("Doe");
  cy.get('input[name="dob"]').type("1990-01-01");
  cy.get('select[name="title"]').select("mr");
  cy.get("select").select(0).should("have.value", "");
  cy.get("select").select(0).should("contain", "Select Title");
  cy.get("select")
    .should("be.visible")
    .then(() => {
      cy.get("select").select("Mr").should("have.value", "mr");
    });
  cy.get("select").select("Mr").should("have.value", "mr");
  cy.get('input[name="teacherNumber"]').type("T1234");
  cy.get('input[name="salary"]').type("50000");
}
