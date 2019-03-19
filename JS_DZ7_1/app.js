const obj = { name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro' } };
let objCopy = {};// копия объекта
let counter = 0;// счётчик
let valueObject;// переменная сохраняет название свойства, у которого значение объект

function copy(objForCopy, objCopy) {
    let interim = {};//промежуточный объект в функции

    for (let keyOne in objForCopy) {

        if (typeof (objForCopy[keyOne]) == "object") {
            counter++;
            valueObject = keyOne;
            return copy(objForCopy[keyOne], objCopy);
        }

        //Если счётчик ноль, то копируем первый уровень, если не ноль, то внутренний уровень
        if (!counter) objCopy[keyOne] = objForCopy[keyOne];
        else interim[keyOne] = objForCopy[keyOne];
    }
    //Если не ноль, то присваиваем зафиксированному свойству значение-объект
    if (counter) objCopy[valueObject] = interim;

    return objCopy;
}


const objTwo = copy(obj, objCopy);

//Проверка
objTwo.name = 'Oleg';
objTwo.adress.country = 'USA';
console.log(obj);
console.log(objTwo);