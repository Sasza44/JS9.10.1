"use strict";

let d = 0;
const draw = () => {
    
    let c1 = Math.floor(Math.random() * 256), c2 = Math.floor(Math.random() * 256), c3 = Math.floor(Math.random() * 256);
    let d = prompt('Вкажіть діаметр кругів (до 150 пікселів)', 100);

    for(let j = 1; j <= 10; j++){
        let d2 = document.createElement('br');
        document.body.appendChild(d2);
        d2.style.clear = 'left';
        for(let i = 1; i <= 10; i++){
            let d1 = document.createElement('div');
            d1.setAttribute('class', 'circle');
            d1.style.backgroundColor = 'rgb(' + String(c1) + ', ' + String(c2) +', ' + String(c3) + ')';
            d1.style.width = String(d) + 'px';
            d1.style.height = String(d) + 'px';
            d1.style.borderRadius = String(d / 2) + 'px';
            document.body.appendChild(d1);
            d1.style.float = 'left';
        }
    }
    // використовуємо усі намальовані круги як кнопки
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        circle.addEventListener('click', del);
    })
    
    // функція видалення круга, на який наведена миша
    function del() {
        let d3 = document.querySelector('.circle:hover');
        d3.remove();
    }
}

document.getElementById("draw_the_circles").onclick = draw; // призначаємо кнопці функцію малювання кругів випадкового кольору







