# Documentação do Projeto: Avaliação Técnica

Este projeto contém um conjunto de testes E2E, realizados com Cypress, para validar a funcionalidade de criação e cadastro de usuários em uma aplicação web voltada para a gestão de recursos humanos.

## Pré-requisitos

Antes de rodar os testes, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Instalação

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/laurawarnava/avaliacao-tecnica.git
   ```

2. Acesse o diretório do projeto:

    ```bash
    cd avaliacao-tecnica
    ```
3. Instale as dependências do projeto:

   ```bash
    npm install
    ```
## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:
  
   ```bash
avaliacao-tecnica
├── cypress
│   ├── e2e
│   │   └── adicionarUsuarios.cy.js
│   ├── fixtures
│   └── support
│       ├── commands.js
│       └── e2e.js
├── node_modules
├── .gitignore
├── cypress.config.js
├── package-lock.json
└── package.json
```
- /cypress/e2e: Contém os testes E2E.
- cypress.config.js: Arquivo de configuração do Cypress.
- package.json: Contém as dependências do projeto.


## Testes Implementados

Este projeto inclui 5 testes E2E, focados na validação do preenchimento correto dos campos no formulário de criação de usuários e no processo de cadastro bem-sucedido. Os testes implementados são os seguintes:

### 1. **Validar Campos Obrigatórios**
   - **Arquivo:** `adicionarUsuarios.cy.js`
   - **Objetivo:** Verifica se os campos obrigatórios do formulário de criação de usuário estão sendo corretamente validados.
   - **Descrição:** O teste verifica se, ao tentar salvar o formulário sem preencher os campos obrigatórios, são exibidas as mensagens de erro correspondentes. Os campos obrigatórios incluem: `User Role`, `Employee Name`, `Status`, `Username` e `Password`.

### 2. **Validar o Campo Password - Menor que 7 Caracteres**
   - **Arquivo:** `adicionarUsuarios.cy.js`
   - **Objetivo:** Testa a validação do campo de senha quando o usuário insere uma senha com menos de 7 caracteres.
   - **Descrição:** O teste verifica se o sistema exibe a mensagem de erro "Should have at least 7 characters" quando a senha inserida for inferior a 7 caracteres.

### 3. **Validar o Campo Password - Sem Número**
   - **Arquivo:** `adicionarUsuarios.cy.js`
   - **Objetivo:** Verifica se a senha inserida contém pelo menos um número.
   - **Descrição:** O teste valida que a mensagem de erro "Your password must contain minimum 1 number" é exibida quando a senha não contém números.

### 4. **Validar o Campo Confirm Password - Senhas Diferentes**
   - **Arquivo:** `adicionarUsuarios.cy.js`
   - **Objetivo:** Testa a validação do campo "Confirm Password" quando as senhas nos campos "Password" e "Confirm Password" não coincidem.
   - **Descrição:** O teste valida se o sistema exibe a mensagem de erro "Passwords do not match" quando as senhas inseridas são diferentes.

### 5. **Cadastrar Usuário com Sucesso**
   - **Arquivo:** `adicionarUsuarios.cy.js`
   - **Objetivo:** Testa o fluxo de cadastro de um usuário com todos os campos preenchidos corretamente.
   - **Descrição:** O teste preenche os campos de `User Role`, `Employee Name`, `Status`, `Username` e `Password`, e valida se o sistema realiza o cadastro com sucesso. Após a criação, verifica-se se o usuário foi redirecionado para a página de sucesso e se as informações cadastradas estão visíveis na lista de usuários.

## Executando os Testes

Para rodar os testes, execute o seguinte comando no terminal:

```bash
npx cypress open
```
Isso abrirá a interface gráfica do Cypress, onde você pode selecionar e rodar os testes manualmente.

Caso queira rodar os testes em modo headless (sem interface gráfica), use o seguinte comando:

```bash
npx cypress run
```