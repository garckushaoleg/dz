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
    
  return function (item) {

    return item[key]
  }
}

console.log(users.map(getField('name')));
console.log(users.map(getField('age')));