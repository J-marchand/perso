'use strict'

var button_connexion = document.getElementById('connexion');

var view = document.getElementById('connexion_view')

button_connexion.addEventListener('click', onClickView);


function onClickView(event){

    event.preventDefault();
    view.classList.toggle('hide');
    button_connexion.classList.toggle('bgc-w-color');

}