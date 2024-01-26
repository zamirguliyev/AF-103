
// let Products ={
    
//         productName : "Iphone 15",
//         salePrice:2500,
//         costPrice:2000,
//         stockQuantity:15,
//         soldQuantity :0,
//         isDiscounted:false,
//         discountPercentage:0,

//         // TASK 1.1
//         productProfit:function (salePrice,costPrice){
//             return this.salePrice- this.costPrice
//         },

//         // TASK 1.2
//         productSale:function(sellQuantity){
//             if(this.stockQuantity >= sellQuantity){
//                 this.soldQuantity += sellQuantity;
//                 this.stockQuantity -= sellQuantity;
//                 alert(`${sellQuantity} eded satilan meshuldan qazanc: ${(this.salePrice - this.costPrice) * sellQuantity}`)
//             }
//             else{
//                 alert(`Teesuf ki ${sellQuantity} qeder mehsul elimizde yoxdur.Max ala bileceyiniz say: ${this.stockQuantity} dir`)
//             }
//         }, 
            
// }

// console.log(Products)
// console.log(Products.productProfit())

// Products.productSale(5)




// TASK 1.3

let productCount=Number(prompt("Enter product Count:"))
let products = []

for(let i =0 ;i<productCount; i++){
    let productName = prompt(`Enter #${i+1} product name`)
    let salePrice = Number(prompt(`Enter #${i+1} product sale price`))
    let costPrice = Number(prompt(`Enter #${i+1} product cost price`))
    while(costPrice>salePrice){
        costPrice = Number(prompt(`try again`))
    }   
    let stockQuantity = Number(prompt(`Enter #${i+1} product stock quantity`))
    let soldQuantity = Number(prompt(`Enter #${i+1} product sold quantity`))
    let isDiscounted = confirm(`IsDiscounted`)
    let discountPercentage = Number(prompt(`Enter #${i+1} product discounted percentage`))

    let product =createProduct(productName,salePrice,costPrice,stockQuantity,soldQuantity,isDiscounted,discountPercentage)
    products.push(product)
}

function createProduct(productName,salePrice,costPrice,stockQuantity,soldQuantity,isDiscounted,discountPercentage){
    let product ={
        productName,
        salePrice,
        costPrice,
        stockQuantity,
        soldQuantity,
        isDiscounted,
        discountPercentage
    }
    return product
}   

// console.log(products)


// TASK 1.4 

// let totalProtif =0
// let total = 0
// function productProfit(products) {
//     for (let i = 0; i < products.length; i++) {
//         totalProtif = (products[i].salePrice -products[i].costPrice)*products[i].stockQuantity
//         total +=totalProtif
//     }
    
//     alert(`Magazadaki umumi produclarin umumi geliri : ${total}`)
    
// }

// productProfit(products)


// TASK 1.5

// let totalProtif =0
// let total = 0
// function productProfit(products) {
//     for (let i = 0; i < products.length; i++) {
//         totalProtif = (((products[i].salePrice) - (products[i].costPrice)) - (products[i].salePrice*(products[i].discountPercentage / 100)))*products[i].stockQuantity 
//         total +=totalProtif
//     }
    
//     alert(`Magazadaki umumi produclarin umumi geliri : ${total}`)
    
// }
// productProfit(products)


// TASK 1.6

// function productProfit(products) {
//     for (let i = 0; i < products.length; i++) {
//      if(products[i].discountPercentage === 0)  {
//         products.sort((a,b)=>b.salePrice -a.salePrice)
//      }
//     }
//     console.log(products)
    
// }
// productProfit(products)