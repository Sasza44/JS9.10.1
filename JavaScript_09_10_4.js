"use strict";

class Hamburger {
    constructor(size, stuffingP, stuffingC) {
        this.size = size;
        this.stuffingP = stuffingP;
        this.stuffingC = stuffingC;
    }
    addToppingInside(toppingP, toppingC){
        this.toppingP = toppingP;
        this.toppingC = toppingC;
    }
    calculatePrice(){
        return this.size * 50 + this.stuffingP + this.toppingP;
    }
    calculateCalories(){
        return this.size * 20 + this.stuffingC + this.toppingC;
    }
}

let hamburger = [];                                         // масив з гамбургерів
let number = 0;                                             // початкова кількість гамбургерів
let price = [];                                             // ціна та калорійність відповідного гамбургера
let calories = [];

function createObject() {
    number++;
    // перевірка правильності введення даних
    let _size;
    while(_size != 1 && _size != 2){
        _size = prompt('Оберіть розмір гамбургера: якщо маленький, введіть 1, великий, введіть 2', 1);
    }
    let stuffing;
    let _stuffingP;
    let _stuffingC;
    while(stuffing != 1 && stuffing != 2 && stuffing != 3){
        stuffing = prompt('Оберіть додаткову начинку: сир - 1, салат - 2, картопля - 3', 1);
    }
    if(stuffing == 1){
        _stuffingP = 10;
        _stuffingC = 20;
    }
    else if(stuffing == 2){
        _stuffingP = 20;
        _stuffingC = 5;
    }
    else if(stuffing == 3){
        _stuffingP = 15;
        _stuffingC = 10;
    }

    hamburger[number] = new Hamburger(_size, _stuffingP, _stuffingC);

    let topping = 0;
    let _toppingP = 0;
    let _toppingC = 0;
    function addTopping(){
        if(topping == 0){
            while(topping != 1 && topping != 2){
                topping = prompt('Можете обрати першу добавку: приправа - 1, майонез - 2', 1);
            }
        }
        else if(topping == 1){
            topping = 3;
            alert('Друга добавка - майонез');
        }
        else if(topping == 2){
            topping = 3;
            alert('Друга добавка - перець');
        }
        if(topping == 1){
            _toppingP = 15;
            _toppingC = 0;
        }
        else if(topping == 2){
            _toppingP = 20;
            _toppingC = 5;
        }
        else if(topping == 3){
            _toppingP = 35;
            _toppingC = 5;
        }

        hamburger[number].addToppingInside(_toppingP, _toppingC);
    }
    
    hamburger[number].addToppingInside(_toppingP, _toppingC);

    function calculate(){
        calories[number] = hamburger[number].calculateCalories();
        price[number] = hamburger[number].calculatePrice();
        alert(`Ціна гамбургера = ${price[number]} грн, кількість калорій = ${calories[number]}`);
        console.log(`Гамбургер №${number}, ${price[number]} грн, ${calories[number]} кал`);
    }

    const button2 = document.querySelector('#add_topping');
    button2.addEventListener('click', addTopping);

    const button3 = document.querySelector('#calculate');
    button3.addEventListener('click', calculate);
}

const button = document.querySelector('#get_hamburger');
button.addEventListener('click', createObject);
