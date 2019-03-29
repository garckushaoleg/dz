function addLi() {
    let li = document.createElement('li');
    ol.appendChild(li);
    li.textContent = textList.value;

    li.addEventListener('click', addBg);
    
    resetLi();
}

function resetLi() {
    textList.value = '';
}

function addBg(event) {
    event.target.style.backgroundColor = 'green';
}


let textList = document.getElementById('textList');
const submitList = document.getElementById('submitList');
let ol = document.getElementsByTagName('ol')[0];

submitList.addEventListener('click', addLi);