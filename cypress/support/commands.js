Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]', { timeout: 10000 })
        .should('exist')
        .should('be.visible')
        .type(username);

    cy.get('input[name="password"]', { timeout: 10000 })
        .should('exist')
        .should('be.visible')
        .type(password);

    cy.get('button[type="submit"].orangehrm-login-button')
        .click();

    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('navigate', (page) => {
    const routes = {
        addUser: () => {
            cy.get('a[href="/web/index.php/admin/viewAdminModule"]').click();
            
            cy.contains('button', 'Add')
                .should('be.visible')
                .click();
            
            cy.url().should('include', '/admin/saveSystemUser');
        }
    };

    if (routes[page]) {
        routes[page]();
    } else {
        throw new Error(`Página "${page}" não encontrada no navigate.`);
    }
});
