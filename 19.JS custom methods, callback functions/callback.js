// setTimeout(() => { 
//     console.log("This message is shown after 3 seconds");
// }, 3000);



// const message = function() {  
//     console.log("This message is shown after 3 seconds");
// }
// setTimeout(message, 3000);




// function sum(a, b) {
//     console.log(a + b)
//   }
  
//   function operation(val1, val2, callback) {
//     callback(val1, val2)
//   }
  
//   operation(6, 5, sum)





//   function loginUserServer(email, callback) {
//     setTimeout(() => {
//       callback({ userEmail: email })
//     }, 2000)
//   }
  
//   const user = loginUserServer('zamir@gmail.com', (user) => {
//     console.log(user)
//   })



// function filter(numbers, callback) {
//     let results = [];
//     for (const number of numbers) {
//       if (callback(number)) {
//         results.push(number);
//       }
//     }
//     return results;
//   }
  
//   let numbers = [1, 2, 4, 7, 3, 5, 6];
  
//   let oddNumbers = filter(numbers, function (number) {
//     return number % 2 != 0;
//   });
  
//   console.log(oddNumbers);





// function download(url, callback) {
//     setTimeout(() => {
//       console.log(`Downloading ${url} ...`);
//       callback(url);
//     }, 1000);
//   }
  
//   const url1 = 'https://www.javascripttutorial.net/pic1.jpg';
//   const url2 = 'https://www.javascripttutorial.net/pic2.jpg';
//   const url3 = 'https://www.javascripttutorial.net/pic3.jpg';
  
//   download(url1, function (url) {
//     console.log(`Processing ${url}`);
//     download(url2, function (url) {
//       console.log(`Processing ${url}`);
//       download(url3, function (url) {
//         console.log(`Processing ${url}`);
//       });
//     });
//   });