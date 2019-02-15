<?php

class ShopModel
{
    public function getProductDetail()
    {
        $data = new Database();
        $shop = $data->query('SELECT
                                *
                            FROM
                                shop');        
        return $shop; 
        
    }

    public function findSalePrice($id)
    {
        $data = new Database();
        $find = $data -> queryOne('SELECT
                                    price_product
                                FROM
                                    shop
                                WHERE
                                    id = ?',
                                [
                                    $id
                                ]);

                                //var_dump($find);

                                return $find;
    }

    public function newOrder()
    {
        $data = new Database();
        $orderId = $data -> executeSql('INSERT INTO
                                `order`(`creation_timestamp`, `user_id`, `status`) 
                            VALUES 
                                (NOW(), ?, ?)',
                            [
                                $_SESSION['id'], 'previous'
                            ]);

        return $orderId;
    }

    public function addProductLine($idProduct, $orderId, $priceProduct, $quantityProduct)
    {
        $data = new Database();
        $data -> executeSql('INSERT INTO 
                                `orderLine`(`product_id`, `order_id`, `price_each`, `quantity_ordered`) 
                            VALUES 
                                (?,?,?,?)', 
                            [
                                $idProduct, $orderId, $priceProduct, $quantityProduct
                            ]);

        
        
    } 

    public function updateOrder($totalAmount, $id)
    {
        $data = new Database();
        $data->executeSql('UPDATE 
                            `order` 
                        SET 
                            `total_amount` = ?,
                            `complete_timestamp` = NOW()
                        WHERE 
                            `id`= ?',
                        [
                            $totalAmount,                            
                            $id                            
                        ]);

    }

    public function getOrderDetail($id){

        $data = new Database();
        $order = $data-> queryOne('SELECT
                        *
                    FROM
                        `order`
                    WHERE 
                        `user_id` = ?',
                    [
                        $id
                    ]);

                    return $order;
    }
}