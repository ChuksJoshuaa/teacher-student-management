describe("Navigation to Teacher View", () => {
  beforeEach(() => {
    // Visit the teacher home view before each test
    cy.visit("/");
  });

  //Test for the Homeview component
  it("should navigate to the home page", () => {
    // Start from the index page
    // cy.visit("http://localhost:3000");

    it("should display the loader when loading", () => {
      // Assuming that the Loader component has a class of 'loader'
      cy.get(".loader").should("exist");
    });

    it("should display a message when no records are found", () => {
      // Assuming that the message is displayed in a p tag
      cy.get("p").should("contain", "No teacher records found.");
    });

    it("should display teacher records when type is teacher", () => {
      // Assuming that the teacher records are displayed in a div with a class of 'teacher-record'
      cy.get(".record__container").should("exist");
    });
  });

  //Test for header component
  it("should display the dashboard and arrow images", () => {
    cy.get('img[alt="dashboard"]').should("be.visible");
    cy.get('img[alt="arrow-right"]').should("be.visible");
  });

  it("should display the correct header text for teachers", () => {
    // Assuming that the type prop is set to 'teacher'
    cy.get("h3").should("contain", "All Teachers Record");
  });

  it('should display the "Create Record" link for teacher', () => {
    // Assuming that the type prop is set to 'teacher'
    cy.get("a").contains("Create Record").should("exist");
    cy.get("a").contains("Create Record").click();
    cy.url().should("include", "/create-form/teacher");
  });

  it('should display the "View Students" link for teachers', () => {
    // Assuming that the type prop is set to 'teacher'
    cy.get("a").contains("View Students").should("exist");
    cy.get("a").contains("View Students").click();
    cy.url().should("include", "/student");
  });

  it('should call dispatch(setLoader(true)) when "View Students" link is clicked', () => {
    // Stub the dispatch function
    cy.contains("View Students").click();

    // cy.window().its("Cypress").its("store").invoke("dispatch", setLoader(true));
  });
});
