/* eslint no-use-before-define: ["error", { "functions": false }] */
import Node from "./node";
import preparedArray from "./helpers";

export default class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    this.insertRecursive(this.root, value)
  }

  insertRecursive(root, value) {
    let node = root
    if (node === null) {
      node = new Node(value);
      return node
    }

    if (value < node.data) {
      node.left = this.insertRecursive(node.left, value)
    }
    else if (value > node.data) {
      node.right = this.insertRecursive(node.right, value)
    }
    console.log("inserting", `${value}`)
    return node;
  }

  delete(value) {
    // both this and insert function are very verbose. Consider recursing them.
    // this function is not complete yet. Choose a method for deletion of node with 
    // 2 children
    let node = this.root;
    let previous = node;

    while (node.left || node.right) {
      if (value === node.data) {
        if (node.left && node.right) {
          return console.log(
            `has both children with values of ${node.left.data} & ${node.right.data}`
          );
        }
        if (node.right) {
          console.log(`has right child with value of ${node.right.data}`);
          if (previous.data < node.data) {
            previous.right = node.right;
            return
          }
          previous.left = node.right;
          return;
        }
        if (node.left) {
          console.log("previous is ", `${previous.data}`);
          console.log(`has left child with value of ${node.left.data}`);
          if (previous.data < node.data) {
            previous.right = node.left;
            return previous.right;
          }
          previous.left = node.left;
          return;
        }
      }
      if (value < node.data) {
        console.log("less, left to ", `${node.left.data}`);
        previous = node;
        node = node.left;
      } else if (value > node.data) {
        console.log("more, right to ", `${node.right.data}`);
        previous = node;
        node = node.right;
      }
    }
    if (value === node.data) {
      console.log("end");
      if (previous.data > value) {
        previous.left = null;
      } else if (previous.data < value) {
        previous.right = null;
      }
      return node;
    }
    return node;
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

// testing area
const testArray = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10, 11, 13, 15, 12, 14];
const testArrayDeux = [1, 7, 4, 23, 12, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(preparedArray(testArrayDeux));

prettyPrint(myTree.root);
console.log("prepped array ", preparedArray(testArray));
console.log("myTree root ", myTree.root);

// test inserting
prettyPrint(myTree.root);
myTree.insert(8);
prettyPrint(myTree.root);
myTree.insert(13);
prettyPrint(myTree.root);
myTree.insert(13);
prettyPrint(myTree.root);

myTree.delete(6345);
prettyPrint(myTree.root);

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
