'use strict';


const bubbleSort = require('./lib/bubble-sort.js');
const mergeSort = require('./lib/merge-sort.js');
const quickSort = require('./lib/quick-sort.js');
const data = require('./data.json');


const results = [bubbleSort, mergeSort, quickSort].map((fn) => {

  console.log(fn.name);

  let start;
  let set;

  for (var i = 2; i < 5; i++) {
    set = data.slice(0, Math.pow(10, i)).map(item => item.first_name);
    start = Date.now();
    fn(set);
    console.log('  ' + set.length + ' => ' + (Date.now() - start) + 'ms');
  }
});


console.log('built in sort');

let start;
let set;

for (var i = 2; i < 5; i++) {
  set = data.slice(0, Math.pow(10, i)).map(item => item.first_name);
  start = Date.now();

  set.sort((a, b) => {

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });

  console.log('  ' + set.length + ' => ' + (Date.now() - start) + 'ms');
}
