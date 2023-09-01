describe("Navigation to Student View", () => {
  beforeEach(() => {
    // Visit the home view before each test
    cy.visit("http://localhost:3000/student");
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
      cy.get("p").should("contain", "No student records found.");
    });

    it("should display student records when type is student", () => {
      // Assuming that the teacher records are displayed in a div with a class of 'teacher-record'
      cy.get(".record__container").should("exist");
    });
  });

  //Test for header component
  it("should display the dashboard and arrow images", () => {
    cy.get('img[alt="dashboard"]').should("be.visible");
    cy.get('img[alt="arrow-right"]').should("be.visible");
  });

  it("should display the correct header text for students", () => {
    // Assuming that the type prop is set to 'student'
    cy.get("h3").should("contain", "All Students Record");
  });

  it('should display the "Create Record" link for students', () => {
    // Assuming that the type prop is set to 'student'
    cy.get("a").contains("Create Record").should("exist");
  });

  it('should display the "View Teachers" link for students', () => {
    // Assuming that the type prop is set to 'student'
    cy.get("a").contains("View Teachers").should("exist");
  });

  it('should display the "Go back" button for other types', () => {
    // Assuming that the type prop is set to something other than 'teacher' or 'student'
    cy.get("button").contains("Go back").should("exist");
  });
});
