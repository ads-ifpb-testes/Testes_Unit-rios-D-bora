describe("Testes de Sistema - Login de Usuário", () => {

    beforeEach(() => {
      cy.visit("http://localhost:8080");
    });
  
    it("Deve exibir um erro ao tentar fazer login com o campo e-mail vazio", () => {
      cy.wait(500);
      cy.get('#inputLoginPassword').type('senha123');
      cy.wait(500);
      cy.get('#btnEntrar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Você precisa informar um e-mail para entrar.'); // Ajuste conforme sua mensagem
      });
    });
  
    it("Deve exibir um erro ao tentar fazer login com o campo senha vazio", () => {
      cy.wait(500);
      cy.get('#inputLoginEmail').type('teste@example.com');
      cy.wait(500);
      cy.get('#btnEntrar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Você precisa informar uma senha para entrar'); // Ajuste conforme sua mensagem
      });
    });
  
    it("Deve exibir um erro ao tentar fazer login com e-mail inválido", () => {
      cy.wait(500);
      cy.get('#inputLoginEmail').type('invalid-email');
      cy.wait(500);
      cy.get('#inputLoginPassword').type('senha123');
      cy.wait(500);
      cy.get('#btnEntrar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Por favor, insira um e-mail válido.'); // Ajuste conforme sua mensagem
      });
    });
  
    it("Deve exibir um erro ao tentar fazer login com credenciais inválidas", () => {
      cy.wait(500);
      cy.get('#inputLoginEmail').type('teste@example.com');
      cy.wait(500);
      cy.get('#inputLoginPassword').type('senhaerrada');
      cy.wait(500);
      cy.get('#btnEntrar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('E-mail ou senha inválidos'); // Ajuste conforme sua mensagem
      });
    });
  
  
  });
  