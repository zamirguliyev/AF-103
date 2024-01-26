var VehicleType;
(function (VehicleType) {
    VehicleType["Car"] = "Car";
    VehicleType["MotorCycle"] = "MotorCycle";
})(VehicleType || (VehicleType = {}));
var EngineType;
(function (EngineType) {
    EngineType["DOHC"] = "DOHC";
    EngineType["SOHC"] = "SOHC";
    EngineType["TURBO"] = "TURBO";
})(EngineType || (EngineType = {}));
var Car = /** @class */ (function () {
    function Car(brandName, modelName, year, fuelCapacity, currentFuel, milage, fuelFor1KM, engine, vehicleType) {
        this.milage = milage;
        this.fuelFor1KM = fuelFor1KM;
        this.engine = engine;
        this.vehicleType = vehicleType;
        this.brandName = brandName;
        this._modelName = modelName;
        this._year = year;
        this._fuelCapacity = fuelCapacity;
        this._currentFuel = currentFuel;
    }
    Object.defineProperty(Car.prototype, "modelName", {
        get: function () {
            return this._modelName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "year", {
        get: function () {
            return this._year;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "fuelCapacity", {
        get: function () {
            return this._fuelCapacity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Car.prototype, "currentFuel", {
        get: function () {
            return this._currentFuel;
        },
        enumerable: false,
        configurable: true
    });
    Car.prototype.getInfo = function () {
        console.log("Brand: ".concat(this.brandName, ", Model: ").concat(this._modelName, ", Year: ").concat(this._year, ", Fuel Capacity: ").concat(this._fuelCapacity));
    };
    Car.prototype.drive = function (km) {
        var fuelUsed = km / this.fuelFor1KM;
        this._currentFuel -= fuelUsed;
        this.milage += km;
        return this._currentFuel;
    };
    return Car;
}());
var Motorcycle = /** @class */ (function () {
    function Motorcycle(brandName, modelName, year, fuelCapacity, currentFuel, milage, fuelFor1KM, engine, vehicleType) {
        this.milage = milage;
        this.fuelFor1KM = fuelFor1KM;
        this.engine = engine;
        this.vehicleType = vehicleType;
        this.brandName = brandName;
        this._modelName = modelName;
        this._year = year;
        this._fuelCapacity = fuelCapacity;
        this._currentFuel = currentFuel;
    }
    Object.defineProperty(Motorcycle.prototype, "modelName", {
        get: function () {
            return this._modelName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Motorcycle.prototype, "year", {
        get: function () {
            return this._year;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Motorcycle.prototype, "fuelCapacity", {
        get: function () {
            return this._fuelCapacity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Motorcycle.prototype, "currentFuel", {
        get: function () {
            return this._currentFuel;
        },
        enumerable: false,
        configurable: true
    });
    Motorcycle.prototype.getInfo = function () {
        console.log("Brand: ".concat(this.brandName, ", Model: ").concat(this._modelName, ", Year: ").concat(this._year, ", Fuel Capacity: ").concat(this._fuelCapacity));
    };
    Motorcycle.prototype.drive = function (km) {
        var fuelUsed = km / this.fuelFor1KM;
        this._currentFuel -= fuelUsed;
        this.milage += km;
        return this._currentFuel;
    };
    Motorcycle.prototype.startEngine = function () {
        console.log("".concat(this.brandName, " ").concat(this._modelName, "'s engine is now running"));
    };
    return Motorcycle;
}());
var myCar = new Car('Audi', 'RS7', 2020, '50', 40, 5000, 10, EngineType.DOHC, VehicleType.Car);
var myMotorcycle = new Motorcycle('BMW', 'R1000', 2019, '30', 20, 3000, 15, EngineType.SOHC, VehicleType.MotorCycle);
myCar.getInfo();
console.log(myCar.drive(30));
myMotorcycle.getInfo();
console.log(myMotorcycle.drive(30));
myMotorcycle.startEngine();
console.log(myMotorcycle.drive(24));
var carHead = document.getElementById('car');
var motorcycleHead = document.getElementById('motorcycle');
if (carHead) {
    carHead.textContent = "Car Name: ".concat(myCar.brandName);
}
if (motorcycleHead) {
    motorcycleHead.textContent = "Motorcycle Name: ".concat(myMotorcycle.brandName);
}
