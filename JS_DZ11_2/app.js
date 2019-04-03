var users = [{
    name: "Вася",
    surname: 'Иванов',
    age: 20
  }, {
    name: "Петя",
    surname: 'Чапаев',
    age: 25
  }, {
    name: "Маша",
    surname: 'Медведева',
    age: 18
  }];

function getField(key) {
  let i = 0;
    
  return function () {
     let arrElement= users[i];
     i++;
     return arrElement[key];
  }
}

console.log(users.map(getField('name')));
console.log(users.map(getField('age')));