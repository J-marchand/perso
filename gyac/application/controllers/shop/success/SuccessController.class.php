<?php

class SuccessController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {        
        

        
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $orderDetail = new ShopModel();
        $order = $orderDetail-> getOrderDetail($_SESSION['id']);

        $totalAmount = floatVal($order['total_amount']);

        require_once('vendor/autoload.php');

        \Stripe\Stripe::setApiKey('sk_test_cHXWFKwp7qNImmqkbZcAo25c');

        $POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);

        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];
        $token = $_POST['stripeToken'];


        $customer = \Stripe\Customer::create(array(
            "email" => $email,
            "source" => $token
        ));

        $charge = \Stripe\Charge::create(array(
            "amount" => $totalAmount*100,
            "currency" => "eur",
            "description"=>"Commande ok",
            "customer" => $customer->id
        ));

        
        $http -> redirectTo('shop/final');
    }
}