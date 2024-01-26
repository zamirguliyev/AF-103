// let employee1 ={
//     fullName : "Zamir Guliyev",
//     age:20,
//     isMarred:false,
//     isMale:'Male',
//     departement:"IT"
// }
// let employee2={
//     fullName : "Ismayil Ismayilli",
//     age:19,
//     isMarred:true,
//     isMale:'Male',
//     departement:"Finace"
// }
// let employee3 ={
//     fullName : "Eli Eliyev",
//     age:17,
//     isMarred:false,
//     isMale:'Male',
//     departement:"Marketing"
// }



// TASK 21.1

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)")

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary:salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }


//     let employesAge = 0
//     for (let i = 0; i < employes.length; i++) {
//         employesAge += employes[i].age;

//     }
//     alert(`Umumi yas ortalamasi : ${employesAge / employes.length}`)

// } else {
//     alert("Reqem daxil edin")
// }


// TASK 21.2

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)");

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary: salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }



//     for (let i = 0; i < employes.length; i++) {
//         if(employes.salary > 1000){
//         }else{
//         alert(`${employes[i].fullName}  adli iscinin maasi 500 manat artirildi `)
//         }

//     }

// } else {
//     alert("Reqem daxil edin")
// }



// TASK 21.3

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)");

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary: salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }

//     for (let i = 0; i < employes.length; i++) {
//         if(employes[i].age > 60){
//             employes.slice()
//             alert(`${employes[i].fullName} olan isci silindi`)
//         }
//     }

// } else {
//     alert("Reqem daxil edin")
// }



// TASK 21.4

// let arraySize = Number(prompt("Enter array size"))
// let employes = []
// let ITemployee =[]

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)");

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary: salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }



//     for (let i = 0; i < employes.length; i++) {
//         if(employes[i].departement === "IT"){
//             ITemployee.push(employes[i])
//         }
//     }
//     console.log(ITemployee)

// } else {
//     alert("Reqem daxil edin")
// }




// TASK 21.5

// let arraySize = Number(prompt("Enter array size"))
// let employes = []
// let finaceEmployee = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)");

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary: salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }

//     let MaxSalary
//     for (let i = 0; i < employes.length; i++) {
//         if (employes[i].departement === "Finance") {
//             finaceEmployee.push(employes[i])
//         }
//     }

//     for (let i = 0; i < finaceEmployee.length; i++) {

//         if (MaxSalary === undefined) {
//             MaxSalary = finaceEmployee[i].salary
//             continue
//         }
//         if (MaxSalary < finaceEmployee[i].salary) {
//             alert(`En cox maas alan finace isci ${finaceEmployee[i].fullName}`)
//             break
//         }
//     }

// } else {
//     alert("Reqem daxil edin")
// }




// TASK 21.6

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)");

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary: salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }

//     let minSalary;

//     for (let i = 0; i < employes.length; i++) {
//         if (minSalary === undefined) {
//             minSalary = employes[i].salary
//             continue
//         }
//         if (minSalary < employes[i].salary) {
//             alert(`En az maas alan finace iscisi ${employes[i].fullName} 3000$ artirildi`)
//         }
//     }

// } else {
//     alert("Reqem daxil edin")
// }





// TASK 21.7

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)")

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary:salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }
    
//     for (let i = 0; i < employes.length; i++) {
//        if(employes){
//         employes.sort((a,b)=>a.salary - b.salary )
//        }
//     }
//     console.log(employes);

// } else {
//     alert("Reqem daxil edin")
// }





// TASK 21.8

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)")

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary:salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }


//     let count =0
 
//     for (let i = 0; i < employes.length; i++) {
//         if(employes[i].isMarred === true){
//             count++
//         }

//     }

//     alert(`evli olanlarin sayi ${count}`)
// } else {
//     alert("Reqem daxil edin")
// }




// TASK 21.9

// let arraySize = Number(prompt("Enter array size"))
// let employes = []

// if (arraySize) {
//     for (let i = 0; i < arraySize; i++) {

//         let fullName = prompt(`Enter Full name of employee #${i + 1}`);
//         let age = Number(prompt(`Enter age of employee #${i + 1}`));
//         let isMarred = confirm("Is Marred ?");
//         let isMale = prompt("Enter employee male (Male,Famale and Other)");
//         let salary = Number(prompt("Enter employee salary"));
//         let departement = prompt("Enter departement (IT,Markrting,Finance)")

//         let employee = {
//             fullName: fullName,
//             age: age,
//             isMarred: isMarred,
//             isMale: isMale,
//             salary:salary,
//             departement: departement
//         }
//         employes.push(employee)
//     }


//     let count =0
 
//     for (let i = 0; i < employes.length; i++) {
//         if(employes[i].isMale === "Male"){
//             count++
//         }

//     }

//     alert(`Kisilerin sayi ${count}`)
// } else {
//     alert("Reqem daxil edin")
// }
