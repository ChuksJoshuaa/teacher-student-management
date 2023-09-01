describe("Navigation to Teacher View", () => {
  beforeEach(() => {
    // Visit the teacher home view before each test
    cy.visit("http://localhost:3000");
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
  });

  it('should display the "View Students" link for teachers', () => {
    // Assuming that the type prop is set to 'teacher'
    cy.get("a").contains("View Students").should("exist");
  });

  it('should call dispatch(setLoader(true)) when "View Students" link is clicked', () => {
    // Stub the dispatch function
    cy.window().then((win: any) => {
      console.log("yes oo, it is working");
      cy.stub(win, win.dispatch).as("dispatchStub");
    });

    // Click the "View Students" link
    cy.contains("View Students").click();

    // Assert that dispatch(setLoader(true)) is called
    cy.get("@dispatchStub").should("be.calledWith", {
      type: "record/setLoader",
      payload: true,
    });
  });

  // it('should display the "Go back" button for other types', () => {
  //   // Assuming that the type prop is set to something other than 'teacher' or 'student'
  //   cy.wait(1000); // Wait for 1 second
  //   cy.get('[data-testid="go-back-button"]').should("exist");
  // });
});
