// Task 1

let x = Number(prompt("Enter number"));


if(x> 0 && x % 2 === 0){
    alert("Postive even")
}
else{
    alert("Negative even")
}


// Task 2

let b = Number(prompt("Enter number"));

if(b < 50){
   let y =Math.floor(b / 3)
    alert(`3 e bolunen eded sayi ${y}`)
}
else if(b < 100){
   let a = Math.floor((b / 5))
    alert(`5 e bolunen eded sayi ${a}`)
}
else{
    let c = Math.floor((b / 8))
    alert(`8 e bolunen eded sayi ${c}`)
}


// Task 3
let month = Number(prompt("month"))

switch(month){
    case 1:
        alert("January")
    break;
    case 2:
        alert("February")
    break; 
    case 3:
        alert("March")
    break; 
    case 4:
        alert("April")
    break; 
    case 5:
        alert("May")
    break; 
    case 6:
        alert("June")
    break; 
    case 7:
        alert("July")
    break; 
    case 8:
        alert("August")
    break; 
    case 9:
        alert("September")
    break; 
    case 10:
        alert("October")
    break; 
    case 11:
        alert("November ")
    break; 
    case 12:
        alert("December")
    break; 

    default:
        alert("Invalin Input")
    break;    
}


// Task 4
let season = Number(prompt("season"))

switch (season) {
    case 1:
    case 2:
    case 12:
        alert("Winter")
        break;

    case 3:
    case 4:
    case 5:
        alert("Spring")
        break;
    case 6:
    case 7:
    case 8:
        alert("Summer")
        break;
    case 9:
    case 10:
    case 11:
        alert("Autumn")
        break;

    default:
        alert("Invalin Input")
        break;
}


// Task 5

const num1 = Number(prompt("First number"));
const num2 = Number(prompt("Second number"));
const num3 = Number(prompt("Third number"));

if (num1 === num2 && num2 === num3) {
  alert("Equals");
} else if (num1 > num2 && num1 > num3) {
  alert(`${num1}`);
} else if (num2 > num1 && num2 > num3) {
  alert(`${num2}`);
} else if (num3 > num1 && num3 > num2) {
  alert(`${num3}`);
} else {
  alert("Try Again");
}