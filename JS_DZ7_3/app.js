const obj = { name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro' } };

function copy(objForCopy, objCopy = {}) {

    for (let key in objForCopy) {

        if (typeof (objForCopy[key]) == "object") {
            // Если объект, то вызываю ещё раз функцию и передаю свойству результат-объект
            objCopy[key] = copy(objForCopy[key]);
        }
        else objCopy[key] = objForCopy[key];
    }

    return objCopy;
}

const objTwo = copy(obj);

//Проверка
objTwo.name = 'Oleg';
objTwo.adress.country = 'USA';
console.log(obj);
console.log(objTwo);