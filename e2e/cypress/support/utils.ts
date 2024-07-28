import { parse } from 'url';
import { parse as parseQS } from 'querystring';

export const responseToToken = (resp: Cypress.Response) => {
  const uri = parse(resp.redirectedToUrl, true);
  const fragment = parseQS(uri.hash!.substring(1));
  expect(fragment).to.have.property('access_token');
  return fragment.access_token as string;
};
