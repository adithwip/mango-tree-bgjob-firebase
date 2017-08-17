"use strict"

var cron = require('node-cron');

// release 0

class FruitTree {

  // Initialize FruitTree as a parent class
  constructor() {
    this._age = 0;
    this._height = 0;
    this._fruits = [];
    this.totalFruits = 0;
    this.puber = 0;
    this.healthyStatus = true; //Kondisi hidup
    // this.maxHeight = 10;
    // this.maxAge = 20;
    // this.maxGrow = 10;
  }

  getAge() {
    return this._age;
  }
  getHeight() {
    return this._height;
  }
  getFruits() {
    return this._fruits;
  }
  getHealtyStatus() {
    return this.healthyStatus;
  }


  // Get current states here

  // Grow the tree
  grow(maxGrow) {
    //Setiap tumbuh, umur bertambah 1
    this._age++;

    //Setiap umur tambah, tinggi juga nambah
    //Tambahnya gak banyak2
    if (this._age <= maxGrow) {
      let littleGrow = Math.ceil(Math.random() * (this.maxHeight * 1.5)) / 10;
      this._height += littleGrow;
    }

    // //Pertumbuhan berhenti saat mentok di tinggi maksimal
    // if (this._height >= this.maxHeight) {
    //   this._height = this.maxHeight;
    // }
    this._height = parseFloat(this._height.toFixed(1));
    //Pohon mati saat mentok di batas umur maksimal
    if (this._age === this.maxAge) {
      this.healthyStatus = false;
    }
    this.totalFruit += this.produceFruits();
  }

  // Produce some fruits
  produceFruits() {
    let fruitsCapacity = Math.round(Math.random() * 10);

    if (this._age >= this.puber) {
      for (let i = 0; i < fruitsCapacity; i++) {
        this._fruits[i] = new Fruit();
      } //ini untuk this._fruits array
    }

    return fruitsCapacity; //jika method produceFruits() dipanggil, dia akan mereturn
  }

  // Get some fruits
  harvest() {
    let good = 0;
    let bad = 0;

    for (let i = 0; i < this._fruits.length; i++) {
      if (this._fruits[i].quality === 'good') {
        good++;
      } else {
        bad++;
      }
    } //for
    this._harvested = `${this._fruits.length} (${good} good, ${bad} bad)`;

    this._fruits = [];
  } //harvest
}

class Fruit {
  // Produce a mango
  constructor() {
    this.quality = this.qualitySetter();
  }

  qualitySetter() {
    let random = Math.round(Math.random());
    if (random === 1) {
      this.quality = 'good';
    } else {
      this.quality = 'bad';
    }
    return this.quality;
  }
}

// Release 1
class MangoTree extends FruitTree {
  constructor() {
    super();
    this.maxHeight = 10;
    this.maxAge = 20;
    this.puber = 5;
  }
}
class Mango extends Fruit {}

class AppleTree extends FruitTree {
  constructor() {
    super();
    this.maxHeight = 10;
    this.maxAge = 10;
    this.puber = 3
  }
}
class Apple extends Fruit {}

class PearTree extends FruitTree {
  constructor() {
    super();
    this.maxHeight = 5;
    this.maxAge = 10;
    this.puber = 4;
  }
}
class Pear extends Fruit {}

//Instance and Reporting

console.log('---Release 0, 1, 2---');

let mangoTree = new MangoTree()
console.log('\n');
console.log(`-----Mango tree-----`);
console.log('The tree is alive! :smile:');
do {
  mangoTree.grow(8);
  mangoTree.produceFruits();
  //console.log(mangoTree.getFruits());
  mangoTree.harvest();
  console.log(`[Year ${mangoTree._age} Report] Height = ${mangoTree._height} m | Mangoes harvested = ${mangoTree._harvested}`)
} while (mangoTree.healthyStatus != false)
console.log(`The tree has met its end :sad:`);
console.log('\n');


let appleTree = new AppleTree()
console.log(`-----Apple tree-----`);
console.log('The tree is alive! :smile:');
do {
  appleTree.grow(5);
  appleTree.produceFruits();
  //  console.log(appleTree.getFruits());
  appleTree.harvest();
  console.log(`[Year ${appleTree._age} Report] Height = ${appleTree._height} m | Apples harvested = ${appleTree._harvested}`)
} while (appleTree.healthyStatus != false)
console.log(`The tree has met its end :sad:`);
console.log('\n');


let pearTree = new PearTree()
console.log(`-----Pear tree-----`);
console.log('The tree is alive! :smile:');
do {
  pearTree.grow(5);
  pearTree.produceFruits();
  //  console.log(appleTree.getFruits());
  pearTree.harvest();
  console.log(`[Year ${pearTree._age} Report] Height = ${pearTree._height} m | Pears harvested = ${pearTree._harvested}`)
} while (pearTree.healthyStatus != false)
console.log(`The tree has met its end :sad:`);
console.log('\n');


// Release 3
class TreeGrove {
  constructor() {
    this.year = 0;
    this.trees = [];
  }

  inputTree(type, age, height, fruit, health) {
    let tree = new type();
    tree.name = type.name;
    // tree._fruits = [];
    tree._age = age;
    tree._height = height;
    tree.totalFruit = fruit;
    tree.healthyStatus = health;

    this.trees.push(tree)
  }

  nextYear() {
    this.year++;
    for(let i = 0; i < this.trees.length; i++) {
      this.trees[i].grow();
    }
  }

  showTrees() {
    for(let i = 0; i < this.trees.length; i++) {
      console.log(this.trees[i].name);
    }
  }

  showAge() {
    for(let i = 0; i < this.trees.length; i++) {
      console.log(`${this.trees[i].name}, age: ${this.trees[i]._age}`)
    }
  }

  dead_trees() {
    let deadTrees = [];
    for(let i = 0; i < this.trees.length; i++) {
      if(!this.trees[i].healthyStatus) {
        deadTrees.push(this.trees[i].name);
      }
    }
    return deadTrees;
  }

  mature_trees() {
    let mature = [];
    for(let i = 0; i < this.trees.length; i++) {
      if(this.trees[i].totalFruit > 0 && this.trees[i].healthyStatus) mature.push(this.trees[i].name)
    }
    return mature;
  }
}

let grove = new TreeGrove();

grove.inputTree(MangoTree, 5, 1.8, 7, true)
grove.inputTree(AppleTree, 2, 1.2, 5, true)
grove.inputTree(PearTree, 7, 2, 15, true)
grove.nextYear();
grove.nextYear();
grove.nextYear();
grove.nextYear();

console.log('---Release 3---');

console.log('-----Show trees:');
grove.showTrees();
console.log('-----Show ages: ');
grove.showAge();

console.log('-----Mature Trees:');
console.log(grove.mature_trees());
console.log('-----Dead trees');
console.log(grove.dead_trees());









//Stored:
// // driver code untuk release 0
// let tree = new FruitTree()
// console.log('The tree is alive! :smile:');
// do {
//   tree.grow();
//   tree.produceFruits();
//   tree.harvest();
//   console.log(`[Year ${tree._age} Report] Height = ${tree._height} | Fruits harvested = ${tree._harvested}`)
// } while (tree.healthyStatus != false)
// console.log('The tree has met its end. :sad:');

//repushed
