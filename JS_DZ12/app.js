function Student (name, arrMarks) {
    this.name = name;
    this.arrMarks = arrMarks;

    // Возвращает среднюю оценку
    this.averageMark = averageMark;

    //Возвращает количество сданных работ
    this.worksDone = worksDone;

    //Добавляет ещё одну оценку студенту
    this.addMark = addMark;
}

//Будущий метод. Возвращает среднюю оценку.
function averageMark() {
    let sumAllMarks = this.arrMarks.reduce( (result, item) => result + item, 0);
    return Math.round(sumAllMarks/this.arrMarks.length);
}

//Будущий метод. Возвращает количество сданных работ.
function worksDone() {
    let arr = this.arrMarks.filter( (item) => item>0 );
    return arr.length
}

//Будущий метод. Добавляет ещё одну оценку студенту.
function addMark(item) {
    this.arrMarks.push(item);
    return this.arrMarks
}


//Возвращает среднюю оценку по группе
function getGroupAverageMark() {
    let sumAllMarks = students.reduce( (result, item) => result + item.averageMark(), 0);
    return Math.round(sumAllMarks/students.length);
}

//Возвращает процент сданных работ по группе
function completePercent() {
    let allSubmittedWorks = students.reduce( (result, item) => result + item.worksDone(), 0);

    let allWorks = students.reduce( (result, item) => result + item.arrMarks.length, 0);

    return Math.round(allSubmittedWorks/allWorks *100)
}


const students = [ 
    new Student('Student 1', [10,9,8,0,10]),
    new Student('Student 12', [10,0,8,0,3,4]),
    new Student('Student 12', [10,0,8,0,3,4])
];

console.log(students);
console.log(students[0].averageMark());
console.log(students[1].averageMark());
console.log(students[2].averageMark());
console.log(students[0].worksDone());
console.log(students[0].addMark(5));
console.log(students[0].averageMark());

console.log(getGroupAverageMark());
console.log(completePercent());