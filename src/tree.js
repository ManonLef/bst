/* eslint no-use-before-define: ["error", { "functions": false }] */
import Node from "./node";
import preparedArray from "./helpers";

export default class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    this.insertRecursive(this.root, value);
  }

  insertRecursive(root, value) {
    let node = root;
    if (node === null) {
      node = new Node(value);
      return node;
    }

    if (value < node.data) {
      node.left = this.insertRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertRecursive(node.right, value);
    }
    console.log("inserting", `${value}`);
    return node;
  }

  delete(value) {
    let node = this.root;
    let parent = null;

    // if node to be deleted is the root:
    // fill out
    // find the value (works)
    while (node.data !== value) {
      if (value < node.data) {
        parent = node;
        node = node.left;
      } else if (value > node.data) {
        parent = node;
        node = node.right;
      }
    }

    if (node.left && node.right) {
      console.log(`node to be removed is`, node);
      // right subtree of node to be removed
      const rightSub = node.right;
      console.log(`right subtree of node to be removed is `, rightSub);

      // left subtree of node to be removed
      const leftSub = node.left;
      console.log(`left subtree of node to be removed is `, leftSub);

      // parent of node to take replacement
      const parentOfNodeReplacer = findLow(rightSub);
      console.log(
        `parent of node to take ${value} place is`,
        parentOfNodeReplacer
      );
      // child that's going to take its place (always the most left child)
      const replacingNode = parentOfNodeReplacer.left;
      console.log(`child that will take ${value} place is`, replacingNode);
      // copy replacing node data to node that gets removed (works up to here)
      node.data = replacingNode.data;
      // children of the replacement node
      const orphans = replacingNode.right;
      console.log(`orphans to be reattached are`, orphans);
      // if replacement node has right orphans (), they need to be reattached to the parent of the replacer

      parentOfNodeReplacer.left = orphans;
      return;
    }

    // node has no children (works)
    if (!node.right && !node.left) {
      if (value < parent.data) {
        parent.left = null;
        return parent.left;
      }
      parent.right = null;
      return parent.right;
    }
    // node has only right child (works)
    if (node.right) {
      if (value < parent.data) {
        parent.left = node.right;
        return parent.left;
      }
      parent.right = node.right;
      return parent.right;
    }
    // node has only left child (works)
    if (node.left) {
      if (value < parent.data) {
        parent.left = node.left;
        return parent.left;
      }
      parent.right = node.left;
      return parent.right;
    }

  }
}

function findLow(subtreeRight) {
  let node = subtreeRight;
  let parent = null;
  if (node.left === null) {
    return node;
  }
  while (node.left) {
    parent = node;
    node = node.left;
    console.log("node", node, "parent ", parent);
  }
  console.log(`lowest is ${node.data}, parent is ${parent.data}`, parent);
  return parent;
}

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
const testArrayTrois = [
  1, 7, 4, 23, 12, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 99, 77, 66, 23, 25, 26, 26,
  56, 5634, 654, 5643, 65, 4, 534, 765, 7684, 5, 4, 87, 8, 565,
];

const myTree = new Tree(preparedArray(testArrayDeux));

console.log("prepped array ", preparedArray(testArray));

// test inserting

// myTree.insert(8);
// myTree.insert(6);
// myTree.insert(5.9);
// myTree.insert(6.5);

prettyPrint(myTree.root);

myTree.delete(9);
prettyPrint(myTree.root);

console.log("myTree root ", myTree.root);

// myTree.delete(4);
// prettyPrint(myTree.root);

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
