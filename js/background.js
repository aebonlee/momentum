//var
const container = document.querySelector('.container-fluid');

const IMG_NUM = 4;

//function
function handleImgLoad() {

}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    container.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();