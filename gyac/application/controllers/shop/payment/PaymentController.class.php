<?php

class PaymentController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {        
        

        
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $listProducts = json_decode($_POST['totalOrder']);
        
        $shopModel = new ShopModel();
        $orderId = $shopModel->newOrder();

        $totalAmount = 0;


        foreach($listProducts as $listProduct)
        {
            $salePrice = $shopModel->findSalePrice($listProduct ->id_product);
            
            $listProduct->safeSalePrice = floatVal($salePrice['price_product']);

            $shopModel -> addProductLine($listProduct -> id_product, $orderId,  $listProduct -> price_product, $listProduct -> quantity_select_product);

            $totalAmount += floatVal($listProduct->safeSalePrice) * floatVal($listProduct->quantity_select_product);
        }

        $shopModel -> updateOrder($totalAmount,$orderId);

        var_dump($totalAmount);

        return [
            'totalAmount' => $totalAmount
        ];
    }
}