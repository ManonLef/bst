/* eslint no-use-before-define: ["error", { "functions": false }] */
import Node from "./node";
import { preparedArray } from "./helpers";

export default class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
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

function buildTree(array) {
  if (array.length === 0) {
    return null;
  }

  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);

  root.left = buildTree(array.slice(0, mid));
  root.right = buildTree(array.slice(mid + 1, array.length));

  return root;
}

// insert pseudo

// from the root, check if node value to be inserted is higher or lower than root.
// if lower, move to left
// if higher, move to right
// keep doing the above until we find a node without any left/right children
// if node is lower, insert left and if higher, insert right

// can we do this similar to linked list? try:

// testing area

const testArray = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10, 11, 13, 15, 12, 14];
const testArrayDeux = [1, 7, 4, 23, 12, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(preparedArray(testArray));
prettyPrint(myTree.root);
console.log("prepped array ", preparedArray(testArray));
console.log("myTree root ", myTree.root);

prettyPrint(buildTree(preparedArray(testArrayDeux)));


function prettyPrint(node, prefix = "", isLeft = true) {
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
}
