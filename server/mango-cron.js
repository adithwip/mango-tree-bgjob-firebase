"use strict"

var cron = require('node-cron');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCj6RvfU17VhH2kitjgg1vkn1wcW27m4is",
    authDomain: "mango-tree-simulator.firebaseapp.com",
    databaseURL: "https://mango-tree-simulator.firebaseio.com",
    projectId: "mango-tree-simulator",
    storageBucket: "mango-tree-simulator.appspot.com",
    messagingSenderId: "284791009011"
	};
	
firebase.initializeApp(config);

var db = firebase.database()

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
    this._harvested = this._fruits.length;

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

//Instance and Reporting with cron background jobs

let mangoTree = new MangoTree()
console.log('The tree is alive! :smile:');

var task = cron.schedule('*/1 * * * * *', function() {
	if (mangoTree.healthyStatus != false) {
		mangoTree.grow(15);
		mangoTree.produceFruits();
		mangoTree.harvest();
		
		var umur = mangoTree._age
		var tinggi = mangoTree._height
		var buah = mangoTree._harvested

		db.ref('mangotree').set({
			umur: umur,
			tinggi: tinggi,
			buah: buah
		})

		console.log(`[Year ${mangoTree._age} Report] Height = ${mangoTree._height} m | Mangoes harvested = ${mangoTree._harvested}`)
	}

	if (mangoTree.healthyStatus == false) {
		console.log(`The tree has met its end :sad:`);
		
		task.stop()
	}
})

