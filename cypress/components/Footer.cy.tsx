import { Footer } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
// import { mount } from "@cypress/react";
import { mount } from "cypress/react18";

describe("Footer", () => {
  it("should mount", () => {
    mount(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    cy.get("h5").should("contain", "Peabux.");
  });

  it("should mount It should contain the necessary words", () => {
    mount(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    cy.get("h5").should("contain", "Peabux.");
  });
});
