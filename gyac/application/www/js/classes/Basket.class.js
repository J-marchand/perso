'use strict'
var Basket = function(){

    this.products = [];
    this.loadLocalStorage();
    this.buildProduct();
    $(document).on('click','.addProduct', this.addLocalStorage.bind(this));
    $(document).on('click', '.deleteProduct', this.deleteProduct.bind(this));
    $(document).on('change', '.selectQty', this.onChangePrice.bind(this) );
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
        quantity_select_product : 1,
        total_price_quantity_product : $('#'+prodId+' .product_price strong').text(),
    }

    /*console.log(product)
    console.log(product.quantity_product);*/

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
        var tr = $('<tr id="tr-'+i+'" class="ud-p-20">')
        tr.append('<td class="first_td">'+this.products[i].name_product+'</td>');
        tr.append('<td class="second_td">'+(this.products[i].quantity_select_product * this.products[i].price_product)+'</td>');
        var td = $('<td class="third_td">'); 
        var select = $('<select data-id="'+i+'" class="selectQty">');
            for (var j= 1; j <= this.products[i].quantity_product; j++) {
                if (this.products[i].quantity_select_product  == j) {
                    select.append('<option value='+j+' selected>'+j+'</option>')
                } else {
                    select.append('<option value='+j+'>'+j+'</option>')
                }
            }
        td.append(select);
        tr.append(td);
        tr.append('<td class="fourth_td"><button class="deleteProduct" data-productid="'+i+'"><i class="fa fa-trash"></i></button></td>');

        $('#basket').append(tr);

        
    }
}


Basket.prototype.deleteProduct = function(event)
{
    event.preventDefault();
    var id = event.currentTarget.dataset.productid;
    this.products.splice(id, 1);
    saveDataToDomStorage('panier', this.products);
    this.buildProduct();
}

Basket.prototype.onChangePrice = function(event) {
    event.preventDefault();

    var id = event.currentTarget.dataset.id;
    var qty = event.currentTarget.value;

    var total = parseFloat(this.products[id].price_product)* parseFloat(qty);

    this.products[id].quantity_select_product = qty;
    this.products[id].total_price_quantity_product = total;

    saveDataToDomStorage('panier', this.products);
    this.buildProduct()
}