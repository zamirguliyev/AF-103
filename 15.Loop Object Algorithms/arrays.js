// TASK 1

// for (let i = 10; i<99;i++){
//     if(i % 10 === 7)
//         console.log(i);
// }


//TASK 2

// for (let i = 1;i<100;i++){
//     if(i % 11 === 0){
//         console.log(i)
//     }
// }



// TASK 3

// let num = String(123);
// let abc =""
// for (let i=0;i<num.length;i++){
//     abc += ((num[i]) + " ")
// }
// console.log(abc);



//TASK 4

// let num= prompt("Number");
// let maxElemet= 0;

// for(i=0;i<num.length;i++){
//     if(num[i] > maxElemet){
//         maxElemet = num[i];
//     }
// }


// TASK 5

// let num = "236";
// let sum = 0;
// let hasil = 1;
// for(let i=0;i<num.length;i++){
//     sum += +num[i]
//     hasil *= +num[i]
// }
// console.log(`Cem = ${sum}`);
// console.log(`Hasil = ${hasil}`);
// console.log(`Ededi orta = ${sum /(+num.length)}`);


// TASK 6 7

// let num= Number(prompt("Number"));
// let bolenSay=0;
// let bolenler ="";
// for(i=0; i<=num;i++){
//     if(num % i === 0){
//         bolenSay += 1;
//         bolenler += (String(i) + " ")
//     }
// }
// console.log(bolenler);
// console.log(bolenSay);


// TASK 8

// let arr = [3,8,2,5,4,10,7,6]
// for(i=0;i<arr.length;i++){
//     if(arr[i] % 2 === 1){
//         console.log(`Tek ededlerin index i ${i}`);
//     }
// }


// TASK 9

// let arr = [3,8,2,5,4,10,7,6]
// for(i=0;i<arr.length;i++){
//     if(i % 2 === 1){
//         console.log(`Tek index ${arr[i]}`);
//     }
// }

// TASK 10

// let numbers = [1,4,2,6,8,1,7,10,1,13,3];
// let maxElemet = numbers[0];
// for (let i = 1; i < numbers.length; ++i) {
//   if (numbers[i] > maxElemet) {
//     maxElemet = numbers[i];
//   }
// }
// console.log(`Arraydeki max elemet ${maxElemet}`);


// TASK 11

// let numbers = [1, 4, 2, 6, 8, 1, 7, 10, 12, 11, 13];
// let maxElemet
// let index
// for (let i = 0; i < numbers.length; ++i) {
//     if(numbers[i]%2 ===0){
//         if(maxElemet === undefined){
//             maxElemet = numbers[i]
//             index = i
//             continue
//         }
//         if(maxElemet<numbers[i]){
//             maxElemet = numbers[i]
//             index = i
//         }
//     }
// }
// console.log(`Arreydeki cut elementlerin max elemetin indexi ${index} max cut elemet  ${maxElemet}`);


// TASK 12

// let numbers = [ 4, 2, 6, 8, 1, 7, 10, 11, 13];
// let minElemet
// let index

// for (let i = 0; i < numbers.length; ++i) {
//     if(i ===0){
//         minElemet = numbers[i]
//         index = i
//         continue
//     }
//     if(minElemet>numbers[i]){
//         minElemet = numbers[i]
//         index = i
//     }
// }
// console.log(`Arraydeki min elementin indexi ${index} Minumum element ${minElemet}`);


// TASK 13

// let numbers = [4, 2, 6, 8, 1, 17, 10, 11, 13];
// let max = 0;
// let min = 0;

// for (let i = 0; i < numbers.length; i++) {
//   if (numbers[i] > numbers[max]) {
//     max = i;
//   }
//   if (numbers[i] < numbers[min]) {
//     min = i;
//   }
// }
// console.log(`Concat olunmamis array ${numbers}`);

// let concat = numbers[max];
// numbers[max] = numbers[min];
// numbers[min] = concat;

// console.log(`Concat olunmus array ${numbers}`);



// TASK 14

// let numbers = [4, 6, 2, 6, 8, 1, 7, 10, 11, 13];
// let maxCut
// let minCut
// let minIndex
// let maxIndex

// console.log(`Concat olunmamis array ${numbers}`);
// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0){
//         if(maxCut === undefined){
//             minCut = numbers[i]
//             maxCut = numbers[i]
//             minIndex = i
//             maxIndex = i
//             continue
//         }
//         if(minCut>numbers[i]){
//             minCut = numbers[i]
//             minIndex = i
//         }
//         if(maxCut<numbers[i]){
//             maxCut = numbers[i]
//             maxIndex = i
//         }
//     }
// }
// console.log(`Concat olunmus array ${numbers}`);



// TASK 15

// let numbers = [4, 6, 2, 6, 8, 1, 7, 10, 11, 13];
// let addNumber = Number(prompt('Add number'))
// let findNum = false
// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] === addNumber){
//         findNum = true
//         break
//     }
// }

// if(findNum){
//     alert("daxil etdiyiniz eded arrayin daxilindedi ")
// }else{
//     alert("daxil etdiyiniz eded arrayin daxilinde deyil ")
// }



// TASK 16

// let arr = [2, 9, -5, -4, "AzerBayCan", true, 12, "LANKARAN", "LimOn", 182, 4, false, "Baku", true, 10];
// let sum = 0;
// let maxNumber;
// let minNumber;

// for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === "number") {
//         if (maxNumber === undefined) {
//             maxNumber = arr[i]
//             minNumber = arr[i]
//             continue
//         }
//         if (arr[i] < minNumber) {
//             minNumber = arr[i];
//         }
//         if (arr[i] > maxNumber) {
//             maxNumber = arr[i];
//         }

//         sum += arr[i];
//     }
// }

// console.log("cem: " + (sum - (maxNumber + minNumber)));



// TASK 17

// let arr = [2, 9, -5, -4, "AzerBayCan", true, 12, "LANKARAN", "LimOn", 182, 4, false, "Baku", true, 10];
// let boolType = [];
// let index;

// for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === "boolean") {
//         boolType.push(i);
//     }
// }

// if (boolType.length > 0) {
//     for (let i = 0; i < boolType.length; i++) {
//         index = boolType[i];
//         if (index > 0) {
//             console.log(arr[index - 1]);
//         }
//         if (index < arr.length - 1) {
//             console.log(arr[index + 1]);
//         }
//     }
// } else {
//     console.log("arrayde bool tip yoxdu");
// }




// TASK 18

// let arr = [2, 9, -5, -4, "AzerBayCan", true, 12, "LANKARAN", "LimOn", 182, 4, false, "Baku", true, 10];
// let uzunSoz = "";
// let index

// for (let i = 0; i < arr.length; i++) {
//   if (typeof arr[i] === "string") {
//      index = arr[i];
//     if (index.length > uzunSoz.length) {
//       uzunSoz = index;
//     }
//   }
// }

// if (uzunSoz !== "") {
//   console.log("en uzun soz " + uzunSoz);
// } else {
//   console.log("not found.");
// }


// TASK 19

// let arr = [2, 9, -5, -4, "AzerBayCan", true, 12, "LANKARAN", "LimOn", 182, 4, false, "Baku", true, 10];
// let boyukHerf = "";
// let index = 0

// for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === "string" && arr[i] === arr[i].toUpperCase()) {
//       if (arr[i].length > boyukHerf.length) {
//         boyukHerf = arr[i];
//         index = i;
//       }
//     }
//   }
//   console.log(`butun herfler boyuk olan soz ${boyukHerf} ve oun indexi ${index}` )




// TASK 20

// let arr = [2, 9, -5, -4, "AzerBayCan", true, 12, "LANKARAN", "LimOn", 182, 4, false, "Baku", true, 10];
// let boyukHerf = 0;

// for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === "string") {

//         boyukHerf = 0;

//         for (let j = 0; j < arr[i].length; j++) {
//             if (arr[i][j] === arr[i][j].toUpperCase()) {
//                 boyukHerf++;
//             }
//         }

//         if (boyukHerf >= 2) {
//             console.log("boyuk herflerin sayi 2 den cox olanlar " + arr[i] );
//         }
//     }
// }