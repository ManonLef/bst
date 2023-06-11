/* eslint no-use-before-define: ["error", { "functions": false }] */
import Node from "./node";
import preparedArray from "./helpers";

export default class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
  // insert pseudo

  // from the root, check if node value to be inserted is higher or lower than root.
  // if lower, move to left
  // if higher, move to right
  // keep doing the above until we find a node without any left/right children
  // if node is lower, insert left and if higher, insert right

  // can we do this similar to linked list? try:
  insert(value) {
    console.log(this.root);

    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }

    let node = this.root;

    // this doesn't really work since it will replace a value if only one node is present
    while (node.left || node.right) {
      if (value === node.data) {
        console.log(`${value} already present. Goodbye`)
        return
      }
      if (value < node.data) {
        console.log(value, "smaller, moving down the tree to the left");
        if (node.left) {
          node = node.left;
        } else {
          node.left = new Node(value);
          console.log("node is now", node);
          return node.left;
        }
      } else {
        console.log(value, "not smaller, moving down the tree to the right");
        if (node.right) {
          node = node.right;
        } else {
          node.right = new Node(value);
          console.log("node is now", node);
          return node.right;
        }
        console.log(node);
      }
    }

    if (value < node.data && !node.left) {
      console.log("last bit");
      node.left = new Node(value);
      return node.left;
    }
    if (value === node.data) {
      console.log(`last bit but ${value} already present. Goodbye`)
      return
    }
    console.log("last bit");
    node.right = new Node(value);
    return node.right;
  }

  delete(value) {
    // pseudo

    // node has no children?
    // remove it (remove previous node.left/right)

    // node has children?
    // 1 child?


    // 2 child?
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
