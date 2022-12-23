"use strict";

window.onload = () => {
    // очищення поля перед створенням квадратів
    document.body.querySelectorAll('*').forEach((elem) => elem.remove());

    let d7 = 0;                                          // кількість прапорців
    let d8 = document.createElement('div');
    d8.textContent = `Кількість прапорців = ${d7}, загальна кількість мін = 10`;
    document.body.appendChild(d8);

    // створення квадратів
    for(let i = 1; i <= 8; i++){
        let d2 = document.createElement('br');
        document.body.appendChild(d2);
        d2.style.clear = 'left';
        for(let j = 1; j <= 8; j++){
            let d1 = document.createElement('div');
            d1.setAttribute('class', 'square');
            document.body.appendChild(d1);
        }
    }
    // генерування 10 випадкових цілих чисел від 0 до 63
    let d3 = document.getElementsByClassName('square');       // масив з квадратів
    let m = [];                                          // масив, елементи якого відповідають квадратам, де знаходяться міни
    let d4 = [];                                         // новий масив з 10 випадково обраних елементів попереднього масиву
    let d5 = 100;                                        // змінна, яка позначає елемент, який випадково повторюється
    let explosion = false;
    for(let i1 = 0; i1 < 10; i1++){
        let j1 = Math.floor(Math.random() * d3.length);
        for(let k = 0; k < i1; k++){                     // пошук елементу, який може повторитися
            if(m[k] == j1){
                i1--;
                d5 = j1;
            }
        }
        if(j1 != d5){
            m.push(j1);
        }
    }
    // створення кнопки "Почати гру заново"
    for(let i = 0; i < d3.length; i++){
        d3[i].addEventListener('click', begin_again);
        d3[i].addEventListener('contextmenu', begin_again);
    }
    let b;                                              // змінна, яка позначає кнопку "Почати гру заново"
    function begin_again(){
        if(b == undefined){
            b = document.createElement('button');
            b.innerHTML = 'Почати гру заново';
            document.body.insertBefore(b, d3[0]);
            let d2 = document.createElement('br');
            document.body.insertBefore(d2, d3[0]);
            b.addEventListener('click', window.onload);
        }
    }

    // помічення квадратів правою кнопкою миші
    for(let i = 0; i < d3.length; i++){
        d3[i].addEventListener('contextmenu', mine_flag);
    }
    function mine_flag(){
        event.preventDefault();                             // заборона контекстного меню при натисканні на квадрат
        let d6 = document.querySelector('div:hover');
        if(explosion == false){
            if(d6.style.backgroundColor != 'red'){
                d6.style.backgroundColor = 'red';
                d7++;
            }
            else{
                d6.style.backgroundColor = 'green';
                d7--;
            }
            d8.textContent = `Кількість прапорців = ${d7}, загальна кількість мін = 10`;
        }
    }

    // створення масиву з квадратів, на яких знаходяться міни
    //console.log(m);
    for(let i = 0; i < m.length; i++){
        d4[i] = d3[m[i]];
    }

    // призначення функції, яка виконується при потраплянні на міну
    for(let i = 0; i < m.length; i++) {
        //d4[i].style.backgroundColor = 'blue';
        d4[i].addEventListener('click', explose);
    }
    function explose() {
        for(let i2 = 0; i2 < d4.length; i2++) {
            d4[i2].style.backgroundColor = 'black';
        }
        explosion = true;
    }

    // створення двомірного масиву, кожен елемент якого показує або міну або кількість мін, розташованих поряд
    let mines = [];
    for(let i = 0; i < 8; i++){
        mines[i] = [];
    }
    
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            mines [i][j] = 0;
        }
    }
    // виявлення місць встановлення мін
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            for(let k = 0; k < m.length; k++){
                if(m[k] == i * 8 + j){
                    mines[i][j] = 'm';
                }
            }
        }
    }

    // двовимірний масив, кожен елемент якого показує кількість мін, розташованих поряд
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            function previous(n1, n2){
                if((i - n1) >= 0 && (j - n2) >= 0 && (j - n2) < 8){
                    if(mines[i - n1][j - n2] == 'm'){
                        if(mines[i][j] != 'm'){
                            mines[i][j]++;
                        }
                    }
                }
            }
            previous(1, 1);
            previous(1, 0);
            previous(1, -1);
            previous(0, 1);
            function next(n1, n2){
                if((i + n1) < 8 && (j + n2) < 8 && (j + n2) >= 0){
                    if(mines[i + n1][j + n2] == 'm'){
                        if(mines[i][j] != 'm'){
                            mines[i][j]++;
                        }
                    }
                }
            }
            next(0, 1);
            next(1, -1);
            next(1, 0);
            next(1, 1);
        }
    }
    //console.log(mines);


    // призначення функції, яка виконується при потраплянні на квадрат, де міна відсутня
    
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(mines[i][j] != 'm'){
                d3[i * 8 + j].addEventListener('click', mines_quantity);
            }
        }
    }
    
    function mines_quantity(){
        if(explosion == false){
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    if(mines[i][j] != 'm'){
                        let d6 = document.querySelector('div:hover');  // умова, необхідна для того, щоб відкривався тільки той квадрат, на який наведена миша
                        if(d3[i * 8 + j] == d6 & d3[i * 8 + j].style.backgroundColor != 'red'){
                            d3[i * 8 + j].innerHTML = mines[i][j];
                            // якщо на квадраті написано "0", то відкриваються поряд розташовані квадрати
                            if(mines[i][j] == 0){
                                function previous1(n1, n2){
                                    if((i - n1) >= 0 && (j - n2) >= 0 && (j - n2) < 8 && d3[(i - n1) * 8 + j - n2].style.backgroundColor != 'red'){
                                        d3[(i - n1) * 8 + j - n2].innerHTML = mines[i - n1][j - n2];
                                    }
                                }
                                previous1(1, 1);
                                previous1(1, 0);
                                previous1(1, -1);
                                previous1(0, 1);
                                function next1(n1, n2){
                                    if((i + n1) < 8 && (j + n2) < 8 && (j + n2) >= 0 && d3[(i + n1) * 8 + j + n2].style.backgroundColor != 'red'){
                                        d3[(i + n1) * 8 + j + n2].innerHTML = mines[i + n1][j + n2];
                                    }
                                }
                                next1(0, 1);
                                next1(1, -1);
                                next1(1, 0);
                                next1(1, 1);
                            }
                        }
                    }
                }
            }
        }
    }
}