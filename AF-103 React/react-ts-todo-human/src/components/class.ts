export enum Position {
    DEVELOPER = "Developer",
    MANAGER = "Manager",
    SMM = "Smm",
    HACKER ="Hacker",
    TEACHER ="Teacher"
  }
  
  interface IEmployee<T> {
    salary: number;
    skills: T[];
    position: Position;
  }
  
  interface IStudent<T> {
    groupName: string;
    hobbies: T[];
    GPA: number;
    hasPassed(): boolean;
  }
  
  abstract class Human {
    private name: string;
    private surname :string;
    protected age: number;
  
    constructor(name: string,surname:string, age: number) {
      this.name = name;
      this.surname = surname
      this.age = age;
    }
  
    get fullName(): string {
      return (this.name + " "+ this.surname)
    }
  
  
    getInfo(): string {
      return `FullName: ${this.fullName}, Age: ${this.age}`;
    }
  }
  
 export class Employee<T> extends Human implements IEmployee<T> {
    salary: number;
    skills: T[];
    position: Position;
  
    constructor(name: string,surname:string, age: number, salary: number, skills: T[], position: Position) {
      super(name, surname,age);
      this.salary = salary;
      this.skills = skills;
      this.position = position;
    }
  }
  
 export class Student<T> extends Human implements IStudent<T> {
    private _GPA: number;
    groupName: string;
    hobbies: T[];
  
    constructor(name: string,surname:string ,age: number, groupName: string, hobbies: T[], GPA: number) {
      super(name, surname,age);
      this.groupName = groupName;
      this.hobbies = hobbies;
      this._GPA = GPA;
    }
  
    get GPA(): number {
      return this._GPA;
    }
  
    set GPA(value: number) {
      if (value >= 0 && value <= 100) {
        this._GPA = value;
      } else {
        throw new Error('GPA should be between 0 and 100');
      }
    }
  
    hasPassed(): boolean {
      return this._GPA >= 50;
    }
  }
  

