// TASK 1

// let num = Number(prompt("Enter number"));
// let qaliq = num % 7;

// if (qaliq < 4) {
//     num = num - qaliq
// } else {
//     num = num + (7 - qaliq)
// }

// if (qaliq === 0) {
//     alert("7 e bolunur");
// } else {
//     alert(`en yaxin 7 ye bolunen eded ${num}`);
// }



// TASK 2

//  let b = Number(prompt("Enter number"));

// if(b < 50){
//    let y =Math.floor(b / 3)
//     alert(`3 e bolunen eded sayi ${y}`)
// }
// else if(b < 100){
//    let a = Math.floor((b / 5))
//     alert(`5 e bolunen eded sayi ${a}`)
// }
// else{
//     let c = Math.floor((b / 8))
//     alert(`8 e bolunen eded sayi ${c}`)
// }


// TASK 3

// let numbers = [1,4,2,6,8,1,7];
// let maxElemet = numbers[0];
// for (let i = 1; i < numbers.length; ++i) {
//   if (numbers[i] > maxElemet) {
//     maxElemet = numbers[i];
//   }
// }
// alert(`Max Elemet ${maxElemet}`)



// TASK 4
// let numbers =  [1,4,2,6,8,2,1,7,7];
// let repatedNumber;
// let repatedCount=0;
//  for (let i = 0; i < numbers.length; i++) {

//     let count = 0;
//     for (let j = 0; j < numbers.length; j++) {
//         if( numbers[i] ===numbers[j]){
//               count++;      
//         }
//     }
//     if(count>repatedCount){
//         repatedCount = count
//         repatedNumber = numbers[i]
//     }
//  }
//  alert(`Tekrarlan eded ${repatedNumber} `);




// TASK 5

// let numbers = [1,4,2,6,8,2,1,7,7];
// let sum =0

// for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
// }
// alert(`Ededi ortasi ${sum / numbers.length}`)


// TASK 6

// let names = ["Ali","Vali","Ahmad","Muhammed","Yusif"];
// let count =0;
// for (let i = 0; i < names.length; i++) {
//     if (names[i].length > 4) {
//         count++;
//     }
// }
// alert(`${count}`)



// TASK 7

//return islesin deye functionun daxilinde yazmisam normalda tek ededi murekkeb eded
// cixaranda 2 defe murekkebdir cixarirdi :)

let num = Number(prompt("Eded daxil edin"));
function SadeMurekkeb(num) {
    if (num === 1) {
        alert("Ne sade ne murekkeb")
        return
    }
    if (num === 2) {
        alert("Sadedir")
        return
    }
    if (num % 2 === 0) {
        alert("Murekkedir")
        return
    }
    let sadeEded = true;
    for (let i = 3; i < num; i++) {
        if (num % i === 0) {
            sadeEded = false
            break;
        }
    }
    if (sadeEded) {
        alert("Sadedir")
    } else {
        alert("Murekkebdir")
    }
}
SadeMurekkeb(num)