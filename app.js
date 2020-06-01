// TODO: These global variables are not secure
const ageOfParks = [];
const treesInPark = new Map();
const streetLengths = [];

class Town {
  constructor(name, buildYear, length) {
    this.name = name;
    this.buildYear = buildYear;
    this.length = length;

    // Default if length is undefined
    this.sizeCategory = "normal";
  }

  calcAge() {
    return new Date().getFullYear() - this.buildYear;
  }
}

class Street extends Town {
  constructor(name, buildYear, length) {
    super(name, buildYear, length);

    // Save street length into an array
    streetLengths.push(this.length);

    // Detemine size classification of street based on its length
    let x = this.length;
    if (x > 0 && x <= 500) {
      this.sizeCategory = "tiny";
    } else if (x > 500 && x <= 1000) {
      this.sizeCategory = "small";
    } else if (x > 1000 && x <= 2000) {
      this.sizeCategory = 'normal';
    } else if (x > 2000 && x <= 3000) {
      this.sizeCategory = 'big';
    } else if (x > 3000) {
      this.sizeCategory = 'huge';
    }
  }

  static calcTotalLengths() {
    let totalLength = 0;
    for (let i = 0; i < streetLengths.length; i++) {
      totalLength += streetLengths[i];
    }
    return totalLength;
  }

  static calcAvgLength() {
    return Street.calcTotalLengths()/streetLengths.length;
  }

}

class Park extends Town {
  constructor(name, buildYear, length, width, numOfTrees) {
    super(name, buildYear, length);
    this.width = width;
    this.numOfTrees = numOfTrees;

    // This is immediately called when the Park class is instantiated.
    // It stores data about Park objects to global data structures.
    ageOfParks.push(this.calcAge());
    // console.log(ageOfParks);
    treesInPark.set(this.name, this.numOfTrees);
    // console.log(treesInPark);
  }

    // Calculates the total age of all Parks
    static sumOfAges() {
      let sum = 0;
      for (let i = 0; i < ageOfParks.length; i++) {
        sum += ageOfParks[i];
      }
      return sum;
    }

    static calcAvgAge() {
      return Park.sumOfAges()/ageOfParks.length;
    }

    calcParkArea() {
      return this.length * this.width;
    }

    calcTreeDensity() {
      return this.numOfTrees/this.calcParkArea();
    }

    // Name of parks with number of trees greater than 1000
    static withLotsOfTrees() {
      let s = '';
      for (let [parkName, numOfTrees] of treesInPark.entries()) {
        if (numOfTrees > 1000) {
          console.log(`${parkName} park has more than 1000 trees.`);
        }
      }
    }

  }

const laurelStreets = [];
const laurelParks = [];
// Create four street objects and save to an array
let street1, street2, street3, street4;
laurelStreets.push(street1 = new Street('Gramercy Lane', 1900, 500));
laurelStreets.push(street2 = new Street('East Gate Lane', 1890, 1000));
laurelStreets.push(street3 = new Street('Key West Avenue', 1870, 2000));
laurelStreets.push(street4 = new Street('Main Avenue', 1850, 3000));

// Create three park objects and save to an array
let park1, park2, park3;
laurelParks.push(park1 = new Park('Assateague State Park', 1956, 1000, 500, 100));
laurelParks.push(park2 = new Park('Chapman State Park', 1998, 500, 250, 2000));
laurelParks.push(park3 = new Park('Elk Neck State Park', 1936, 2000, 1000, 3000));

// Prints The Report to console
console.log('----PARKS REPORT----')
console.log(`Our ${laurelParks.length} parks have an average of ${Park.calcAvgAge()} years.`);

for(let i = 0; i < laurelParks.length; i++) {
  console.log(`${laurelParks[i].name} has a tree density of ${laurelParks[i].calcTreeDensity()} trees per square km.`);
}

Park.withLotsOfTrees(); // prints to console

console.log('----STREETS REPORT----')
console.log(`Our ${laurelStreets.length} streets have a total length of ${Street.calcTotalLengths()} km, with an average of ${Street.calcAvgLength()} km.`);

for(let i = 0; i < laurelStreets.length; i++) {
  console.log(`${laurelStreets[i].name}, built in ${laurelStreets[i].buildYear}, is a ${laurelStreets[i].sizeCategory} street.`);
}
