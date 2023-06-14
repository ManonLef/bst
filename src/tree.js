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
    return node;
  }

  delete(value) {
    let node = this.root;
    let parent = null;

    while (node.data !== value) {
      if (value < node.data) {
        parent = node;
        node = node.left;
      } else if (value > node.data) {
        parent = node;
        node = node.right;
      }
    }

    // if node has 2 subtrees
    if (node.left && node.right) {
      const rightSub = node.right;
      const parentOfNodeReplacer = findLow(rightSub);
      const replacingNode = parentOfNodeReplacer.left;
      node.data = replacingNode.data;
      const orphans = replacingNode.right;
      parentOfNodeReplacer.left = orphans;
      return;
    }

    // node has no children
    if (!node.right && !node.left) {
      if (value < parent.data) {
        parent.left = null;
        return;
      }
      parent.right = null;
      return;
    }
    // node has only right child
    if (node.right) {
      if (value < parent.data) {
        parent.left = node.right;
        return;
      }
      parent.right = node.right;
      return;
    }
    // node has only left child
    if (node.left) {
      if (value < parent.data) {
        parent.left = node.left;
        return;
      }
      parent.right = node.left;
    }
  }

  // find
  find(value) {
    return this.findRecursive(this.root, value);
  }

  findRecursive(root, value) {
    const node = root;
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      return this.findRecursive(node.left, value);
    }
    if (value > node.data) {
      return this.findRecursive(node.right, value);
    }
    return node;
  }

  // regular levelOrder
  levelOrder() {
    if (this.root === null) return [];

    const queue = [this.root];
    const levelOrderArray = [];

    while (queue.length !== 0) {
      const node = queue.pop();
      levelOrderArray.push(node.data);
      if (node.left) {
        queue.unshift(node.left);
      }
      if (node.right) {
        queue.unshift(node.right);
      }
    }

    return levelOrderArray;
  }

  // levelOrder that accepts a callback to manipulate data
  levelOrderA(cb) {
    if (this.root === null) return [];

    const queue = [this.root];
    const output = [];

    while (queue.length !== 0) {
      const node = queue.pop();

      if (!cb) output.push(node.data);
      else output.push(cb(node));

      if (node.left) {
        queue.unshift(node.left);
      }
      if (node.right) {
        queue.unshift(node.right);
      }
    }

    return output;
  }

  // inorder (accepting cb just like levelorder)
  // inorder traversal is: left -> root -> right
  // my array: 1, 2, 3, 4, 5, 6, 7

  inOrder(cb, node = this.root, output = []) {
    if (node === null) return;
    // if node has left tree, recurse node left

    this.inOrder(cb, node.left, output);

    if (typeof cb === "function") output.push(cb(node));
    else output.push(node.data);

    this.inOrder(cb, node.right, output);

    return output;
  }

  // preorder
  // preorder traversal is: left -> right -> root
  // my array: 1, 3, 2, 5, 7, 6, 4

  // postorder
  // postorder traversal is: right -> left -> root
  // my array: 7, 5, 6, 3, 1, 2, 4
}

function callback(cbData) {
  return cbData.data * 2;
}

// helper for delete method
function findLow(subtreeRight) {
  let node = subtreeRight;
  let parent = null;
  if (node.left === null) {
    return node;
  }
  while (node.left) {
    parent = node;
    node = node.left;
  }
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
// const testArrayTrois = [
//   1, 7, 4, 23, 12, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 99, 77, 66, 23, 25, 26, 26,
//   56, 5634, 654, 5643, 65, 4, 534, 765, 7684, 5, 4, 87, 8, 565,
// ];

const myTree = new Tree(preparedArray(testArrayDeux));

console.log("prepped array ", preparedArray(testArray));

// test inserting

// myTree.insert(8);
// myTree.insert(6);
// myTree.insert(5.9);
myTree.insert(7000);
myTree.insert(25);
myTree.insert(8);

prettyPrint(myTree.root);

// myTree.delete(9);
// prettyPrint(myTree.root);

console.log("find ", myTree.find(6345));
prettyPrint(myTree.root);

console.log("myTree root ", myTree.root);
console.log("levelorder ", myTree.levelOrder(myTree.root));

console.log(
  "levelorder Iterate with callback * 2",
  myTree.levelOrderA(callback)
);

// order traversal testing
const newTree = new Tree(preparedArray([6, 5, 4, 7, 3, 2, 1]));

// inorder with callback
console.log(newTree.inOrder(callback));
prettyPrint(newTree.root);

// inorder without callback
console.log(newTree.inOrder());
prettyPrint(newTree.root);

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
