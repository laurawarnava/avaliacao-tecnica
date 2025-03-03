function selectDropdown(label, option) {
    cy.contains('label', label)
        .closest('.oxd-input-group')
        .find('.oxd-select-wrapper')
        .click();

    cy.get('.oxd-select-dropdown')
        .should('be.visible')
        .contains(option)
        .click();
}

function selectEmployeeName(employeeName) {
    cy.get('.oxd-input-group')
        .contains('label', 'Employee Name')
        .closest('.oxd-input-group')
        .find('input[placeholder="Type for hints..."]')
        .type(employeeName);

    cy.contains('.oxd-autocomplete-option', employeeName)
        .should('be.visible')
        .click();
}

function deleteUser(username) {
    cy.contains('.oxd-table-row', username)
        .should('exist')
        .within(() => {
            cy.get('.oxd-icon.bi-trash')
                .should('be.visible')
                .click();
        });

    cy.contains('button', 'Yes, Delete')
        .should('be.visible')
        .click();

    cy.contains('div', 'Success')
        .should('be.visible')
        .and('contain', 'Success');

    cy.contains('.oxd-table-row', username).should('not.exist');
}

describe('Adicionar Usuários', () => {
    beforeEach(() => {
        cy.login('Admin', 'admin123');
        cy.navigate('addUser');
    });

    after(() => {
        deleteUser('c.smith');
    });

    it('Validar Campos Obrigatórios', () => {
        cy.contains('button', 'Save').should('be.visible').click();

        const camposObrigatorios = [
            'User Role',
            'Employee Name',
            'Status',
            'Username',
            'Password'
        ];

        camposObrigatorios.forEach(campo => {
            cy.contains('label', campo)
                .closest('.oxd-input-group')
                .find('.oxd-input-field-error-message')
                .should('be.visible')
                .and('contain', 'Required');
        });
    });

    it('Validar o Campo Password - Menor que 7 Caracteres', () => {
        selectDropdown('User Role', 'Admin');
        selectDropdown('Status', 'Enabled');
        selectEmployeeName('Christopher Mcmillan');

        cy.contains('label', 'Username')
            .closest('.oxd-input-group')
            .find('input')
            .type('c.mcmillan');

        cy.contains('label', 'Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abc1');

        cy.contains('label', 'Confirm Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abc1');

        cy.contains('button', 'Save').should('be.visible').click();

        cy.contains('label', 'Password')
            .closest('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain', 'Should have at least 7 characters');
    });

    it('Validar o Campo Password - Sem Número', () => {
        selectDropdown('User Role', 'Admin');
        selectDropdown('Status', 'Enabled');
        selectEmployeeName('Christopher Mcmillan');

        cy.contains('label', 'Username')
            .closest('.oxd-input-group')
            .find('input')
            .type('c.mcmillan');

        cy.contains('label', 'Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abcdefgh');

        cy.contains('label', 'Confirm Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abcdefgh');

        cy.contains('button', 'Save').should('be.visible').click();

        cy.contains('label', 'Password')
            .closest('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain', 'Your password must contain minimum 1 number');
    });

    it('Validar o Campo Confirm Password - Senhas Diferentes', () => {
        selectDropdown('User Role', 'Admin');
        selectDropdown('Status', 'Enabled');
        selectEmployeeName('Christopher Mcmillan');

        cy.contains('label', 'Username')
            .closest('.oxd-input-group')
            .find('input')
            .type('c.mcmillan');

        cy.contains('label', 'Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abcdefgh1');

        cy.contains('label', 'Confirm Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abcdefgh2');

        cy.contains('button', 'Save').should('be.visible').click();

        cy.contains('label', 'Confirm Password')
            .closest('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain', 'Passwords do not match');
    });

    it('Cadastrar Usuário com Sucesso', () => {
        selectDropdown('User Role', 'Admin');
        selectEmployeeName('Charlotte Smith');
        selectDropdown('Status', 'Enabled');

        cy.contains('label', 'Username')
            .closest('.oxd-input-group')
            .find('input')
            .type('c.smith');

        cy.contains('label', 'Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abc1234');

        cy.contains('label', 'Confirm Password')
            .closest('.oxd-input-group')
            .find('input')
            .type('abc1234');

        cy.contains('button', 'Save').should('be.visible').click();

        cy.contains('div', 'Success')
            .should('be.visible')
            .and('contain', 'Success');

        cy.url().should('include', '/admin/viewSystemUsers');

        const camposValidados = [
            'c.smith',
            'Admin',
            'Charlotte Smith',
            'Enabled'
        ];

        camposValidados.forEach(campo => {
            cy.get('.oxd-table-row')
                .contains('div', campo)
                .should('be.visible');
        });
    });
});