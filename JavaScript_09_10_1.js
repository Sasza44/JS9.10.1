"use strict";


let pictures = ['picture1', 'picture2', 'picture3', 'picture4', 'picture5', 'picture6']; // перелік id фотокарток


let n2 = 0;
const next = () => {
    n2++;
    if(n2 < pictures.length) {
        let pic = document.createElement('div');
        pic.setAttribute('id', pictures[n2]);
        document.body.replaceChild(pic, document.getElementById(pictures[n2 - 1]));
    }
    else {
        let pic = document.createElement('div');
        pic.setAttribute('id', 'picture1');
        document.body.replaceChild(pic, document.getElementById(pictures[pictures.length - 1]));
        n2 = 0;
    } 
}

const previous = () => {
    if(n2 == 0) {
        let pic = document.createElement('div');
        pic.setAttribute('id', pictures[pictures.length - 1]);
        document.body.replaceChild(pic, document.getElementById('picture1'));
        n2 = pictures.length;
    }
    else {
        let pic = document.createElement('div');
        pic.setAttribute('id', pictures[n2 - 1]);
        document.body.replaceChild(pic, document.getElementById(pictures[n2]));
    }
    n2--;
}

document.getElementById("next").onclick = next;
document.getElementById("previous").onclick = previous;
