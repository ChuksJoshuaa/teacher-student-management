declare global {
  interface AUTWindow extends Window {
    dispatch: any;
  }
}

interface CypressWithStore extends Cypress.Cypress {
  store?: typeof store;
}

declare global {
  interface Window {
    Cypress?: CypressWithStore;
  }
}

if (typeof window !== "undefined" && window.Cypress) {
  window.Cypress.store = store;
}
