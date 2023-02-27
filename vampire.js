class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire

  
  get numberOfOffspring() {
    return this.offspring.length;
  }
  
  // Returns the number of vampires away from the original vampire this vampire is


  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) {
      return this;
    }

    for (const vampire of this.offspring) {
      const offspringWithName = vampire.vampireWithName(name);
      if (offspringWithName) {
        return offspringWithName;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  
  /*
  totalDescendents(vampire) {
    let totalVampires = 0;
    
    const numberOfOffspring = (vampire) => {
      for (const offspring of vampire.offspring) {
        numberOfOffspring(offspring);
        totalVampires++;
        numberOfOffspring(vampire);
      }
    };
  
    numberOfOffspring(vampire);
    return totalVampires;
  }
*/

  get totalDescendents() {
    
    let totalVampires = 0;
    
    const numberOfOffspring = (vampire) => {
      for (const offspring of vampire.offspring) {
        totalVampires++;
        numberOfOffspring(offspring);
      }
    };
  
    numberOfOffspring(this);
    return totalVampires;

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

    let millenials = [];

    if (this.yearConverted >= 1981) {
      millenials.push(this);
    }
    
    for (const offspring of this.offspring) {
      const allMillennialoffsprings = offspring.allMillennialVampires;
      millenials = millenials.concat(allMillennialoffsprings);
    }
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // If either vampire is the root vampire, return the root vampire.
    if (this === vampire) {
      return this;
    }
    
    const ancestors1 = [this];
    const ancestors2 = [vampire];
    
    // Add all ancestors of the first vampire to the array
    let currentVampire = this;
    while (currentVampire.creator) {
      ancestors1.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    
    // Add all ancestors of the second vampire to the array
    currentVampire = vampire;
    while (currentVampire.creator) {
      ancestors2.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    
    // Find the closest common ancestor
    let closestAncestor = null;
    for (let i = 0; i < ancestors1.length; i++) {
      if (ancestors2.includes(ancestors1[i])) {
        closestAncestor = ancestors1[i];
        break;
      }
    }
    
    return closestAncestor;
  }
}

module.exports = Vampire;