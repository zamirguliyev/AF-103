class Device {
    brand;
    model;
    screenSize;
    batteryLevel;
    #price;
    salePrice;
    discountPercentage;
    stockCount;
    saleCount;

    constructor(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, stockCount, saleCount = 0) {
        this.brand = brand;
        this.model = model;
        this.screenSize = screenSize;
        this.batteryLevel = batteryLevel;
        this.#price = price;
        this.salePrice = salePrice;
        this.discountPercentage = discountPercentage;
        this.stockCount = stockCount;
        this.saleCount = saleCount
    }

    get profit() {
        console.log(this.salePrice - this.#price)*this.saleCount;
    }


    CalculateProfit() {
        if (this.discountPercentage == 0) {
            console.log(`1 mesuldan ${this.salePrice - this.#price} manat gelir var`)
        } else {
            console.log(`1 mesuldan ${this.salePrice - (((this.salePrice * this.discountPercentage) / 100) + this.#price)} manat gelir var`)
        }
    }



    DisplayBatteryLevel() {
        console.log(`Battery Level: ${this.batteryLevel}`);
    }

    SellProduct(quantity) {
        if (quantity <= this.stockCount) {
            this.saleCount += quantity;
            this.stockCount -= quantity;
        } else {
            console.log("Istediyiniz qeder mesul yoxdur");
        }
    }


    DisplayDetails() {
        console.log(`${this.brand} , ${this.model} , ${this.screenSize} , ${this.batteryLevel}`)
    }
}

class Phone extends Device {
    isSmart;
    ring;
    constructor(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, stockCount, isSmart, ring, saleCount) {

        super(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, stockCount, saleCount);
        this.isSmart = isSmart;
        this.ring = ring;
    }

    DisplayDetails() {
        super.DisplayDetails()
        console.log(`Smart ${this.isSmart}`)
    }

    Ring() {
        console.log(this.ring)
    }
}

class Laptop extends Device {

    isRGBKeyword;
    OperatingSystem;

    constructor(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, stockCount, isRGBKeyword, OperatingSystem, saleCount) {

        super(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, stockCount, saleCount);
        this.isRGBKeyword = isRGBKeyword;
        this.OperatingSystem = OperatingSystem;
    }
    DisplayDetails() {
        super.DisplayDetails();
        console.log(`RGB Keyboard: ${this.isRGBkeyboard}`);
        console.log(`Operating System: ${this.operatingSystem}`);
    }
}

const products = [
    new Phone("Samsung", "Galaxy s21", 6.2, 90, 800, 1200, 0, 10, true, "ring-ring", 5),
    new Laptop("Toshiba", "L-850", 13.4, 95, 1200, 1500, 0, 5, false, "Ubuntu", 0),
    new Phone("Apple", "Iphone 12", 6.1, 85, 900, 1300, 0, 8, true, "beep-beep", 0),
    new Laptop("Acer", "Predator", 14, 96, 2000, 2700, 0, 10, true, "Windows", 0),
];




// TASK 1


// function FilterbyPrice(products, price) {
//     const ProductNames = [];

//     for (let i = 0; i < products.length; i++) {
//         const product = products[i];
//         if (product.salePrice > price) {
//             ProductNames.push(product.brand + ' ' + product.model);
//         }
//     }

//     return ProductNames;
// }

// const result = FilterbyPrice(products, 1100);
// console.log(result);




// TASK 2

// function FilterbyName(products, name) {
//     let count = 0;

//     for (let i = 0; i < products.length; i++) {
//       const product = products[i];
//       if (product.model.toLowerCase().includes(name.toLowerCase().trim()) ) {
//         count++;
//       }
//     }
//     return count;
//   }

//   const result = FilterbyName(products, "Iphone");
//   console.log(result)



// TASK 3

// function GetTotalProfit(products) {
//     let totalProfit = 0;

//     for (let i = 0; i < products.length; i++) {
//       const product = products[i];
//       totalProfit += product.profit;
//     }

//     return totalProfit;
//   }

//   const result = GetTotalProfit(products);
// console.log('Umumi gelir:', result);


// TASK 4
function FilterByOperatingSystem(system, products) {
    const filteredProducts = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product instanceof Laptop && product.OperatingSystem.toLowerCase().includes(system.toLowerCase().trim())) {
            filteredProducts.push(product);
        }
    }

    return filteredProducts;
}

const result = FilterByOperatingSystem("Ubuntu", products);
console.log(result);