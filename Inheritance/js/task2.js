// Create Vehicle, Car, Motorcycle 

// Classes accept the following properties during creation;
// 	Vehicle: color, engine,
// 	Car: model, color, engine;
// 	Motorcycle: model, color, engine
// All classes by default have maxSpeed property. For Vehicle maxSpped = 70,
// Car: maxSpeed = 80, Motorcycle: maxSpeed = 90;

// NOTE: If you need other properties you can add them

// All classes have the following methods:
//     • upgradeEngine(newEngine, maxSpeed) – sets new engine and update maxSpeed; 
//     NOTE: You can upgrade engine only if car is stopped;
//     • getInfo() – returns information about class { engine, color, maxSpeed, model }.
//     • drive() - The vehicle starts to drive and every 2 seconds speed increase at 20.
// 	If speed is greater than maxSpeed the warning message should be shown
// 	 'speed is too high, SLOW DOWN!'. But vehicle continues to drive;
// 	When Motorcycle class starts to drive the message  ‘Let’s drive’ is shown.
// Also for class Motorcycle if difference between current speed and maxSpeed 
// is greater than or equal to 30 the message ‘Engine overheating’ is shown and Motorcycle begin braking.

// 	NOTE: if car already drive you can't call this method again.
//     • stop() - The vehicle decrease it's speed every 1,5 second at 20.
// 	When vehicle is stopped, the following messages should be shown:
//         ◦ For Vehicle class - “ Vehicle is stopped. Maximum speed during the drive was *** ”;
//         ◦ For Car class – “Car ** is stopped. Maximum speed during the drive *** ”;
//         ◦ For Motorcycle – “Motorcycle ** is stopped. Good drive”;

// 	** - model of the vehicle;
// 	*** - max speed from moment the vehicle begin drive until stopped;

//   NOTE: if vehicle begin braking you can't do it again, the message ‘Already slows down’ should be shown, 
//   but you can continues to drive;

// The Car class has changeColor(newColor) method – sets the new color for the Car. 
// NOTE: you can’t choose the color in which the car is already painted

// NOTE: If you need other methods  you can add them

//  RESTRICTIONS
//     • Do not use ES6 classes
//     • Do not use any external libraries

const SLOWER_SPEED = 1500;
const FASTER_SPEED = 2000;
const DIFF_SPEED = 30;

const Vehicle = function (engine, color) {
  this.engine = engine;
  this.color = color;
  this.maxSpeed = 70;
  this.model = 'unknown model';
  this.currentSpeed = 0;
  this.isDrive = false;
  this.isStopped = true;
}

Vehicle.prototype.messWarning = function () {
  return `Vehicle is stopped. Maximum speed during the drive was ${this.maxSpeedDrive}`;
}

Vehicle.prototype.upgradeEngine = function (newEngine, maxSpeed) {
  if (this.currentSpeed === 0) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
  }
}

Vehicle.prototype.getInfo = function () {
  const objToShow = {};

  objToShow.engine = this.engine;
  objToShow.color = this.color;
  objToShow.maxSpeed = this.maxSpeed;
  objToShow.model = this.model;

  return Object.assign({}, objToShow);
}

Vehicle.prototype.drive = function () {
  if (this.isDrive) {
    console.log('Already driving');
    return;
  } else {
    this.isDrive = true;

    if (this.slower) {
      clearInterval(this.slower);
    }

    const current = this;

    this.faster = setInterval(function () {
      current.currentSpeed += 20;
      console.log(current.currentSpeed);

      if (current.currentSpeed > current.maxSpeed) {
        console.log('speed is too high, SLOW DOWN!');
        current.isDrive = false;
      }
    }, FASTER_SPEED);
  }
}

Vehicle.prototype.stop = function () {
  if (!this.isStopped) {
    console.log('Already slows down');
    return;
  } else {
    this.isStopped = false;

    if (this.faster) {
      clearInterval(this.faster);
    }

    this.maxSpeedDrive = this.currentSpeed;
    const current = this;

    this.slower = setInterval(function () {
      console.log(current.currentSpeed);
      current.currentSpeed -= 20;

      if (current.currentSpeed <= 0) {
        console.log(current.messWarning());
        clearInterval(current.slower);
        current.isStopped = true;
      }
    }, SLOWER_SPEED);
  }
}

const Car = function (engine, color, model) {
  Vehicle.call(this, engine, color);
  this.maxSpeed = 80;
  this.model = model;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.messWarning = function () {
  return `Car ${this.model} is stopped. Maximum speed during the drive was ${this.maxSpeedDrive}`;
}

Car.prototype.changeColor = function (newColor) {
  if (this.color === newColor) {
    return console.log('The selected color is the same as the prewious, please choose another one');
  } else {
    if (this.currentSpeed === 0) {
      this.color = newColor;
    } else {
      console.log("Sorry, can't change the color. I'm driving");
    }
  }
}

const Motorcycle = function (engine, color, model) {
  Vehicle.call(this, engine, color);
  this.maxSpeed = 90;
  this.model = model;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

Motorcycle.prototype.messWarning = function () {
  return `Motorcycle ${this.model} is stopped. Good drive`;
}

Motorcycle.prototype.drive = function () {
  if (this.isDrive) {
    console.log('Already driving');
    return;
  } else {
    this.isDrive = true;

    if (this.slower) {
      clearInterval(this.slower);
    }

    console.log('Let’s drive');
    const current = this;

    this.faster = setInterval(function () {
      current.currentSpeed += 20;
      console.log(current.currentSpeed);

      if (current.currentSpeed > current.maxSpeed) {
        console.log('speed is too high, SLOW DOWN!');
      }

      if (current.currentSpeed - current.maxSpeed >= DIFF_SPEED) {
        console.log('Engine overheating');
        current.stop();
        current.isDrive = false;
      }
    }, FASTER_SPEED);
  }
}

const vehicle = new Vehicle('G4KC', 'white');
const car = new Car('G4KK', 'silver pearl', 'Hyundai Sonata');
const motorcycle = new Motorcycle('GSX-R600', 'black', 'Suzuki');