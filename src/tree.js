import Node from "./node"

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function preparedArray(array) {
  const bstArray = mergeSort(removeDupl(array));
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
  let arrayCopy = [...array];
  let filteredArray = [...new Set(arrayCopy)];
  return filteredArray;
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 12, 25, 12, 3, 3, 3, 5, 7, 9, 67, 6345, 324]
console.log(
  preparedArray(testArray)
); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

console.log(buildTree(preparedArray(testArray)))

function buildTree(array) {

  // base
  if (array.length === 0) {
    return null;
  }

  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid])

  // left half
  root.left = buildTree(array.slice(0, mid-1))
  
  // right half
  root.right = buildTree(array.slice(mid+1, array.length))

  return root
}

// building the tree function pseudo
// sort array and remove duplicates (check sorted array assignment)
// if array is empty (length === 0) return null
// find mid point of array
// the root will be the midpoint of the array

// find mid point of left half of the array
// mid point left half will be the left child of initial root

// find mid point of right half of the array
// mid point right half will be the right child of initial root

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(buildTree(preparedArray(testArray)))