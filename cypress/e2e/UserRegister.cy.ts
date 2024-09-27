import { afterAll } from "vitest";
import {prisma} from "../../src/database"
import {cli} from 'cypress'
describe("Testes de Sistema - Cadastro de Usuário", () => {
  
  it("Deve exibir um erro ao tentar cadastrar com o campo nome em branco", () => {
    cy.visit("http://localhost:8080");
    cy.get('.register-redirect a').click();
    
    cy.wait(500);
    cy.get('#inputRegisterPhone').type('1234567890');
    
    cy.wait(500);
    cy.get('#inputRegisterEmail').type('teste@example.com');
    
    cy.wait(500);
    cy.get('#inputRegisterPassword').type('senha123');
    
    cy.wait(500);
    cy.get('#inputRegisterConfirmPassword').type('senha123'); // Confirmar senha igual
    
    cy.wait(500);
    cy.get('#btnCadastrar').click();
    
    cy.on('window:alert', (text) => {
        expect(text).to.contains('O campo Nome está vazio.'); // Mensagem esperada
    });
  });
  
  it("Deve exibir um erro ao tentar cadastrar com o campo telefone em branco", () => {
    cy.visit("http://localhost:8080");
    cy.get('.register-redirect a').click();
    
    cy.wait(500);
    cy.get('#inputRegisterName').type('Teste');
    
    cy.wait(500);
    cy.get('#inputRegisterEmail').type('teste2@gmail.com');
    
    cy.wait(500);
    cy.get('#inputRegisterPassword').type('senha123');
    
    cy.wait(500);
    cy.get('#inputRegisterConfirmPassword').type('senha123'); // Confirmar senha igual
    
    cy.wait(500);
    cy.get('#btnCadastrar').click();
    
    cy.on('window:alert', (text) => {
        expect(text).to.contains('O campo Telefone está vazio.'); // Mensagem esperada
    });
  });
  
  it("Deve exibir um erro ao tentar cadastrar com o campo email em branco", () => {
    cy.visit("http://localhost:8080");
    cy.get('.register-redirect a').click();
    
    cy.wait(500);
    cy.get('#inputRegisterName').type('Teste');
    
    cy.wait(500);
    cy.get('#inputRegisterPhone').type('1234567890');
    
    cy.wait(500);
    cy.get('#inputRegisterPassword').type('senha123');
    
    cy.wait(500);
    cy.get('#inputRegisterConfirmPassword').type('senha123'); // Confirmar senha igual
    
    cy.wait(500);
    cy.get('#btnCadastrar').click();
    
    cy.on('window:alert', (text) => {
        expect(text).to.contains('O campo E-mail está vazio.'); // Mensagem esperada
    });
  });
  
  it("Deve exibir um erro ao tentar cadastrar com a senha em branco", () => {
    cy.visit("http://localhost:8080");
    cy.get('.register-redirect a').click();
    
    cy.wait(500);
    cy.get('#inputRegisterName').type('Teste');
    
    cy.wait(500);
    cy.get('#inputRegisterPhone').type('1234567890');
    
    cy.wait(500);
    cy.get('#inputRegisterEmail').type('teste@example.com');
    
    cy.wait(500);
    cy.get('#inputRegisterConfirmPassword').type('senha123'); // Confirmar senha igual
    
    cy.wait(500);
    cy.get('#btnCadastrar').click();
    
    cy.on('window:alert', (text) => {
        expect(text).to.contains('O campo Senha está vazio.'); // Mensagem esperada
    });
  });
  
  it("Deve exibir um erro ao tentar cadastrar com a confirmação de senha em branco", () => {
    cy.visit("http://localhost:8080");
    cy.get('.register-redirect a').click();
    
    cy.wait(500);
    cy.get('#inputRegisterName').type('Teste');
    
    cy.wait(500);
    cy.get('#inputRegisterPhone').type('1234567890');
    
    cy.wait(500);
    cy.get('#inputRegisterEmail').type('teste@example.com');
    
    cy.wait(500);
    cy.get('#inputRegisterPassword').type('senha123'); // Preencher senha
    
    cy.wait(500);
    cy.get('#btnCadastrar').click();
    
    cy.on('window:alert', (text) => {
        expect(text).to.contains('O campo Confirmar Senha está vazio.'); // Mensagem esperada
    });
  });
  
  it("Deve exibir um erro ao tentar cadastrar com senhas diferentes", () => {
    cy.visit("http://localhost:8080");
    cy.get('.register-redirect a').click();
    
    cy.wait(500);
    cy.get('#inputRegisterName').type('Teste');
    
    cy.wait(500);
    cy.get('#inputRegisterPhone').type('1234567890');
    
    cy.wait(500);
    cy.get('#inputRegisterEmail').type('teste@example.com');
    
    cy.wait(500);
    cy.get('#inputRegisterPassword').type('senha123'); // Preencher senha
    
    cy.wait(500);
    cy.get('#inputRegisterConfirmPassword').type('senha321'); // Senha diferente
    
    cy.wait(500);
    cy.get('#btnCadastrar').click();
    
    cy.on('window:alert', (text) => {
        expect(text).to.contains('As senhas não correspondem.'); // Mensagem esperada
    });
  });
  
   
});


