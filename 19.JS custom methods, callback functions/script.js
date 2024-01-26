// TASK 1

String.prototype.isBlank = function () {
    return this.trim() === ''
}

// console.log("".isBlank()); 
// console.log("  ".isBlank()); 
// console.log(" salam ".isBlank());

// TASK 2

String.prototype.wavy = function () {
    let balacaBoyuk = "";
    for (let i = 0; i < this.length; i++) {
        if (i % 2 === 0) {
            balacaBoyuk += this[i].toLowerCase();
        } else {
            balacaBoyuk += this[i].toUpperCase();
        }
    }
    return balacaBoyuk;
};

//   console.log("salam".wavy())



// TASK 3
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 15, 45, 20]

Array.prototype.max = function () {
    if (this.length === 0) {
        return undefined;
    }

    let max = this[0];
    
    for (let i = 1; i < this.length; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }

    return max;
};

// console.log(numbers.max())

Array.prototype.min = function () {
    if (this.length === 0) {
        return undefined;
    }

    let min = this[0];
    for (let i = 1; i < this.length; i++) {
        if (this[i] < min) {
            min = this[i];
        }
    }

    return min;
};
// console.log(numbers.min())


// TASK 4

Array.prototype.numbers = function () {

    let count = 0
    for (let i = 0; i < this.length; i++) {
        if (typeof this[i] === "number") {
            count++
        }
    }
    return count
}
let arr = [1, 'salam', 45, 21, 'eli', 'veli']
// console.log(arr.numbers())



// TASK 5

Array.prototype.myFind = function (num) {

    for (let i = 0; i < this.length; i++) {
        if (this[i] === num) {
            return true
        }
    }
    return false
}
//let numbers =[2,5,8,7,9,6,3]

//  console.log(numbers.myFind(3))



// TASK 6
Array.prototype.myFindAll = function (target) {
    let count = 0;
    for (let i = 0; i < this.length; i++) {
        if (this[i] === target) {
            count++;
        }
    }
    if (count > 0) {
        return count;
    } else {
        return -1;
    }
};

// let numbers = [2, 5, 8, 7,3, 9, 6, 3]
// console.log(numbers.myFindAll(3))



// TASK 7

Array.prototype.myFilter = function (min, max) {
    let filter = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] >= min && this[i] < max) {
            filter.push(this[i]);
        }
    }
    return filter;
};

// let numbers = [2, 5, 8, 7, 3, 9, 6, 3]

// console.log(numbers.myFilter(2,7))



// TASK 8

Array.prototype.myIndexOf = function(num){
    for (let i = 0; i < this.length; i++) {
        if(this[i] === num){
            return i
        }
    }
    return -1
}

// let numbers = [2, 5, 3 ,8, 7, 3, 9, 6, 3]

// console.log(numbers.myIndexOf(3))



// TASK 9

Array.prototype.myLastIndexOf =function(num){
    for (let i = this.length -1; i >= 0; i--) {
            if(this[i] === num){
                return i
            }
    }
    return -1
}

// let numbers = [2, 5, 3 ,8, 7, 3, 9, 6, 3]
// console.log(numbers.myLastIndexOf(4))



// TASK 10

Array.prototype.myMap= function(){
    let cloneArr = [...this]
    return cloneArr
}

// let numbers = [2, 5, 3 ,8, 7, 3, 9, 6, 3]
// console.log(numbers.myMap())