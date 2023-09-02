describe("Student Form Component", () => {
  beforeEach(() => {
    cy.visit("/create-form/student");
  });

  it('should display the "Go back" button', () => {
    cy.get('[data-testid="go-back-button"]').should("exist");
  });

  it("should fill and submit the student form", () => {
    fillStudentForm();
    cy.get('[data-testid="submit-btn"]').click();
  });

  it("should display success message and redirect after form submission", () => {
    cy.intercept("POST", "/api/record", {
      statusCode: 200,
      body: { success: true },
    }).as("formSubmission");

    fillStudentForm();
    cy.get('[data-testid="submit-btn"]').click();
    cy.wait("@formSubmission");

    cy.url().should("include", "/student");
  });

  it("should show error when form is submitted with empty fields", () => {
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="errors"]').should("exist");
    cy.get('[data-testid="errors"]').should(
      "contain",
      "This field is required"
    );
    cy.get(".input-invalid").should("exist");
  });
});

function fillStudentForm() {
  cy.get('input[name="nationalIdNumber"]').type("1234567890");
  cy.get('input[name="name"]').type("John");
  cy.get('input[name="surname"]').type("Doe");
  cy.get('input[name="dob"]').type("1990-01-01");
  cy.get('input[name="studentNumber"]').type("S1234");
}
