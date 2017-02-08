'use strict';

//
// Sort usando `Array.prototype.sort`.
//
function arraySort(data) {

  return [].concat(data.sort((a, b) => {

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }));
}


module.exports = arraySort;
