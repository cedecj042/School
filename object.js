let Passenger = function (fname, lname) {
    return {
        firstName: fname,
        lastName: lname,
        isDriver: false,
        assignDriver: function () {
            return (!this.isDriver) ? this.isDriver = true : this.isDriver = false;
        },
        removeDriverStatus: function () {
            return (this.isDriver) ? this.isDriver = false : this.isDriver = true;
        },
        checkIfDriver: function () {
            return (this.isDriver) ? true : false;
        },
        getPassengerName: function () {
            return this.firstName + " " + this.lastName;
        }
    }
}

let passenger = new Passenger('Richard', 'Reyes');
passenger.assignDriver();

if (passenger.checkIfDriver()) {
    document.write(passenger.getPassengerName() + ' is a driver.');
} else {
    document.write(passenger.getPassengerName() + ' is not a driver.');

}

let Car = function (modelName, carType, passengerCapacity) {
    return {
        modelName: modelName,
        carType: carType,
        passengerCapacity: passengerCapacity,
        passengers: [],
        addPassenger: function (passenger) {
            return this.passengers.push(passenger);
        },
        checkAtCapacity: function () {
            return (this.passengers.length >= this.passengerCapacity) ? true : false;
        },
        hasDriver: function () {
            let driverCount = 0;
            if (this.checkAtCapacity()) {
                this.passengers.forEach(function (passenger) {
                    if (passenger.checkIfDriver()) {
                        driverCount++;
                    }
                });
                return (driverCount > 0) ? true : false;
            }
            // else {return false;}
        },
        getPassengers:function(){
            return this.passengers;
        },
        getModeName:function(){
            return this.modelName;
        },
        getCarType:function(){
            return this.carType;
        }

    }
}

let corolla = new Car('Toyota Corolla','Sedan','5');
