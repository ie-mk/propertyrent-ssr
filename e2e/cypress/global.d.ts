declare module 'cypress-cucumber-preprocessor/steps' {
  export function When(def: string, run: () => void);
  export function When(def: string, run: (arg1: string) => void);

  export function Given(def: string, run: () => void);
  export function Given(def: string, run: (arg1: string) => void);

  export function Then(def: string, run: () => void);
  export function Then(def: string, run: (arg1: string) => void);
  export function Then(def: string, run: (arg1: string, arg2: string) => void);
}

// eslint:disable-next-line no-namespace
declare namespace Cypress {
  // eslint:disable-next-line interface-name
  interface Chainable<Subject> {
    loginBySingleSignOn: () => Cypress.Chainable<Response>;
    createOpportunity: (
      apiToken: string,
      data?: {
        amount?: number;
        name?: string;
        dealType?: string;
        companyNumber?: string;
      },
    ) => Cypress.Chainable<Response>;
  }
}
