<?php
session_start();

include 'application/hash.php';
include 'application/bdd-connexion.php';



if(empty($_POST) == false){

    $pdo->exec('SET NAME UTF8');

    $query = $pdo->prepare
    (
        'SELECT 
            *

        FROM 
            users
        
        WHERE 
            email = ?'
    );

    $query->execute( [$_POST['mail']] );

    $user = $query->fetch(PDO::FETCH_ASSOC);

    if(verifyPassword($_POST['password'], $user['password']) == true){

        $_SESSION['email']      = $user['email'];
        $_SESSION['password']   = $user['password'];
        $_SESSION['firstName']  = $user['firstName'];
        $_SESSION['lastName']   = $user['lastName'];
        $_SESSION['category']   = $user['category'];
        $_SESSION['id']         = $user['id'];

        var_dump($_SESSION);
    
        if($_SESSION['category'] == 'teacher'){

            header('location: admin-teacher.php');
            exit();
        } else {

            header('location: admin-student.php');
            exit();
        }   
    }
}

$template = 'login';
include 'layout.phtml';

?>