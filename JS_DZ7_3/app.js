const obj = { name: 'Alex', 
              age: 33, 
              findwork: true, 
              preferences: null,
              arr: [0,1,2,3,4,5],
              adress: { country: 'UA', city: 'Dnipro' } };



function copy(objForCopy) {
    let objCopy = {};
    // Если на рекурсии возвращается массив то из объекта, в который копируют, делаю массив.
    if (Array.isArray(objForCopy)) objCopy = [];

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
        else if (Array.isArray(objForCopy)) {
            objCopy[key] = objForCopy[key];
        }
        //Копируем первый уровень
        else objCopy[key] = objForCopy[key];

    }
    console.log(objCopy);
    return objCopy;
}

// let key = 'arr';
// console.log(obj[key].length);
// for(let i=0; i<obj[key].length; i++) {
//     console.log(obj[key][i]);
//     console.log(obj[key[i]]);
// }


const objTwo = copy(obj);

//Проверка
objTwo.name = 'Oleg';
objTwo.adress.country = 'USA';
objTwo.arr[1] = 'serhserthrth';
console.log(obj);
console.log(objTwo);