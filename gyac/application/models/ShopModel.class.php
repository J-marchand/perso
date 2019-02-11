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
}