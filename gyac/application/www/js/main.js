'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// FONCTIONS                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////

if (document.location.href.indexOf('shop') != -1  && document.location.href.indexOf('shop/validate') == -1 && document.location.href.indexOf('shop/payment') == -1 ) {
    
    var basket = new Basket();

}

if (document.location.href.indexOf('shop') == -1 || (document.location.href.indexOf('shop/payment') == -1 && document.location.href.indexOf('shop/validate') != -1) ){   
    
    var validate = new Validate();
    validate.loadBasket();
}

if (document.location.href.indexOf('shop') == -1 || (document.location.href.indexOf('shop/payment') == -1 && document.location.href.indexOf('shop/validate') == -1)) {
    

    var recap = new Recap();
}

/////////////////////////////////////////////////////////////////////////////////////////
// CODE PRINCIPAL                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////

