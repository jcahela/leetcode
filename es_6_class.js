/*
Using ES6 function constructor syntax, create a Car class that has the instance variables: make, model, year, and miles (miles can either be provided when a new car is instantiated, or not provided. When not provided it defaults to 0 miles), the static variable: numCars that counts how many times the Cars class has been instantiated, an instance method called 'drive' that adds to the miles when called, and a static method called getNumCars that retrieves how many times the Cars class has been instantiated. Then, instantiate a car object from that class, and test each method and variable written.
*/

class Car {
  static numCars = 0;

  constructor(make, model, year, miles = 0) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.miles = miles;

    Car.numCars += 1;
  }

  drive(distance) {
    this.miles += distance;
  }

  static getNumCars() {
    return Car.numCars;
  }
}


const myCar = new Car('Nissan', 'Sentra', 2014);

console.log(myCar.make);
console.log(myCar.model);
console.log(myCar.year);
console.log(myCar.miles);

console.log(Car.getNumCars());

myCar.drive(1000);

console.log(myCar.miles);
