enum VehicleType {
    Car = 'Car',
    MotorCycle = 'MotorCycle'
  }
  
  enum EngineType {
    DOHC = 'DOHC',
    SOHC = 'SOHC',
    TURBO = 'TURBO'
  }
  
  type Capacity = '30' | '40' | '50' | '70' | '100';
  
  interface IVehicle<T> {
    brandName: string;
    modelName: string;
    year: number;
    fuelCapacity: Capacity;
    currentFuel: T;
    milage: number;
    fuelFor1KM: number;
    engine: EngineType;
    vehicleType: VehicleType;
  
    getInfo(): void;
    drive(km: number): T;
  }
  
  class Car implements IVehicle<number> {
    public brandName: string;
    private _modelName: string;
    private _year: number;
    private _fuelCapacity: Capacity;
    private _currentFuel: number;
  
    constructor(
      brandName: string,
      modelName: string,
      year: number,
      fuelCapacity: Capacity,
      currentFuel: number,
      public milage: number,
      public fuelFor1KM: number,
      public engine: EngineType,
      public vehicleType: VehicleType
    ) {
      this.brandName = brandName;
      this._modelName = modelName;
      this._year = year;
      this._fuelCapacity = fuelCapacity;
      this._currentFuel = currentFuel;
    }
  
    get modelName(): string {
      return this._modelName;
    }
  
    get year(): number {
      return this._year;
    }
  
    get fuelCapacity(): Capacity {
      return this._fuelCapacity;
    }
  
    get currentFuel(): number {
      return this._currentFuel;
    }
  
    getInfo(): void {
      console.log(`Brand: ${this.brandName}, Model: ${this._modelName}, Year: ${this._year}, Fuel Capacity: ${this._fuelCapacity}`);
    }
  
    drive(km: number): number {
      const fuelUsed = km / this.fuelFor1KM;
      this._currentFuel -= fuelUsed;
      this.milage += km;
      return this._currentFuel;
    }
  }
  
  class Motorcycle implements IVehicle<number> {
    public brandName: string;
    private _modelName: string;
    private _year: number;
    private _fuelCapacity: Capacity;
    private _currentFuel: number;
  
    constructor(
      brandName: string,
      modelName: string,
      year: number,
      fuelCapacity: Capacity,
      currentFuel: number,
      public milage: number,
      public fuelFor1KM: number,
      public engine: EngineType,
      public vehicleType: VehicleType
    ) {
      this.brandName = brandName;
      this._modelName = modelName;
      this._year = year;
      this._fuelCapacity = fuelCapacity;
      this._currentFuel = currentFuel;
    }
  
    get modelName(): string {
      return this._modelName;
    }
  
    get year(): number {
      return this._year;
    }
  
    get fuelCapacity(): Capacity {
      return this._fuelCapacity;
    }
  
    get currentFuel(): number {
      return this._currentFuel;
    }
  
    getInfo(): void {
      console.log(`Brand: ${this.brandName}, Model: ${this._modelName}, Year: ${this._year}, Fuel Capacity: ${this._fuelCapacity}`);
    }
  
    drive(km: number): number {
      const fuelUsed = km / this.fuelFor1KM;
      this._currentFuel -= fuelUsed;
      this.milage += km;
      return this._currentFuel;
    }
  
    startEngine(): void {
      console.log(`${this.brandName} ${this._modelName}'s engine is now running`);
    }
  }
  
  const myCar = new Car('Audi', 'RS7', 2020, '50', 40, 5000, 10, EngineType.DOHC, VehicleType.Car);
  const myMotorcycle = new Motorcycle('BMW', 'R1000', 2019, '30', 20, 3000, 15, EngineType.SOHC, VehicleType.MotorCycle);
  
  myCar.getInfo()
  console.log(myCar.drive(30))

  myMotorcycle.getInfo()
  console.log(myMotorcycle.drive(30))
  myMotorcycle.startEngine()
  console.log(myMotorcycle.drive(24))



  const carHead = document.getElementById('car') as HTMLHeadElement;
  const motorcycleHead = document.getElementById('motorcycle') as HTMLHeadElement;
  
  if (carHead) {
    carHead.textContent = `Car Name: ${myCar.brandName}`;
  }
  
  if (motorcycleHead) {
    motorcycleHead.textContent = `Motorcycle Name: ${myMotorcycle.brandName}`;
  }
  