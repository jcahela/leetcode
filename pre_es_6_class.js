// function Car(make, model, year, miles = 0) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
//   this.miles = miles;

//   Car.numCars += 1;
// }

// // Static variables go directly on the class
// Car.numCars = 0;

// // Static methods go directly on the class
// Car.getNumCars = function() {
//   return Car.numCars;
// }

// // Instance methods get prototype, because these functions act on the prototype (instantiated object)
// Car.prototype.drive = function(distance) {
//   this.miles += distance;
// }
// function Car(make, model, year, miles = 0) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
//   this.miles = miles;

//   Car.numCars += 1;
// }

// Car.numCars = 0;

// Car.getNumCars = function() {
//   return Car.numCars;
// }

// Car.prototype.drive = function(distance) {
//   this.miles += distance;
// }


// const myCar = new Car('Nissan', 'Sentra', 2014);

// console.log(myCar.make);
// console.log(myCar.model);
// console.log(myCar.year);
// console.log(myCar.miles);

// console.log(Car.getNumCars());

// myCar.drive(1000);

// console.log(myCar.miles);

// const mySecondCar = new Car('Toyota', 'Hybrid', 2024);

// console.log(Car.getNumCars());


/******************** Attempt #3 **********************/

// function Car(make, model, year, miles = 0) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
//   this.miles = miles;

//   Car.numCars += 1;
// }

// Car.numCars = 0;

// Car.prototype.drive = function(distance) {
//   this.miles += distance;
// }

// Car.getNumCars = function() {
//   return Car.numCars;
// }

// console.log(Car.getNumCars());

// const myNewCar = new Car('Nissan', 'Sentra', 2014, 50000);

// console.log('num cars instantiated', Car.getNumCars());
// console.log('my new car make', myNewCar.make);
// console.log('my new car model', myNewCar.model);
// console.log('my new car year', myNewCar.year);
// console.log('my new car miles', myNewCar.miles);

// myNewCar.drive(20000);

// console.log('my new car miles after driving 20,000 miles', myNewCar.miles);
