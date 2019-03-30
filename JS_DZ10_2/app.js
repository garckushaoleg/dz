function addLi() {
    let li = document.createElement('li');
    li.setAttribute('elementLi', '');
    ol.appendChild(li);
    li.textContent = inputData.value;
    
    resetInput();
}

function resetInput() {
    inputData.value = '';
}

function toggleBg(event) {
    if (event.target.hasAttribute('elementLi')) {
        if (event.target.style.backgroundColor == 'green') 
        event.target.style.backgroundColor = 'yellow'
        else event.target.style.backgroundColor = 'green'
    }
}


let inputData = document.getElementById('inputData');
const submitData = document.getElementById('submitData');
let ol = document.getElementsByTagName('ol')[0];

submitData.addEventListener('click', addLi);
ol.addEventListener('click', toggleBg);