'use strict'
var Basket = function(){

    this.products = [];
    this.loadLocalStorage();

     $('.addProduct').on('click', this.addLocalStorage.bind(this));
}

function clickTest(id){
    console.log(id)
    this.addLocalStorage.bind(this)
}

Basket.prototype.addLocalStorage = function(event)
{    
    event.preventDefault();

    
    console.log(document.getElementById('product_name').innerText);
    // console.log(document.getElementById('product_img').);
    console.log(document.getElementById('product_about').innerText);
    console.log(document.getElementById('product_price').innerText);
    // var product = {
    //     product_id = $('#name_product').val(),
    //     product_img = $('#img_product').text(),
    //     product_about = $('#about_product').text(),
    //     product_price = $('#price_product').val(),
    // } 

    var product = {
        'product_id' : document.getElementById('product_name').innerText,
        // product_img = document.getElementById('img_product').innerText,
        'product_about' : document.getElementById('product_about').innerText,
        'product_price' : document.getElementById('product_price').innerText,
    }

    //console.log(this.products)

    //saveDataToDomStorage('panier', 'this.products');
    if(document.getElementById('product_name').innerText != '')
    {
        console.log("1")
        this.products.push(product);
        console.log("2")
        saveDataToDomStorage('panier', this.products);
        console.log("3")
    }
    
}

Basket.prototype.loadLocalStorage = function(){
    this.products = loadDataFromDomStorage('panier');

    if (this.products == null) {
        this.products = [];
    }
}