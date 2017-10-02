describe('Los estudiantes under monkeys', function() {
  it('visits los estudiantes and survives monkeys', function() {
      cy.visit('https://losestudiantes.co');
      cy.contains('Cerrar').click();
      cy.wait(1000);
      //randomClick(10);
      randomEvent(6);
  })
})


function randomClick(monkeysLeft) {

  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  };

  var monkeysLeft = monkeysLeft;
  if(monkeysLeft > 0) {
      cy.get('a').then($links => {
          var randomLink = $links.get(getRandomInt(0, $links.length));
          if(!Cypress.Dom.isHidden(randomLink)) {
              cy.wrap(randomLink).click({force: true});
              monkeysLeft = monkeysLeft - 1;
          }
          setTimeout(randomClick, 1000, monkeysLeft);
      });
  }   
}


function randomEvent(monkeysLeft) {
  
  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  };

  function getRandomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < getRandomInt(0, 400); i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function clickLink() {
    cy.get('a').then($links => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      if(!Cypress.Dom.isHidden(randomLink)) {
          cy.wrap(randomLink).click({force: true});
          cy.wait(1000);
      }
    });
  };                        

  function llenarTexto() {
    cy.get('input').then($inputs => {
      var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
      cy.wrap(randomInput).click({force: true}).type(getRandomText());
      cy.wait(1000);
    });
  };

  function selectCombo() {
    try{
      cy.get('combobox').then($combos => {
        var randomCombo = $combos.get(getRandomInt(0, $combos.length));
        cy.wrap(randomCombo).click({force: true});
        cy.wait(1000);
      });
    } catch(error){
      cy.log("No se encontraron comboBox.")
    }
  };

  function clickButton() {
    cy.get('button').then($buttons => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
      if(!Cypress.Dom.isHidden(randomButton)) {
          cy.wrap(randomButton).click({force: true});
          cy.wait(1000);
      }
    });
  };

  function main(monkeysLeft) {
    switch (getRandomInt(0, 3)) {
      case 0: 
        clickLink();
        break;
      case 1: 
        llenarTexto();
        break;
      case 2: 
        selectCombo();
        break;
      case 3: 
        clickButton();
        break;
    }

    if(monkeysLeft > 0){
      main(monkeysLeft -1);
    }
    
  };

  //Ejecución rutina principal
  main(monkeysLeft - 1);  
}

