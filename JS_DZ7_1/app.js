const obj = { name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro' } };
let valueObject;// переменная сохраняет название свойства, у которого значение объект

function copy(objForCopy, objCopy = {}) {
    let interim = {};//промежуточный объект в функции

    for (let keyOne in objForCopy) {

        if (typeof (objForCopy[keyOne]) == "object") {
            valueObject = keyOne;
            return copy(objForCopy[keyOne], objCopy);
        }

        //Если undefined, то копируем первый уровень, если не undefined, то внутренний уровень
        if (valueObject === undefined) objCopy[keyOne] = objForCopy[keyOne];
        else interim[keyOne] = objForCopy[keyOne];
    }
    //Если не ноль, то присваиваем зафиксированному свойству значение-объект
    if (valueObject !== undefined) objCopy[valueObject] = interim;

    return objCopy;
}


const objTwo = copy(obj);

//Проверка
objTwo.name = 'Oleg';
objTwo.adress.country = 'USA';
console.log(obj);
console.log(objTwo);