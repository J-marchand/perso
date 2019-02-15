'use strict'

var Validate = function(){

    this.loadBasket();
    this.basket = new Basket();
    this.totalHt = 0;

    $(document).on('click', '.deleteProduct', this.deleteProduct.bind(this));
    $(document).on('change', '.selectQty', this.onChangePrice.bind(this) );
}

Validate.prototype.loadBasket = function()
{
    this.products = loadDataFromDomStorage('panier');
    $('#show_validate_product').empty();
    var totalAmount = 0;

    for(var i = 0; i <this.products.length; i++){
        
        totalAmount += this.products[i].price_product*this.products[i].quantity_select_product

        var tr = $('<tr>');
            tr.append('<td><img src="'+getWwwUrl()+'/images/shop/man-min/casquette.jpg" alt=""></td>');
            tr.append('<td>'+this.products[i].name_product+'</td>');
            tr.append('<td class="t-a-center">'+this.products[i].price_product+'</td>');
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
            tr.append('<td class="t-a-center">'+(this.products[i].price_product*this.products[i].quantity_select_product )+'</td>');
            tr.append('<td class="fourth_td"><button class="deleteProduct" data-productid="'+i+'"><i class="fa             fa-trash"></i></button></td>');
            $('#show_validate_product').append(tr);
    }   
    
    

    $('#show_total_product').empty();
        var tr = $('<tr>');
            tr.append('<td></td>');
            tr.append('<td></td>');
            tr.append('<td></td>');
            tr.append('<td></td>');
            tr.append('<td>'+totalAmount+'€</td>');
            tr.append('<td></td>');
            
        $('#show_total_product').append(tr);
    
        var order = JSON.stringify(this.products);

        $('#totalOrder').val(order);
}

Validate.prototype.onChangePrice = function(event) {
    event.preventDefault();

    var id = parseFloat(event.currentTarget.dataset.id);
    var qty = parseFloat(event.currentTarget.value);


    var total = parseFloat(this.products[id].price_product)* parseFloat(qty);

    this.products[id].quantity_select_product = qty;
    saveDataToDomStorage('panier', this.products);

    this.loadBasket()
}

Validate.prototype.deleteProduct = function(event)
{
    event.preventDefault();
    var id = event.currentTarget.dataset.productid;
    this.products.splice(id, 1);
    saveDataToDomStorage('panier', this.products);
    this.loadBasket();
}