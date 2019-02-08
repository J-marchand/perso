<?php

session_start();

include 'application/hash.php';
include 'application/bdd-connexion.php';

if(empty($_POST) == false) {
	var_dump($_SESSION);
    var_dump($_POST);
    $hashPassword = hashPassword($_POST['subscribe_password']);
    
    $category     = $_POST['radio'];
    $mail       = $_POST['subscribe_mail'];
    $firstName   = $_POST['subscribe_firstName'];
    $lastName = $_POST['subscribe_lastName'];
    $password  = $_POST['subscribe_password'];

    $query = $pdo->prepare
	(
	    'INSERT INTO 
            `users`(`firstName`, `lastName`, `email`, `password`, `category`) 
        VALUES 
            (?, ?, ?, ?, ?)'
	);

    $query->execute( [ $firstName, $lastName, $mail, $hashPassword, $category ] );
    
    

    if($_SESSION != null){

        header('Location: subscribe.php');
        exit();
    } else {

        header('Location: login.php');
        exit();
    }    
}

$template = 'subscribe';
include 'layout.phtml';

?>