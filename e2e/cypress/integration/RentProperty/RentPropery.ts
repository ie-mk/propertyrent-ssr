import { Then, Given } from 'cypress-cucumber-preprocessor/steps';
import global from '../../support/global';
import { sum } from 'lodash';

let testTimeStamp: number;
let latestCreatedOpportunityId: string;

before(() => {});

if (Cypress.env('E2ELOCAL')) {
  afterEach(function() {
    // in case the current test fails we will not continue
    // @ts-ignore
    if (this.currentTest.state === 'failed') {
      // @ts-ignore
      Cypress.runner.stop();
    }
  });
}

beforeEach(() => {
  cy.viewport(1900, 1200);
  cy.server();
});

Given('I navigate to login page', () => {
  cy.get('[data-test="go-to-login-page"]').click();
});

Given('I login with test user with registered permissions', () => {
  cy.get('[data-test="hidden-login-form"]').within(() => {
    cy.get('[name=email]').then(elem => {
      elem.val('test-registered-user@test.com');
    });

    cy.get('[name=password]').then(elem => {
      elem.val('test-registered-user');
    });

    cy.get('[data-test="login-with-test-user"]').click({ force: true });
  });
});

Given(`I navigate to platform url`, () => {
  cy.visit('/');
});

Given('I open date picker', () => {
  cy.get('.DateRangePickerInput_calendarIcon').click();
});

Given('I select start date first day of the week on the date picker', () => {
  cy.get('table.CalendarMonth_table_1')
    .eq(2)
    .within(() => {
      cy.get('tbody tr:nth-child(2) td:first-child').click({ force: true });
    });
});

Given('I select same week last day of the week on the date picker', () => {
  cy.get('table.CalendarMonth_table_1')
    .eq(2)
    .within(() => {
      cy.get('tbody tr:nth-child(2) td:last-child').click({ force: true });
    });
});

Given('I select same week last day of the week on the date picker', () => {
  cy.get('table.CalendarMonth_table_1')
    .eq(2)
    .within(() => {
      cy.get('tbody tr:nth-child(2) td:last-child').click();
    });
});

Given('I enter the number of guests {string}', (nrOfGuest: string) => {
  cy.get('input[name="numberOfPeople"]').type(nrOfGuest);
});

Given(
  'I add first {string} items from the list to favourites',
  (nr: string) => {
    const nrOfElements = Number(nr);

    Array.from(Array(nrOfElements).keys()).forEach((_, idx) => {
      cy.get('[data-test="ad-to-favourites"]')
        .eq(idx)
        .click({ force: true });
    });
  },
);

Given(
  'The number of favourites on the results page should be {string}',
  (nr: string) => {
    cy.get('[data-test="ad-to-favourites-active"]').should(
      'have.length',
      Number(nr),
    );
  },
);

Given('I refresh page', () => {
  cy.reload();
});

Given('I click {string} result in the results page', (nthElement: string) => {
  cy.get('[data-test="results-item"]')
    .eq(Number(nthElement) - 1)
    .click();
});

Given(`I navigate to user profile page`, () => {
  cy.visit('/dashboard');
});

Given('I click the Properties list tab', () => {
  cy.get('[data-test="results-properties"]').click();
});

Then('I fill add description data', (dataTable: any) => {
  cy.get('input[name="title"]')
    .clear()
    .type(dataTable.rawTable[0][1], {
      force: true,
    });
  cy.get('input[name="nr_of_rooms"]')
    .clear()
    .type(dataTable.rawTable[1][1], {
      force: true,
    });
  cy.get('input[name="bedrooms"]')
    .clear()
    .type(dataTable.rawTable[2][1], {
      force: true,
    });
  cy.get('input[name="bathrooms"]')
    .clear()
    .type(dataTable.rawTable[3][1], {
      force: true,
    });
  cy.get('input[name="price_per_night"]')
    .clear()
    .type(dataTable.rawTable[4][1], {
      force: true,
    });
  cy.get('input[name="currency"]')
    .clear()
    .type(dataTable.rawTable[5][1], {
      force: true,
    });
  cy.get('input[name="max_nr_of_guests"]')
    .clear()
    .type(dataTable.rawTable[6][1], {
      force: true,
    });
  cy.get('textarea[name="description_location"]')
    .clear()
    .type(dataTable.rawTable[7][1], {
      force: true,
    });
  cy.get('textarea[name="description_full"]')
    .clear()
    .type(dataTable.rawTable[8][1], {
      force: true,
    });
});

Then('I check the values of the description', (dataTable: any) => {
  cy.get('input[name="title"]').should('have.value', dataTable.rawTable[0][1]);
  cy.get('input[name="nr_of_rooms"]').should(
    'have.value',
    dataTable.rawTable[1][1],
  );
  cy.get('input[name="bedrooms"]').should(
    'have.value',
    dataTable.rawTable[2][1],
  );
  cy.get('input[name="bathrooms"]').should(
    'have.value',
    dataTable.rawTable[3][1],
  );
  cy.get('input[name="price_per_night"]').should(
    'have.value',
    dataTable.rawTable[4][1],
  );
  cy.get('input[name="currency"]').should(
    'have.value',
    dataTable.rawTable[5][1],
  );
  cy.get('input[name="max_nr_of_guests"]').should(
    'have.value',
    dataTable.rawTable[6][1],
  );
  cy.get('textarea[name="description_location"]').should(
    'have.value',
    dataTable.rawTable[7][1],
  );
  cy.get('textarea[name="description_full"]').should(
    'have.value',
    dataTable.rawTable[8][1],
  );
});

Given('I expand the {string} section', (location: string) => {
  cy.get('[data-test="test-title"]')
    .contains(location)
    .click();
});

Then('Google map with location marker should be rendered', () => {
  cy.get('[data-test="test-map"]').should('be.visible');
});

Then('I fill address data', (dataTable: any) => {
  cy.get('input[name="addressLine1"]')
    .clear()
    .type(dataTable.rawTable[0][1], {
      force: true,
    });
  cy.get('input[name="addressLine2"]')
    .clear()
    .type(dataTable.rawTable[1][1], {
      force: true,
    });
  cy.get('input[name="city"]')
    .clear()
    .type(dataTable.rawTable[2][1], {
      force: true,
    });
  cy.get('input[name="zipCode"]')
    .clear()
    .type(dataTable.rawTable[3][1], {
      force: true,
    });
});

Then('I should not see {string}', (title: string) => {
  cy.contains(title).should('not.exist');
});

Then('I move drag marker to the new location', () => {
  cy.get('[usemap^="#gmimap"]')
    .parent()
    .as('marker')
    .then($el => {
      const { x, y } = $el[0].getBoundingClientRect();

      cy.log('-------marker positionv x: ', x);
      cy.log('-------marker position y: ', y);

      cy.get('@marker')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x + 200, clientY: y + 200 })
        .trigger('mouseup');
    });
});

// ====================== EXAMPLES ====================================

Given('I navigate to the Opportunities Tab', () => {
  cy.get('a[href="/opportunities"]').click();
  cy.wait('@load-opportunities').then(xhr => {
    return xhr.status === 200;
  });
});

Given('I create an opportunity', (dataTable: any) => {
  testTimeStamp = new Date().getTime();

  const data = {
    amount: dataTable.rawTable[0][1],
    name: `Test opportunity ${testTimeStamp}`,
    dealType: dataTable.rawTable[1][1],
  };

  cy.window().then((win: any) => {
    const token = win.localStorage.getItem('apiToken');
    (cy as any)
      .createOpportunity(token, testTimeStamp, data)
      // @ts-ignore
      .then(response => {
        latestCreatedOpportunityId = response.body.data.id;
        cy.log('created opportunity ID: ', latestCreatedOpportunityId);
      });
  });
  cy.wait(2000);
});

Given('I create an opportunity with V1 loan pricing', (dataTable: any) => {
  testTimeStamp = new Date().getTime();

  const opportunityName = `Test opportunity ${testTimeStamp}`;

  const data = {
    amount: dataTable.rawTable[0][1],
    name: opportunityName,
    dealType: dataTable.rawTable[1][1],
  };

  cy.window().then((win: any) => {
    const token = win.localStorage.getItem('apiToken');
    (cy as any)
      .createOpportunity(token, testTimeStamp, data)
      // @ts-ignore
      .then(response => {
        latestCreatedOpportunityId = response.body.data.id;
        cy.log('created opportunity ID: ', latestCreatedOpportunityId);

        const data = {
          companyNumber: '03884704',
          salesforceId: latestCreatedOpportunityId,
          companyName: opportunityName,
          loanAmount: 700000.0,
          loanTermMonths: 35.0,
          dealType: 'Trading - Acquisition',
          repaymentStructure: 'Interest Only',
        };

        cy.log('latestCreatedOpportunityId: ', latestCreatedOpportunityId);

        cy.window().then((win: any) => {
          const token = win.localStorage.getItem('apiToken');
          (cy as any)
            .createV1LoanGrading(token, data)
            // @ts-ignore
            .then(response => {
              cy.log('created V1 loan pricing: ', response);
            });
        });
      });
  });
  cy.wait(2000);
});

Given('I delete created opportunity', () => {
  cy.window().then((win: any) => {
    const token = win.localStorage.getItem('apiToken');
    (cy as any)
      .deleteOpportunity(token, latestCreatedOpportunityId)
      .then(() => {
        cy.log('DELETE SUCCESS opportunity ID: ', latestCreatedOpportunityId);
      });
  });
});

Given(
  'I get Opportunity Id from url and modify an opportunity amount in salesforce to be equal: {string}',
  (newAmount: string) => {
    cy.window().then((win: any) => {
      const token = win.localStorage.getItem('apiToken');
      cy.url().then(url => {
        const urlLocationArray = url.replace(global.url, '').split('/');
        const opportunityIdIndex =
          urlLocationArray.findIndex(item => item === 'opportunities') + 1;
        const opportunityId = urlLocationArray[opportunityIdIndex];
        (cy as any).modifyOpportunityAmount(
          token,
          testTimeStamp,
          opportunityId,
          Number(newAmount),
        );
      });
    });
    cy.wait(2000);
  },
);

Given(
  'I select a company from the list at position {string}',
  (position: string) => {
    cy.get(`div[tabindex="${position}"]`)
      .first()
      .click();
  },
);

Given('I click on the loan pricing tab', () => {
  cy.get('[data-test="loan-pricing-tab"]').click({ force: true });
});

Given('I sign in as {string}', (role: string) => {
  // somehow ts throws an error because of the arguments passed to the command
  (cy as any).loginBySingleSignOn(role);
});

Given('I click {string}', (name: string) => {
  cy.contains(name).click();
});

Given('I click button {string}', (name: string) => {
  cy.get(`button:contains("${name}")`).click({ force: true });
});

Given('I click button Add new asset', () => {
  cy.contains('Add new asset')
    .should('have.prop', 'tagName')
    .should('eq', 'BUTTON');
  cy.contains('Add new asset').click();
  cy.contains('Add new asset').should('have.attr', 'aria-expanded', 'true');
  cy.contains('Freehold Property').should('be.visible');
});

Given('I click loan pricing step {string}', (index: string) => {
  cy.get('.stepper-header-item')
    .eq(Number(index) - 1)
    .click();
});

Given('I search for {string}', (name: string) => {
  cy.get('div[data-test="opportunities-filter"] input').type(name);
});

Given('I search for newly created opportunity', () => {
  cy.get('div[data-test="opportunities-filter"] input').type(
    `Test opportunity ${testTimeStamp}`,
  );
});

Given('I search for the opportunity {string}', (name: string) => {
  cy.get('div[data-test="opportunities-filter"] input').type(name);
});

Given('I clear the opportunities search field', () => {
  cy.get('div[data-test="opportunities-filter"] button').click();
});

Given('I select first company in the company lookup dropdown', () => {
  cy.get('[data-test="company-lookup-list-item"]')
    .first()
    .click({ force: true });
});

Given('I enter {string} in the loan pricing company search', (name: string) => {
  cy.get('div[data-test="company-lookup-container"] input')
    .focus()
    .type(name);
});

Given('I clear name from the loan pricing company search', (name: string) => {
  cy.get('div[data-test="company-lookup-container"] input').clear();
});

Then(
  'Company search menu first item should have company number {string}',
  (number: string) => {
    cy.get('[data-test="company-lookup-list-item"]')
      .first()
      .contains(number);
  },
);

Then('I adjust borrower price to {string}', (price: string) => {
  // https://github.com/cypress-io/cypress/issues/1570
  cy.window().then(window => {
    const nativeInputValueSetter =
      // @ts-ignore
      Object.getOwnPropertyDescriptor(
        // @ts-ignore
        window.HTMLInputElement.prototype,
        'value',
      ).set;
    // @ts-ignore
    cy.get('[data-test="range-slider"]').then($range => {
      const range = $range[1];
      // set the value manually
      nativeInputValueSetter &&
        nativeInputValueSetter.call(range, Number(price));
      range.dispatchEvent(
        // @ts-ignore
        new Event('change', { value: Number(price), bubbles: true }),
      );
    });
  });

  // this one is based on cypress docs https://docs.cypress.io/api/commands/trigger.html#Mouse-Events
  // but it is not working
  // cy.get('[data-test="range-slider"]')
  //   .eq(1)
  //   .invoke('val', -1)
  //   .trigger('change');
});

Then('Company growth percentage value should be {string}', (growth: string) => {
  cy.get('[data-test="company-growth-percentage"] input').should(
    'have.value',
    growth,
  );
});

Then('Company growth band should be {string}', (band: string) => {
  cy.get('[data-test="company-growth-band"] input').should('have.value', band);
});

Then(
  'Company employees growth percentage value should be {string}',
  (growth: string) => {
    cy.get('[data-test="company-employees-growth-percentage"] input').should(
      'have.value',
      growth,
    );
  },
);

Then('Company employees growth band should be {string}', (band: string) => {
  cy.get('[data-test="company-employees-growth-band"] input').should(
    'have.value',
    band,
  );
});

Then('The credit grade should be {string} stars', (stars: string) => {
  cy.get('[data-test="loan-pricing-credit-grade-score"] svg').should(
    'have.length.gte',
    Number(stars),
  );
});

Then('I can see security grade to be {string} padlocks', (padlocks: string) => {
  cy.get('[data-test="security-grade-padlock"]').should(
    'have.length.gte',
    Number(padlocks),
  );
});

Then('I can see security asset contains {string}', (text: string) => {
  cy.get('[data-test="security-asset-card"]').contains(text);
});

//I can see security asset minimum value "1,600,000"

Then('I should see modal', () => {
  cy.get('[data-test="modal"]').should('be.visible');
});

Then('I can see security asset minimum value {string}', (text: string) => {
  cy.get('[data-test="security-asset-card"] [name="minimumValue"]').should(
    'have.value',
    text,
  );
});

Then('I expand the security asset', () => {
  cy.get('[data-test="security-asset-expand-icon"]').click({ force: true });
});

Then('I click edit button of security asset', () => {
  cy.get('[data-test="security-asset-edit-button"]').click({ force: true });
});

Then('I can see the loan pricing container', () => {
  cy.get('[data-test="loan-pricing-container"]').should('have.length', 1);
});

Then('I can see list of opportunities', () => {
  cy.get('div[data-test="opportunities-list-item"]')
    .its('length')
    .should('be.gt', 10);
});

Then('I refresh the page', () => {
  cy.reload().wait(2000);
  cy.viewport(1900, 1200);
});

Then('I wait {string} ms', (ms: string) => {
  cy.wait(Number(ms));
});

Then('The version should be {string}', (version: string) => {
  cy.get('[data-test="loan-pricing-version"]').should('have.value', version);
});

Then('I can see company credit report data', (dataTable: any) => {
  cy.get('[data-test="credit-report-delphi-score"]').should(
    'have.value',
    dataTable.rawTable[0][1],
  );

  cy.get('[data-test="credit-report-fss-score"]').should(
    'have.value',
    dataTable.rawTable[1][1],
  );

  cy.get('[data-test="credit-report-hfs"]').should(
    'have.value',
    dataTable.rawTable[2][1],
  );

  cy.get('[data-test="credit-report-delphi-band"]').should(
    'have.value',
    dataTable.rawTable[3][1],
  );

  cy.get('[data-test="credit-report-fss-band"]').should(
    'have.value',
    dataTable.rawTable[4][1],
  );
});

Then('I fill company growth data', (dataTable: any) => {
  cy.get('[data-test="company-growth-container"] input')
    .first()
    .clear()
    .type(dataTable.rawTable[0][1]);

  cy.get('[data-test="company-growth-container"] input')
    .eq(1)
    .clear()
    .type(dataTable.rawTable[1][1]);

  cy.get('[data-test="company-growth-container"] input')
    .eq(4)
    .clear()
    .type(dataTable.rawTable[2][1]);

  cy.get('[data-test="company-growth-container"] input')
    .eq(5)
    .clear()
    .type(dataTable.rawTable[3][1]);
});

Then('I click Debt Obligations Edit button', () => {
  cy.get('[data-test="debt-obligations-container"]').within(
    (companyDebtContainer: any) => {
      cy.get('button')
        .contains('Edit')
        .click();
    },
  );
});

Then('I fill Debt Obligations data', (dataTable: any) => {
  cy.get(
    '[data-test="debt-obligations-container"] input[name="higherRankingDebt"]',
  ).type(dataTable.rawTable[0][1]);

  cy.get(
    '[data-test="debt-obligations-container"] input[name="equalRankingTCDebt"]',
  ).type(dataTable.rawTable[1][1]);

  cy.get(
    '[data-test="debt-obligations-container"] input[name="equalRankingDebt"]',
  ).type(dataTable.rawTable[2][1]);

  cy.get(
    '[data-test="debt-obligations-container"] input[name="rolledUpInterest"]',
  ).type(dataTable.rawTable[3][1]);
});

Then(
  'The loan pricing value should be system price added adjusted borrower price {string}',
  (adjustment: string) => {
    let systemPrice: number;
    let adjusted: number;
    let shownPrice: number;
    let result: number;

    cy.get('[data-test="borrower-price-system"]').should($el => {
      systemPrice = Number(
        $el
          .text()
          .substr(14)
          .replace('%', ''),
      );
    });

    cy.get('[data-test="borrower-price-adjustment"]').should($el => {
      adjusted = Number($el.text().replace(' bps', '')) / 100;
      expect(String(adjusted)).to.equal(adjustment);
    });

    cy.get('[data-test="borrower-price-final"]').should($el => {
      shownPrice = Number(String($el.text()).replace('%', ''));
      const computedPrice = systemPrice + adjusted;
      expect(shownPrice).to.equal(computedPrice);
    });
  },
);

Then(
  'I select {string} from adding new security asset dropdown',
  (asset: string) => {
    // TODO: wait for https://github.com/cypress-io/cypress/issues/695#issuecomment-379817133
    cy.get('.k-item[role="menuItem"]')
      .contains(asset)
      .parents('.k-item')
      .should('be.visible')
      .click();

    cy.get('[data-test="security-asset-card"]')
      .contains(asset)
      .should('be.visible');
  },
);

Then('I can see {string}', (title: string) => {
  cy.contains(title);
});

Then('I should see company Loan Pricing tab', () => {
  cy.get('[data-test="loan-pricing-tab"]').contains('Loan pricing');
});

Then('I should see company Summary tab', () => {
  cy.get('[data-test="summary-tab"]').contains('Summary');
});

Then('Summary tab must be displayed as default', () => {
  cy.get('[data-test="summary-tab"]').should('have.class', 'active');
});

Then('In summary all required fields should be displayed', () => {
  cy.get('[data-test="company-summary-container"]')
    .should('contain', 'Main entity name')
    .and('contain', 'Main entity number')
    .and('contain', 'Entity to be graded name')
    .and('contain', 'Entity to be graded number')
    .and('contain', 'Amount')
    .and('contain', 'Loan Term')
    .and('contain', 'Stage')
    .and('contain', 'Credit Grading')
    .and('contain', 'Security Grading')
    .and('contain', 'Security Structure')
    .and('contain', 'Repayment Type')
    .and('contain', 'Type')
    .and('contain', 'Deal Type')
    .and('contain', 'Created')
    .and('contain', 'Last Modified')
    .and('contain', 'Last Activity')
    .and('contain', 'Close Date')
    .and('contain', 'Account - Name')
    .and('contain', 'Owned By')
    .and('contain', 'Created By');
});

Then(
  'I can see button {string} with label: {string}',
  (name: string, label: string) => {
    cy.get(`[data-test=${name}]`).as(`${name}`);
    cy.get(`@${name}`).should('contain', label);
  },
);

Then('I can see button {string}', (name: string) => {
  cy.get('button').should('contain', name);
});

Then('I should not see button {string}', (title: string) => {
  cy.get('button')
    .contains(title)
    .should('not.exist');
});

Then('I should not see {string}', (text: string) => {
  cy.contains(text).should('not.exist');
});

Then(
  'I select property type {string} on the security asset',
  (property_type: string) => {
    cy.get('[data-test="security-assets-container"] form')
      .eq(0)
      .within(() => {
        cy.get('[name=assetSubtype]').select(property_type);
      });
  },
);

Then(
  'I select charge type {string} on the security asset',
  (charge_type: string) => {
    cy.get('[data-test="security-assets-container"] form')
      .eq(0)
      .within(() => {
        cy.get('[name=chargeType]').select(charge_type);
      });
  },
);

Then('I add security asset data', (dataTable: any) => {
  cy.get('[data-test="security-assets-container"]').should('be.visible');

  cy.get('[data-test="security-assets-container"] form')
    .eq(0)
    .should('be.visible')
    .within(() => {
      cy.get('input[name=assetName]')
        .should('be.visible')
        .type(dataTable.rawTable[0][1]);

      cy.get('input[name=marketValue]')
        .should('be.visible')
        .type(dataTable.rawTable[1][1]);

      cy.get('input[name=bookValue]')
        .should('be.visible')
        .type(dataTable.rawTable[2][1]);

      cy.get('input[name=valuation]')
        .should('be.visible')
        .type(dataTable.rawTable[3][1]);

      cy.get('span.k-datepicker input.k-input').then(() => {
        cy.get('span[title="Toggle calendar"]').click();
      });
    });

  cy.get('div.k-calendar-view.k-calendar-monthview span.k-link')
    .eq(0)
    .click({ force: true });

  cy.wait(1000);

  const expectedDate = Cypress.moment()
    .startOf('month')
    .format('DD/MM/YYYY');

  cy.get('[data-test="security-assets-container"] form')
    .eq(0)
    .within(() => {
      cy.get('span.k-datepicker input.k-input').should(
        'have.value',
        expectedDate,
      );
      cy.get('input[name=assetSource]')
        .should('be.visible')
        .type(dataTable.rawTable[4][1]);
    });
});

Then('I enter chattel asset data', (dataTable: any) => {
  cy.get('[data-test="security-assets-container"]').should('be.visible');

  cy.get('[data-test="security-assets-container"] form')
    .eq(0)
    .should('be.visible')
    .within(() => {
      cy.get('input[name=assetName]')
        .should('be.visible')
        .type(dataTable.rawTable[0][1]);

      cy.get('input[name=bookValue]')
        .should('be.visible')
        .type(dataTable.rawTable[1][1]);

      cy.get('input[name=valuation]')
        .should('be.visible')
        .type(dataTable.rawTable[2][1]);

      cy.get('span.k-datepicker input.k-input').then(() => {
        cy.get('span[title="Toggle calendar"]').click();
      });
    });

  cy.get('div.k-calendar-view.k-calendar-monthview span.k-link')
    .eq(0)
    .click({ force: true });

  cy.wait(1000);

  const expectedDate = Cypress.moment()
    .startOf('month')
    .format('DD/MM/YYYY');

  cy.get('[data-test="security-assets-container"] form')
    .eq(0)
    .within(() => {
      cy.get('span.k-datepicker input.k-input').should(
        'have.value',
        expectedDate,
      );
      cy.get('input[name=assetSource]')
        .should('be.visible')
        .type(dataTable.rawTable[3][1]);
    });
});

Then('I fill current asset data', (dataTable: any) => {
  cy.get('[data-test="current-assets-container"]')
    .eq(0)
    .within(() => {
      cy.get('input[name=assetName]')
        .clear()
        .type(dataTable.rawTable[0][1], {
          force: true,
        });
      cy.get('input[name="quarter-1"]')
        .clear()
        .type(dataTable.rawTable[1][1], {
          force: true,
        });
      cy.get('input[name="quarter-2"]')
        .clear()
        .type(dataTable.rawTable[2][1], {
          force: true,
        });
      cy.get('input[name="quarter-3"]')
        .clear()
        .type(dataTable.rawTable[3][1], {
          force: true,
        });
      cy.get('input[name="quarter-4"]')
        .clear()
        .type(dataTable.rawTable[4][1], {
          force: true,
        });
    });
});

Then('I change the current asset scaling to {string}', (scaling: string) => {
  cy.get('input[data-test="current-asset-bookValueScaling"]')
    .clear()
    .type(scaling, { force: true });
});

Then('Current asset scaling should be {string}', (scaling: string) => {
  cy.get('input[data-test="current-asset-bookValueScaling"]').should(
    'have.value',
    scaling,
  );
});

Then('I edit security asset data', (dataTable: any) => {
  cy.get('input[name=marketValue]')
    .clear()
    .type(dataTable.rawTable[0][1], {
      force: true,
    });
  cy.get('input[name=bookValue]')
    .clear()
    .type(dataTable.rawTable[1][1], {
      force: true,
    });
  cy.get('input[name=valuation]')
    .clear()
    .type(dataTable.rawTable[2][1], {
      force: true,
    });
});

Then(
  'I select asset type {string} on the current asset',
  (chargeType: string) => {
    cy.get('[data-test="current-assets-container"]')
      .eq(0)
      .within(() => {
        cy.get('[name=assetSubtype]').select(chargeType);
      });
  },
);

Then(
  'I select asset location {string} on the current asset',
  (asetLocation: string) => {
    cy.get('[data-test="current-assets-container"]')
      .eq(0)
      .within(() => {
        cy.get('[name=assetLocation]').select(asetLocation);
      });
  },
);

Then(
  'I select asset location {string} on the second current asset',
  (asetLocation: string) => {
    cy.get('[data-test="current-assets-container"]')
      .eq(1)
      .within(() => {
        cy.get('[name=assetLocation]').select(asetLocation);
      });
  },
);

Then('I select {string} in current asset source', (source: string) => {
  cy.get('[data-test="current-assets-container"]')
    .eq(0)
    .within(() => {
      cy.get('[name=assetSource]').type(source);
    });
});

Then(
  'I select asset type {string} on the chattel asset',
  (chargeType: string) => {
    cy.get('[data-test="chattel-assets-container"]')
      .eq(0)
      .within(() => {
        cy.get('[name=assetSubtype]').select(chargeType);
      });
  },
);

Then('I expand {string}:nth item in security asset list', (nthItem: string) => {
  cy.get('[data-test="security-asset-expand-icon"]')
    .eq(Number(nthItem))
    .click({ force: true });
});

Then('I add cashflow uplift data', (dataTable: any) => {
  cy.get('input[name=ebitda]')
    .clear()
    .type(dataTable.rawTable[0][1], {
      force: true,
    });

  cy.get('input[name=turnoverTopClient]')
    .clear()
    .type(dataTable.rawTable[1][1], {
      force: true,
    });

  cy.get('input[name=turnoverTopTen]')
    .clear()
    .type(dataTable.rawTable[2][1], {
      force: true,
    });

  cy.get('input[name=turnoverContracted]')
    .clear()
    .type(dataTable.rawTable[3][1], {
      force: true,
    });
});

Then('I click edit Cashflow uplift', () => {
  cy.get('[data-test="cashflow-uplift-edit-button"]').click({ force: true });
});

Then('I click button edit on security asset', () => {
  cy.get('[data-test="security-asset-edit-button"]')
    .scrollIntoView()
    .click({ force: true });
});

Then('Debug', () => {
  throw 'intentional stop to grab the snapshot';
});

Then(
  'I click "Show awaiting approval only" and compare the number of opportunities with the full list and than click again to go back to the full list of opportunities',
  () => {
    cy.route('/loans-api/loan-pricing/pending-approval').as(
      'load-approved-opportunities',
    );

    cy.get('div[data-test="opportunities-list-item"]')
      .its('length')
      .then(listOfAllOpportunitiesLength => {
        cy.get(
          '[data-test="opportunities-list-awaiting-approval-filter-button"]',
        ).click({ force: true });

        cy.wait('@load-approved-opportunities').then(xhr => {
          return xhr.status === 200;
        });

        cy.get(
          '[data-test="opportunities-list-awaiting-approval-filter-button"]',
        ).should('contain', 'Show all');

        cy.get('div[data-test="opportunities-list-item"]')
          .its('length')
          .as('listOfFilteredByApprovalOnlyOpportunitiesLength');

        cy.get('@listOfFilteredByApprovalOnlyOpportunitiesLength').should(
          'be.lt',
          listOfAllOpportunitiesLength,
        );

        cy.get(
          '[data-test="opportunities-list-awaiting-approval-filter-button"]',
        ).click();

        cy.wait(1000);

        cy.get('div[data-test="opportunities-list-item"]')
          .its('length')
          .as('listOfAllOpportunitiesLengthAfterClickingAgain');

        cy.get('@listOfAllOpportunitiesLengthAfterClickingAgain').should(
          'be.eq',
          listOfAllOpportunitiesLength,
        );
      });
  },
);

Then(
  'I check if inside loan pricing toast container exists the toast message: {string} and the sync button with label: {string}',
  (message: string, buttonLabel: string) => {
    cy.get('[data-test="loan-pricing-toast-sync"]')
      .should('be.visible')
      .should('contain', message);

    cy.get('[data-test="loan-pricing-toast-sync-button"]').should(
      'contain',
      buttonLabel,
    );
  },
);

Then('I should not see toast for loan pricing sync', () => {
  cy.wait(2000);

  cy.get('[data-test="loan-pricing-toast-sync"]').should('not.exist');
});

Then('I check if list item amount contains: {string}', (amount: string) => {
  cy.get('[data-test="opportunities-list-item-amount"]')
    .first()
    .should('have.text', amount);
});

Then(
  'I compare the sum of all Security Assets Minimum values: {string} with the Total adjusted value',
  (sumOfAllSecurityAssetsMinimumValues: string) => {
    cy.get('[data-test="security-assets-total"]').should(
      'have.text',
      sumOfAllSecurityAssetsMinimumValues,
    );
  },
);

Then(
  'I compare the sum of all Debt Obligations values with the Total debt obligation field value',
  () => {
    let total: string;
    cy.get('[data-test="total-debt-obligations"]')
      .invoke('text')
      .then(val => {
        // @ts-ignore
        total = val;
      });

    cy.get('[data-test="debt-obligations-container"]').within(() => {
      cy.get('input').then(($input: any) => {
        const formatValue = (string: string) =>
          string &&
          Number(
            string
              .replace(/\£/g, '')
              .replace(/ /g, '')
              .split(',')
              .join(''),
          );
        const totalDebtObligationsValue = formatValue(total);
        const sumOfAllDebtObligationsInputs = sum([
          formatValue($input[0].value),
          formatValue($input[1].value),
          formatValue($input[2].value),
          formatValue($input[3].value),
        ]);
        expect(totalDebtObligationsValue).to.equal(
          sumOfAllDebtObligationsInputs,
        );
      });
    });
  },
);

Then('Sort security assets by value and name and check the results', () => {
  const asNumber = (value: string) => Number(value.replace(/[^\d]/g, ''));
  cy.get(
    '[data-test="security-assets-container"] [aria-label="Sort by value dropdownbutton"]',
  ).click({ force: true });
  cy.get('[data-test="security-assets-sort-by-button-item-name"]').click({
    force: true,
  });

  cy.get('[data-test="security-assets-container"]').within(() => {
    cy.get('form input[name="assetName"]').then($items => {
      // @ts-ignore
      const items = $items.map((idx, htmlEl) => Cypress.$(htmlEl).val());

      cy.log('sorted by name values:', items.toArray().toString());

      const expected = [
        'ChatelAsset1',
        'CurrentAsset1',
        'CurrentAsset2',
        'FreeholdAsset1',
        'FreeholdAsset2',
      ];

      cy.log('expected sorted to be: ', expected.toString());

      expect(items.toArray()).to.deep.eq(expected);
    });
  });

  cy.get(
    '[data-test="security-assets-container"] [aria-label="Sort by name dropdownbutton"]',
  ).click({ force: true });
  cy.get('[data-test="security-assets-sort-by-button-item-value"]').click({
    force: true,
  });
  cy.get(
    '[data-test="security-assets-container"] form input[name="minimumValue"]',
  ).then($items => {
    // @ts-ignore
    const items = $items.map((idx, htmlEl) => Cypress.$(htmlEl).val());

    cy.log('sorted by value:', items.toArray().toString());

    const expected = [
      '£ 2,800,000',
      '£ 491,250',
      '£ 420,000',
      '£ 77,500',
      '£ 0',
    ];

    cy.log('expected sorted to be: ', expected.toString());

    expect(items.toArray()).to.deep.eq(expected);
  });
});

Then(
  'I select ratchet option: {string} which should have value: {string}',
  (option: string, value: string) => {
    cy.get('select[name="ratchet"]')
      .select(option)
      .should('have.value', value);
  },
);

Then(
  'I can see that element with name: {string} is disabled',
  (name: string) => {
    cy.get(`[name="${name}"]`).should('be.disabled');
  },
);

Then('Borrower price final should be equal: {string}', (value: string) => {
  cy.get('[data-test="borrower-price-final"]').should('include.text', value);
});

Then('Borrower price adjustment should be equal: {string}', (text: string) => {
  cy.get('[data-test="borrower-price-adjustment"]').then(($div: any) => {
    expect($div).to.have.text(text);
  });
});

Then('System price should be equal: {string}', (text: string) => {
  // get
  cy.get('[data-test="borrower-price-system"]').then(($div: any) => {
    expect($div).to.have.text(text);
  });
});

const pricingMatrix = [
  [null, null, null, null, 9.5],
  [14.5, 12, 10.5, 9.5, 8.5],
  [11.25, 9.7, 9.4, 8.75, 7.25],
  [9.65, 9.5, 8.9, 7.5, 6.5],
  [8.75, 8, 7.5, 6.5, 6.25],
];

const getBorrowerPrice = () => {};

Then(
  'Indicative borrower price should match credit and security grade matrix',
  () => {
    cy.get('[data-test="loan-pricing-credit-grade-score"] svg').then($el => {
      const creditGrade = $el.length;
      cy.get('[data-test="security-grade-padlock"]').then($el => {
        const securityGrade = $el.length;

        let uplift = 0;

        cy.get('[data-test="borrower-price-uplift"]').then($el => {
          const upliftText = $el.text();
          if (upliftText && upliftText.includes('Borrower price includes')) {
            uplift = Number(upliftText.replace(/[^0-9\.]+/g, ''));
          }

          let pricing = pricingMatrix[creditGrade - 1][securityGrade - 1];
          // @ts-ignore
          pricing = uplift ? pricing + uplift : pricing;

          const pricingString = pricing ? pricing.toFixed(2) : pricing;

          cy.contains(
            `Indicative borrower price: system ${pricingString}%, user ${pricingString}%`,
          );

          cy.get('[data-test="borrower-price-system"]').then(($div: any) => {
            expect($div).to.have.text(`System price: ${pricingString}%`);
          });
        });
      });
    });
  },
);

Then(
  'Indicative borrower price should match credit and security grade matrix with user adjustment {string}',
  (adjustment: string) => {
    cy.get('[data-test="loan-pricing-credit-grade-score"] svg').then($el => {
      const creditGrade = $el.length;
      cy.get('[data-test="security-grade-padlock"]').then($el => {
        const securityGrade = $el.length;

        let uplift = 0;

        cy.get('[data-test="borrower-price-uplift"]').then($el => {
          const upliftText = $el.text();
          if (upliftText && upliftText.includes('Borrower price includes')) {
            uplift = Number(upliftText.replace(/[^0-9\.]+/g, ''));
          }

          let pricing = pricingMatrix[creditGrade - 1][securityGrade - 1];

          pricing = uplift && pricing ? pricing + uplift : pricing;

          const adjusted =
            adjustment && pricing ? pricing + Number(adjustment) : pricing;

          const pricingString = pricing ? pricing.toFixed(2) : pricing;
          const adjustedString = adjusted ? adjusted.toFixed(2) : adjusted;

          cy.contains(
            `Indicative borrower price: system ${pricingString}%, user ${adjustedString}%`,
          );

          cy.get('[data-test="borrower-price-system"]').then(($div: any) => {
            expect($div).to.have.text(`System price: ${pricingString}%`);
          });
        });
      });
    });
  },
);

//=========================== V2 ========================================

Then('I fill use of loan data', (dataTable: any) => {
  cy.get('input[name=tangible]')
    .clear()
    .type(dataTable.rawTable[0][1], {
      force: true,
    });

  cy.get('input[name=intangible]')
    .clear()
    .type(dataTable.rawTable[1][1], {
      force: true,
    });

  cy.get('input[name=cash]')
    .clear()
    .type(dataTable.rawTable[2][1], {
      force: true,
    });

  cy.get('input[name=stock]')
    .clear()
    .type(dataTable.rawTable[3][1], {
      force: true,
    });

  cy.get('input[name=creditors]')
    .clear()
    .type(dataTable.rawTable[3][1], {
      force: true,
    });
});

Then(
  'Use of loan stays in company value should be {string}',
  (value: string) => {
    cy.get('input[name=totalStays').should('have.value', value);
  },
);

Then(
  'Use of loan stays in company percentage should be {string}',
  (percentage: string) => {
    cy.get('[data-test="stays-in-company-percentage"]').contains(percentage);
  },
);

Then(
  'Create new loan pricing accounts and check if it is active',
  (dataTable: any) => {
    cy.get('[data-test="draft-accounts-selector-table-cell"]')
      .should('be.visible')
      .within(() => {
        cy.get('span.k-input')
          .should('be.visible')
          .contains('Create accounts')
          .click();
      });

    cy.get('.k-list-container')
      .should('be.visible')
      .within(() => {
        cy.contains('Create new accounts')
          .should('be.visible')
          .click();
      });

    cy.get('[data-test="modal"]')
      .should('be.visible')
      .within(() => {
        cy.get('select#select-new-accounts-type')
          .should('be.visible')
          .select('Other');

        cy.get('input[name="typeOther"]')
          .should('be.visible')
          .clear()
          .type(dataTable.rawTable[0][1]);

        cy.get('input[name="typeOther"]')
          .should('be.visible')
          .invoke('val')
          .should('eq', dataTable.rawTable[0][1]);

        cy.get('textarea[name="description"]')
          .should('be.visible')
          .clear()
          .type(dataTable.rawTable[1][1]);

        cy.get('textarea[name="description"]')
          .should('be.visible')
          .invoke('val')
          .should('eq', dataTable.rawTable[1][1]);

        cy.get('button[type="submit"]')
          .should('be.visible')
          .click();

        cy.get('[data-test="modal"]').should('not.be.visible');
      });

    cy.get('[data-test="draft-accounts-selector-table-cell"]')
      .should('be.visible')
      .within(() => {
        cy.contains(dataTable.rawTable[0][1]);
      });

    cy.get('[data-test="accounts-description-column"]')
      .should('be.visible')
      .and('contain', dataTable.rawTable[1][1])
      .and('contain', 'View history (1 changes)');
  },
);

Then('Add new accounts description and view history', (dataTable: any) => {
  const dataTestDescription = dataTable.rawTable[0][1];
  const description = dataTable.rawTable[1][1];

  cy.get(`[data-test=${dataTestDescription}]`).as(`${dataTestDescription}`);

  cy.get(`@${dataTestDescription}`)
    .should('be.visible')
    .within(() => {
      cy.get('button[type="button"]')
        .should('be.visible')
        .click({ force: true });
    });

  cy.get('[data-test="modal"]')
    .should('be.visible')
    .within(() => {
      cy.get('textarea[name="content"]')
        .should('be.visible')
        .clear()
        .type(description);

      cy.get('textarea[name="content"]')
        .should('be.visible')
        .and('contain', description);

      cy.get('button[type="submit"]')
        .should('be.visible')
        .click();
    });

  cy.get(`@${dataTestDescription}`)
    .should('be.visible')
    .within(() => {
      cy.contains(description);

      cy.get('a')
        .should('be.visible')
        .click();
    });

  cy.get('[data-test="modal"]')
    .should('be.visible')
    .within(() => {
      cy.contains(description);

      cy.get('button[type="button"]')
        .should('be.visible')
        .and('contain', 'Close')
        .click();
    });
});

Then(
  'Add accounts comments in the specific section and view their history',
  (dataTable: any) => {
    const dataTestSectionName = dataTable.rawTable[0][1];
    const commentOne = dataTable.rawTable[1][1];
    const commentTwo = dataTable.rawTable[2][1];
    const buttonOneText = '+ Add comment';
    const buttonTwoText = 'Add new';

    cy.get(`[data-test=${dataTestSectionName}]`).as(`${dataTestSectionName}`);

    cy.get(`@${dataTestSectionName}`)
      .should('be.visible')
      .within(() => {
        cy.get('button[type="button"]')
          .should('contain', buttonOneText)
          .click({ force: true });
      });

    cy.get('[data-test="modal"]')
      .should('be.visible')
      .within(() => {
        cy.get('textarea[name="content"]')
          .should('be.visible')
          .clear()
          .type(commentOne);

        cy.get('textarea[name="content"]')
          .should('be.visible')
          .and('contain', commentOne);

        cy.get('button[type="submit"]')
          .should('be.visible')
          .click();
      });

    cy.get(`@${dataTestSectionName}`)
      .should('be.visible')
      .within(() => {
        cy.contains(commentOne);
      });

    cy.get(`@${dataTestSectionName}`)
      .should('be.visible')
      .within(() => {
        cy.get('button[type="button"]')
          .should('contain', buttonTwoText)
          .click({ force: true });
      });

    cy.get('[data-test="modal"]')
      .should('be.visible')
      .within(() => {
        cy.get('textarea[name="content"]')
          .should('be.visible')
          .clear()
          .type(commentTwo);

        cy.get('textarea[name="content"]')
          .should('be.visible')
          .and('contain', commentTwo);

        cy.get('button[type="submit"]')
          .should('be.visible')
          .click();
      });

    cy.get(`@${dataTestSectionName}`)
      .should('be.visible')
      .within(() => {
        cy.contains(commentTwo);

        cy.get('a')
          .should('be.visible')
          .click();
      });

    cy.get('[data-test="modal"]')
      .should('be.visible')
      .within(() => {
        cy.contains(commentOne);
        cy.contains(commentTwo);

        cy.get('button[type="button"]')
          .should('be.visible')
          .and('contain', 'Close')
          .click();
      });
  },
);

Given('I click nth:{string} save button', (nth: string) => {
  cy.get(`button:contains("Save")`)
    .eq(Number(nth))
    .click({ force: true });
});
