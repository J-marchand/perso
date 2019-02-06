'use strict'

var first_fieldset      = document.getElementById('first_fieldset');
var second_fieldset     = document.getElementById('second_fieldset');
var subscribe_do_move   = document.getElementById('subscribe_do-move');
var come_back           = document.getElementById('come_back');

subscribe_do_move.addEventListener('click', onClickRemove);
come_back.addEventListener('click', onClickBack);

function onClickRemove(event){

    event.preventDefault();
    first_fieldset.classList.add('hide');
    second_fieldset.classList.remove('hide');

}

function onClickBack(event){

    event.preventDefault();
    second_fieldset.classList.add('hide');
    first_fieldset.classList.remove('hide');
    
}