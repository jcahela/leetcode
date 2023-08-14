/* --------------------------- Pre-ES6 Class Construction --------------------------------------- */

// Class, with constructor
function Car(make, model, year, miles = 0) {
  // Constructor: Instance variables
  this.make = make;
  this.model = model;
  this.year = year;
  this.miles = miles;

  // Increment the Static Variable numCars when this class is instantiated
  Car.numCars += 1;
}

// Static variable
Car.numCars = 0;

// Instance method
Car.prototype.drive = function(distance) {
  this.miles += distance;
}

// Static method
Car.getNumCars = function() {
  return Car.numCars;
}

const myNewCar = new Car('Nissan', 'Sentra', 2014);

// Instance variables
console.log(myNewCar.make); // output: 'Nissan'
console.log(myNewCar.model); // output: 'Sentra'
console.log(myNewCar.year); // output: 2014
console.log(myNewCar.miles); // output: 0
// Instance method (on instance/instantiated object)
myNewCar.drive(100);
// Instance variable
console.log(myNewCar.miles); // output: 100
// Static method (on Car class, static, stays the same)
console.log(Car.getNumCars()); // output: 1

/* --------------------------- ES6 Class Construction --------------------------------------- */


/* --------------------------- TypeScript Class Construction --------------------------------------- */
