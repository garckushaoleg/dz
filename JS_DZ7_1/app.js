const obj = { name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro' } };
let objCopy = {};//возвращаемый объект в функции
let interim = {};//промежуточный объект в функции
let counter = 0;//счётчик
let keyTwo;//переменная для фиксирования свойста, у которого значение объект

function copy(obj) {

    for (let keyOne in obj) {

        if (typeof (obj[keyOne]) == "object") {
            counter++;
            keyTwo = keyOne;
            return copy(obj[keyOne]);
        }

        //Если счётчик ноль, то копируем первый уровень, если не ноль, то внутренний уровень
        if (!counter) objCopy[keyOne] = obj[keyOne];
        else interim[keyOne] = obj[keyOne];
    }
    //Если не ноль, то присваиваем зафиксированному свойству значение
    if (counter) objCopy[keyTwo] = interim;

    return objCopy;
}


const objTwo = copy(obj);

//Проверка
objTwo.name = 'Oleg';
objTwo.adress.country = 'USA';
console.log(obj);
console.log(objTwo);