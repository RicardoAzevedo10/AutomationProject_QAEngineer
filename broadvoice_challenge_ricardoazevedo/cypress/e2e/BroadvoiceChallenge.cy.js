import testData from '../fixtures/testdata.json'
import testDataRegistration from '../fixtures/registo_formulario.json'
const testValue = require('../fixtures/testdata.json')
const testValueRegistration = require('../fixtures/registo_formulario.json')

describe('Challenge', () => {
  it('Scenario 1_Search for George', () => {
    cy.visit('https://www.leyaonline.com/pt/');
    //cy.get('cookiescript_accept').click();
    cy.get('.search-bar').type('George').type('{enter}');
    cy.wait(3000);
    cy.contains('O Triunfo dos Porcos').scrollIntoView();
    cy.get("#bookcard_83457 > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(2)").click();
    cy.contains('Quinta Manor').scrollIntoView();
    cy.window().then(win => {
      win.scrollBy(0, -500);
  });
  });
  it('Scenario 2_Search for the book 1984', () => {
      cy.visit('https://www.leyaonline.com/pt/');
    //cy.get('cookiescript_accept').click();
      cy.get('.search-bar').type('1984').type('{enter}');
      cy.wait(3000);
      cy.contains('1984').scrollIntoView();
      cy.contains('George Orwell').should('be.visible');
      cy.get("#bookcard_74653 > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(2)").click();
      cy.contains('George Orwell').scrollIntoView();
      cy.contains('George Orwell').should('be.visible');
      cy.contains('O autor').scrollIntoView();
      cy.wait(3000);
      /*cy.window().then(win => {
        win.scrollBy(0, -1200);
    });*/
      cy.contains('Detalhes').scrollIntoView();
      cy.contains('9789722071550').should('be.visible');
      cy.wait(3000);
      cy.contains('344').should('be.visible');
      cy.contains('235 x 157 x 23 mm').should('be.visible');

    });

    it('Scenario 3_book A Quinta dos Animais is authored by the same author', () => {
      cy.visit('https://www.leyaonline.com/pt/');
      cy.get('.search-bar').type('1984').type('{enter}');
      cy.wait(3000);
      cy.contains('1984').scrollIntoView();
      cy.contains('George Orwell').should('be.visible');
      cy.get("#bookcard_74653 > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(2)").click();
      cy.contains('A Quinta dos Animais').scrollIntoView();
      cy.contains('A Quinta dos Animais').should('be.visible');
      cy.contains('A Quinta dos Animais').invoke('css', 'background-color', 'yellow');
    });

    it('Scenario 4_Add the book to the basket', () => {
      cy.visit('https://www.leyaonline.com/pt/');
      cy.get('.search-bar').type('1984').type('{enter}');
      cy.wait(3000);
      cy.get("#bookcard_74653 > div:nth-child(3) > a:nth-child(1)").click();
      cy.get(".icon-carrinho").click();
      cy.get('.b-count').should('include.text', '1');
      cy.get('.b-count').should('include.text', '1').should('be.visible');
      });

      it('Scenario 5_Change the background to dark mode', () => {
        cy.clearAllCookies();
        cy.visit('https://www.leyaonline.com/pt/');
        cy.get('.icon-sun').click();
        cy.get('#main').should('have.css', 'background-color', 'rgb(30, 31, 30)');        
      });

      describe("Scenario6_Data Driven Testing import from json", () => {
        let data;
      
        before(() => {
          cy.visit('https://www.leyaonline.com/pt/');
          cy.fixture('testdata').then((value) => {
            data = value;
          });
        });
      
        it('Scenario 6_Log in with different users', () => {
          cy.get('.icon-login').click();
          data.forEach((testValue) => {
            cy.contains('Login').scrollIntoView();
            cy.get('input[name="usr"]').clear().type(testValue.email); // for email input
            cy.get('input[name="pwd"]').clear().type(testValue.password); // for password input            
            cy.get('.login-btn').click();
            cy.wait(2000);
            console.log(testValue);
            
          });
        });
      });

      describe("Scenario 7_navigation between different_filter info_and_makeRegistration", () => {
        let dataRegisto;
      
        before(() => {
          cy.visit('https://www.leyaonline.com/pt/');
          cy.fixture('registo_formulario').then((value) => {
            dataRegisto = value;
          });
        });
           
        it('Scenario 7_navigation between different and filter info ', () => {
            cy.visit('https://www.leyaonline.com/pt/');
            cy.get('.icon-login').click();
            cy.get('.icon-hamburguer').click();
            cy.get('.offcanvas-menu-item > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)').click();
            cy.get('.search-filter-btn > a:nth-child(1)').click();
            cy.get('.col > div:nth-child(5) > a:nth-child(1)').click();
            cy.get('#bookcard_73712 > a:nth-child(1) > div:nth-child(2) > h6:nth-child(1)').should('be.visible');
            cy.contains('Revista Irredutíveis n.º 8 - eBook').scrollIntoView();
            cy.contains('Revista Irredutíveis n.º 8 - eBook').invoke('wrap').invoke('css', 'background-color', 'green');
            cy.wait(3000);
            cy.get('div.hide:nth-child(2) > a:nth-child(1)').scrollIntoView();
            cy.wait(3000);
            cy.get('div.hide:nth-child(2) > a:nth-child(1) > i:nth-child(1)').click(); //remove the filter "gratuito"
            cy.get('.icon-login').click(); //realizar registo na página
            cy.get('.want-registration').click();
            dataRegisto.forEach((testValueRegistration) => {
            cy.get('input[name="nome"]').clear().type(testValueRegistration.name);
            cy.get('input[name="email"]').clear().type(testValueRegistration.email);
            cy.get('input[name="email2"]').clear().type(testValueRegistration.confirmEmail);
            cy.get('input[name="password"]').clear().type(testValueRegistration.password);
            cy.get('input[name="password2"]').clear().type(testValueRegistration.confirmPassword);
            cy.get('.login-btn').click();
           })
          });
      
         
        });
      });
    
      
