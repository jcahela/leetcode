function Car(make, model, year, miles = 0) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.miles = miles;

  Car.numCars += 1;
}

// Static variables go directly on the class
Car.numCars = 0;

// Static methods go directly on the class
Car.getNumCars = function() {
  return Car.numCars;
}

// Instance methods get prototype, because these functions act on the prototype (instantiated object)
Car.prototype.drive = function(distance) {
  this.miles += distance;
}
