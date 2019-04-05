function Student (name, rating) {
    this.name = name;
    this.allWorksStudent = rating.length;// Общее количество работ студента

    // Возвращает среднюю оценку
    this.averageMark = function() {
        return rating.reduce(function(result, item) {
            return result + item/2;
        }, 0)
    }

    //Возвращает количество сданных работ
    this.worksDone = function() {
        let arr = rating.filter(function(number) {
            return number>0
        });

        return arr.length
    }

    //Добавляет ещё одну оценку студенту
    this.addMark = function(item) {
        rating.push(item);
        return rating
    }
}

//Возвращает среднюю оценку по группе
function averageMark() {
    return students.reduce(function(result, item) {
        return result + item.averageMark()/2;
    }, 0)
}

//Возвращает процент сданных работ по группе
function completePercent() {
    let allSubmittedWorks = students.reduce(function(result, item) {
        return result + item.worksDone();
    }, 0);

    let allWorks = students.reduce(function(result, item) {
        return result + item.allWorksStudent;
    }, 0);
    return Math.round(allSubmittedWorks/allWorks *100)
}


const students = [ 
    new Student('Student 1', [10,9,8,0,10]),
    new Student('Student 12', [10,0,8,0,3,4])
   ];

console.log(students);
console.log(students[0].averageMark());
console.log(students[1].averageMark());
console.log(students[0].worksDone());
console.log(students[0].addMark(5));

console.log(averageMark());
console.log(completePercent());
