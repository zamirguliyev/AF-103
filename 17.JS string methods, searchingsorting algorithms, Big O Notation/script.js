// TASK 1

// let text = "Salam_salam_salam_salam_salam_salammm";
// let newText = text.replaceAll("_", "-");
// console.log(newText)


// TASK 2

// let text = "ASDFGFHGJHCVCX"
// const loverCase = (text) => {
//   return text.toLowerCase()
// }
// console.log(loverCase(text))



// TASK 3

// let text = "    Salam      "
// const task3 = function(text){
//     return text.trim().split('')
// }
// console.log(task3(text))



// TASK 4

// let text = "Robin Singh from USA"
// const loverCaseReplace = (text) => {
//   return text.toLowerCase().replaceAll(" ","-")
// }
// console.log(loverCaseReplace(text))


// TASK 5
// let text = "js string exercises"
// function capitalize(text){
//     return text.replace("j","J")
// }
// console.log(capitalize(text))



// TASK 6

// let text ="wdasdascASDscascsaDSA"
// const upperWord = function(text) {
//     let count = 0;
//     for (let i = 0; i < text.length; i++) {
//       if (text[i] >= 'A' && text[i] <= 'Z') {
//         count++;
//       }
//     }
//     return count;
// }
// let count = upperWord(text)
// console.log(`textde ${count} dene boyuk soz var`)



// TASK 7

// let cumle = "Salam dostdar"
// let soz = "Salam"

// const task7 = function(soz,cumle){
//     const index = cumle.indexOf(soz);

//     if(index !== -1){
//         return {isFound:true,index}
//     }else{
//         return {isFound:false, index:-1}
//     }
// }

// let result  = task7(soz,cumle)
// console.log(result)



// TASK 8

function Human(name, surname, birthYear, birthCity) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
    this.birthCity = birthCity;
    this.getFullName = function() {
      return this.name + " " + this.surname;
    };
  }

  const people =[]

  const person1 = new Human("Zamir", "Guliyev", 2003, "Naxcivan");
  const person2 = new Human("Ali", "Aliyev", 2000, "Baki");
  const person3 = new Human("Ibrahim", "Elesgerov", 1980, "Sumqayit");
  people.push(person1,person2,person3)


  let searchName = prompt("Ad daxil edin");

  function searchByFullName(searchName, people) {
    let results = [];
    for (let i = 0; i < people.length; i++) {
      let fullName = people[i].getFullName();
      if (fullName.toLowerCase().includes(searchName.toLowerCase().trim())) {
        results.push(people[i]);
      }
    }
    return results;
  }
  
  let searchResult = searchByFullName(searchName, people);
  
  if (searchResult.length > 0) {    
    for (let i = 0; i < searchResult.length; i++) {
      console.log(searchResult[i]);
    }
  } else {
    console.log("bele biri yoxdu");
  }