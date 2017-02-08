'use strict';


const bubbleSort = require('./lib/bubble-sort');
const mergeSort = require('./lib/merge-sort');
const quickSort = require('./lib/quick-sort');
const arraySort = require('./lib/array-sort');
const data = require('./data.json');


const results = [bubbleSort, mergeSort, quickSort, arraySort].map((fn) => {

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
