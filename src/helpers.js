/* eslint-disable no-console */
import Tree from "./tree";

function removeDuplicates(array) {
  const arrayCopy = [...array];
  const filteredArray = [...new Set(arrayCopy)];
  return filteredArray;
}

function mergeSort(array) {
  if (array.length < 2) return array;

  const firstHalf = array.slice(0, array.length / 2);
  const secondHalf = array.slice(array.length / 2);

  const left = mergeSort(firstHalf);
  const right = mergeSort(secondHalf);

  const merged = [];

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

function preparedArray(array) {
  const bstArray = mergeSort(removeDuplicates(array));
  return bstArray;
}

function randomArray() {
  const array = [];
  const items = Math.floor(Math.random() * 40 + 10);
  while (array.length < items) {
    array.push(Math.floor(Math.random() * 100 + 1));
  }
  return array;
}

// console visualizer helper
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

// Driver Script

// Create a binary search tree from an array of random numbers < 100
const myTree = new Tree(preparedArray(randomArray()));
prettyPrint(myTree.root);

// Confirm that the tree is balanced by calling isBalanced.
console.log("Confirm tree is balanced: ", myTree.isBalanced()) // true

// Print out all elements in level, pre, post, and in order.
console.log("Level Order: ", myTree.levelOrder())
console.log("Pre Order: ", myTree.preOrder())
console.log("Post Order: ", myTree.postOrder())
console.log("In Order: ", myTree.inOrder())

// Unbalance the tree by adding several numbers > 100.
myTree.insert(101)
myTree.insert(102)
myTree.insert(103)
myTree.insert(104)
myTree.insert(105)
prettyPrint(myTree.root);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log("Is the tree balanced? ", myTree.isBalanced()) 

// Balance the tree by calling rebalance.
console.log("it's not balanced, Let me rebalance it for you")
myTree.rebalance()
prettyPrint(myTree.root);

// Confirm that the tree is balanced by calling isBalanced.
console.log("Are you sure it's balanced now? ", myTree.isBalanced()) // true

// Print out all elements in level, pre, post, and in order.
console.log("Level Order: ", myTree.levelOrder())
console.log("Pre Order: ", myTree.preOrder())
console.log("Post Order: ", myTree.postOrder())
console.log("In Order: ", myTree.inOrder())
