const obj = { name: 'Alex', 
              age: 33, 
              findwork: true, 
              preferences: null,
              arr: [0,1,2,3,4,5],
              adress: { country: 'UA', city: 'Dnipro' } };


function copy(objForCopy) {
    let objCopy = {};
    let arrCopy = [];
    for (let key in objForCopy) {
        //Если массив, то запускаем глубокое копирование
        if (Array.isArray(objForCopy[key])) {
            objCopy[key] = copy(objForCopy[key]);
        } 
        else if (typeof (objForCopy[key]) == "object" && objForCopy[key] !== null) {
            // Если объект, то вызываю ещё раз функцию и передаю свойству результат-объект
            objCopy[key] = copy(objForCopy[key]);
        }
        //Если проверка на массив true, то копируем массив
        else if (Array.isArray(objForCopy)) arrCopy[key] = objForCopy[key];
        else objCopy[key] = objForCopy[key];

    }
    //Если проверка на массив true, то возвращаем массив
    if (Array.isArray(objForCopy)) return arrCopy;
    
    return objCopy;
}

const objTwo = copy(obj);

//Проверка
objTwo.name = 'Oleg';
objTwo.adress.country = 'USA';
objTwo.arr[1] = 'serhserthrth';
console.log(obj);
console.log(objTwo);