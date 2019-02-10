<?php

class UserModel
{
    private function hashPassword($password)
    {
        $salt = '$2y$11$'.substr(bin2hex(openssl_random_pseudo_bytes(32)), 0, 22);
        return crypt($password, $salt);
    }

    private function verifyPassword($password, $hashedPassword)
    {
        return crypt($password, $hashedPassword) == $hashedPassword;
    }

    public function addUser($POST)
    {
        $hashPsw = $this->hashPassword($POST['password']);

        $user = new Database();
        $addUser = $user->executeSql('INSERT INTO 
                                `users`(`firstName`, `lastName`, `email`, `password`, `category`) 
                            VALUES 
                                (?, ?, ?, ?, ?)',
                            [
                                $POST['firstName'],
                                $POST['lastName'],
                                $POST['mail'],
                                $hashPsw,
                                $POST['radio']                                
                            ]);
        $http = new Http;
        $http->redirectTo('/user/login');
    }

    public function loginUser($POST)
    {
        $data = new Database();
        $info = $data -> queryOne('SELECT 
                                    *
                                FROM
                                    users
                                WHERE
                                    email = ?',
                                [
                                    $POST['mail']
                                ]);

        $verifPsw = $this->verifyPassword($POST['password'], $info['password']);

        if($verifPsw == true)
        {
            $_SESSION['email']      = $info['email'];
            $_SESSION['password']   = $info['password'];
            $_SESSION['firstName']  = $info['firstName'];
            $_SESSION['lastName']   = $info['lastName'];
            $_SESSION['category']   = $info['category'];
            $_SESSION['id']         = $info['id'];

            $http = new Http;
            $http->redirectTo('/');

            var_dump('coucou');
        }        
    }
}