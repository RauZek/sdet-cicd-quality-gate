interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

describe('JSONPlaceholder API contract', () => {
  const configuredApiBaseUrl = Cypress.expose('API_BASE_URL');

  if (typeof configuredApiBaseUrl !== 'string' || configuredApiBaseUrl.trim() === '') {
    throw new Error('API_BASE_URL must be configured before running API tests.');
  }

  const apiBaseUrl = configuredApiBaseUrl;

  it('asserts a direct API response and its schema', () => {
    cy.request<Post[]>(`${apiBaseUrl}/posts?_limit=5`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(5);
      response.body.forEach((post) => {
        expect(post).to.include.keys('userId', 'id', 'title', 'body');
        expect(post.id).to.be.a('number');
        expect(post.title).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('intercepts a browser request and validates the payload', () => {
    cy.intercept('GET', `${apiBaseUrl}/posts/1`).as('postDetails');
    cy.visit('/');
    cy.window().then((window) => window.fetch(`${apiBaseUrl}/posts/1`).then((response) => response.json()));
    cy.wait('@postDetails').its('response').then((response) => {
      expect(response?.statusCode).to.eq(200);
      expect(response?.body).to.include({ id: 1, userId: 1 });
    });
  });
});