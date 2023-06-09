class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function buildTree(array) {

}

function preparedArray(array) {
  const bstArray = mergeSort(removeDupl(array))
  return bstArray;
}

function mergeSort(array) {
  if (array.length < 2) return array;

  let firstHalf = array.slice(0, array.length / 2);
  let secondHalf = array.slice(array.length / 2);

  let left = mergeSort(firstHalf);
  let right = mergeSort(secondHalf);

  let merged = [];

  while (left.length !== 0 && right.length !== 0) {
    if (left[0] < right[0]) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  while (left.length !== 0) {
    merged.push(left.shift());
  }
  while (right.length !== 0) {
    merged.push(right.shift());
  }

  return merged;
}

function removeDupl(array) {
  let arrayCopy = [...array]
  let filteredArray = [...new Set(arrayCopy)]
  return filteredArray
}


console.log(preparedArray([9, 4, 6, 5, 7, 2, 2, 3, 8, 1, 13, 9, 10, 12, 14, 11, 15])); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


// building the tree function pseudo
// sort array and remove duplicates (check sorted array assignment)
// if array is empty (length === 0) return null
// find mid point of array
// the root will be the midpoint of the array

// find mid point of left half of the array
// mid point left half will be the left child of initial root

// find mid point of right half of the array
// mid point right half will be the right child of initial root
