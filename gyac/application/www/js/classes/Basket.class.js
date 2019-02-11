'use strict'
var Basket = function(){

    this.products = [];
    this.loadLocalStorage();
    this.buildProduct();
    $(document).on('click','.addProduct', this.addLocalStorage.bind(this));
}



Basket.prototype.addLocalStorage = function(event)
{    
    event.preventDefault();

    var prodId =event.currentTarget.dataset.id; 

    var product = {

        id_product : prodId,
        name_product : $('#'+prodId+' .product_name').text(),
        img_product : $('#'+prodId+' .product_img').data('info'),
        detail_product : $('#'+prodId+' .product_detail').text(),
        price_product : $('#'+prodId+' .product_price strong').text(),
        quantity_product : $('#'+prodId+' .quantity_product strong').text(),
    }

    console.log(product)
    console.log(product.quantity_product);

    for(var i = 0; i < this.products.length; i++){
        if(this.products[i].id_product == product.id_product){
            window.alert('Cet article est deja dans votre panier');
            return;
        }
    }
    this.products.push(product);    
    saveDataToDomStorage('panier', this.products);
    this.buildProduct();
    //console.log(this.products.quantity_product.value);
}

Basket.prototype.loadLocalStorage = function()
{
    this.products = loadDataFromDomStorage('panier');
    if(this.products == null)
    {
        this.products = []
        this.buildProduct();
    }
}

Basket.prototype.buildProduct = function()
{
    //console.log(this.products.quantity_product.val);

    $('#basket').empty();
    for(var i = 0; i <this.products.length; i++){
        var tr = $('<tr class="ud-p-20">')
        tr.append('<td class="first_td">'+this.products[i].name_product+'</td>');
        tr.append('<td class="second_td">'+this.products[i].price_product+'</td>');
        var td = $('<td>'); 
        var select = $('<select>');
        for (var j= 1; j <= this.products[i].quantity_product; j++) {
            select.append('<option value='+j+'>'+j+'</option>')
        }
        td.append(select);
        tr.append(td);

        $('#basket').append(tr);
    }
}