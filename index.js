let store = { drivers: [], passengers: [], trips: [] };

let driverId = 0
class Driver {
    constructor(name) {
        this.name = name;
        this.id = ++driverId;

        store.drivers.push(this);
    }

    trips() {
        return store.trips.filter( 
            function(trip) {
                return trip.driverId === this.id
            }.bind(this)
        )
    }

    passengers() {
        return store.passengers.filter(
            function(passenger){
                let trips = this.trips()
                return trips.filter(
                    function(trip) {
                        return trip.passenger.id === passenger.id
                    }.bind(this)
                )
            }.bind(this)  
        )
    }
}

let passengerId = 0
class Passenger {
    constructor(name) {
        this.name = name;
        this.id = ++passengerId;

        store.passengers.push(this);
    }

    trips() {
        return store.trips.filter( 
            function(trip) {
                return trip.passengerId === this.id
            }.bind(this)
        )
    }

    drivers(){
        return store.drivers.filter(
            function(driver){
                let trips = this.trips()
                return trips.filter(
                    function(trip) {
                        return trip.driver.id === driver.id
                    }.bind(this)
                )
            }.bind(this)  
        )
    }
}

let tripId = 0
class Trip {
    constructor(driver, passenger) {
        this.driverId = driver.id;
        this.passengerId = passenger.id;
        this.id = ++tripId;

        store.trips.push(this);
    }
    passenger() {
        return store.passengers.find(
            function(passenger) {
                return passenger.id === this.passengerId;
            }.bind(this)
        );
    }

    driver() {
        return store.drivers.find(
            function(driver) {
                return driver.id === this.driverId;
            }.bind(this)
        );
    }
}