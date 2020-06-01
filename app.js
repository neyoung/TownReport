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

  // Utility method that takes an array and returns the sum and average
  static calc(arr) {
    const sum = arr.reduce((prev, cur) => prev + cur);
    // returns sum and average as an array
    return [sum, sum / arr.length];
  }
}

class Street extends Town {
  constructor(name, buildYear, length) {
    super(name, buildYear, length);

    this.classifyStreet();
  }
  // Detemine size classification of street based on its length
  classifyStreet() {
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
}

class Park extends Town {
  constructor(name, buildYear, length, width, numOfTrees) {
    super(name, buildYear, length);
    this.width = width;
    this.numOfTrees = numOfTrees;

  }

    calcParkArea() {
      return this.length * this.width;
    }

    calcTreeDensity() {
      return this.numOfTrees/this.calcParkArea();
    }

    // Name of parks with number of trees greater than 1000
    static withLotsOfTrees(arr) {
      arr.map(el => {
        if (el.numOfTrees > 1000) {
          console.log(`${el.name} park has more than 1000 trees.`);
        }
      });
    }

  }

// Create four street objects and save to an array
const allStreets = [new Street('Gramercy Lane', 1900, 500),
                      new Street('East Gate Lane', 1890, 1000),
                      new Street('Key West Avenue', 1870, 2000),
                      new Street('Main Avenue', 1850, 3000)];

// Create three park objects and save to an array
const allParks = [new Park('Assateague State Park', 1956, 1000, 500, 100),
                    new Park('Chapman State Park', 1998, 500, 250, 2000),
                    new Park('Elk Neck State Park', 1936, 2000, 1000, 3000)];

function reportParks(p) {
  console.log('----PARKS REPORT----')
  // Loops through array to calculate the ages and stored them to an array, ages
  const ages = p.map(el => el.calcAge());
  // Using decompsition to save the returned total age and average age
  const [totalAge, avgAge] = Park.calc(ages);
  console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);
  p.map(el => console.log(`${el.name} has a tree density of ${el.calcTreeDensity()} trees per square km.`));
  Park.withLotsOfTrees(p); // prints to console
}

function reportStreets(s) {
  console.log('----STREETS REPORT----')
  const lengths = s.map(el => el.length);
  const [totalLength, avgLength] = Street.calc(lengths);
  console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
  s.map(el => console.log(`${el.name}, built in ${el.buildYear}, is a ${el.sizeCategory} street.`));

}

// Calls the methods that prints the report to console
reportParks(allParks);
reportStreets(allStreets);
