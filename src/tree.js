/* eslint no-use-before-define: ["error", { "functions": false }] */
import Node from "./node";
import { preparedArray, prettyPrint } from "./helpers";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1, array.length));

    return root;
  }

  insert(value, root = this.root) {
    let node = root;
    if (node === null) {
      node = new Node(value);
      return node;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  delete(value, node = this.root) {
    const root = node;
    if (root === null) return root;

    // find node to delete
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
      // value is equal to node found
    } else {
      // only right child which will replace node to be deleted or no child
      if (root.left === null) {
        return root.right;
        // only left child which will replace node to be deleted
      }
      if (root.right === null) {
        return root.left;
      }
      root.data = this.findLowest(root.right);
      root.right = this.delete(root.data, root.right);
    }

    return root;
  }

  // delete helper
  findLowest(node = this.root) {
    const root = node;
    let minimum = root.data;
    while (!root.left) {
      minimum = root.left.data;
      root = root.left;
    }
    return minimum;
  }

  // find
  find(value, root = this.root) {
    const node = root;
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      return this.find(value, node.left);
    }
    if (value > node.data) {
      return this.find(value, node.right);
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

  // inorder traversal is: left -> root -> right
  // my array: 1, 2, 3, 4, 5, 6, 7
  inOrder(cb, node = this.root, output = []) {
    if (node === null) return;

    this.inOrder(cb, node.left, output);

    if (typeof cb === "function") output.push(cb(node));
    else output.push(node.data);

    this.inOrder(cb, node.right, output);

    return output;
  }

  // preorder traversal is: left -> right -> root
  // my array: 1, 3, 2, 5, 7, 6, 4
  preOrder(cb, node = this.root, output = []) {
    if (node === null) return null;

    this.preOrder(cb, node.left, output);
    this.preOrder(cb, node.right, output);
    if (typeof cb === "function") output.push(cb(node));
    else output.push(node.data);

    return output;
  }

  // postorder traversal is: right -> left -> root
  // my array: 7, 5, 6, 3, 1, 2, 4
  postOrder(cb, node = this.root, output = []) {
    if (node === null) return;

    this.postOrder(cb, node.right, output);
    this.postOrder(cb, node.left, output);

    if (typeof cb === "function") output.push(cb(node));
    else output.push(node.data);

    return output;
  }

  // edges from this node to furthest leaf node
  height(node) {
    if (node === null) return -1;
    const heightLeft = this.height(node.left);
    const heightRight = this.height(node.right);

    if (heightLeft > heightRight) return heightLeft + 1;
    return heightRight + 1;
  }

  // from root to target
  depth(node, parent = this.root) {
    if (parent === null) return 0;
    if (node.data < parent.data) {
      return this.depth(node, parent.left) + 1;
    }
    if (node.data > parent.data) {
      return this.depth(node, parent.right) + 1;
    }
    if (node.data === parent.data) return 0;
  }

  // balanced: height of left subtree and right subtree differ by maximum 1
  // left subtree is balanced
  // right subtree is balanced
  isBalanced(root) {
    const mainBalanced = this.balanced(root);
    const leftBalanced = this.balanced(root.left);
    const rightBalanced = this.balanced(root.right);
    const allBalanced = mainBalanced && leftBalanced && rightBalanced;
    return allBalanced;
  }

  balanced(root) {
    if (root === null) return null;
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    const balanced = Math.abs(leftHeight - rightHeight) <= 1;
    return balanced;
  }

  rebalance() {
    this.root = this.buildTree(this.inOrder());
  }
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

myTree.insert(8);
myTree.insert(6);
myTree.insert(5.9);
myTree.insert(7000);
myTree.insert(25);
myTree.insert(8);
myTree.insert(500);
myTree.insert(502);
myTree.insert(503);
myTree.insert(24);
myTree.insert(501);

prettyPrint(myTree.root);

console.log("deleting...");
myTree.delete(6);
console.log(myTree.inOrder());
prettyPrint(myTree.root);

console.log("find ", myTree.find(502));
prettyPrint(myTree.root);

console.log("myTree root ", myTree.root);
console.log("levelorder ", myTree.levelOrder(myTree.root));

// order traversal testing
const newTree = new Tree(preparedArray([6, 5, 4, 7, 3, 2, 1]));
prettyPrint(newTree.root);

// inorder without callback
console.log("tree inorder", newTree.inOrder());

// preorder without callback
console.log("tree preorder", newTree.preOrder());

// postOrder without callback
console.log("tree postOrder", newTree.postOrder());

// height root
console.log("height from root: ", myTree.height(myTree.root));

// height of node in tree
console.log("height from existing node: ", myTree.height(myTree.find(500)));

// depth
console.log("depth: ", myTree.depth(myTree.find(4)));

// isBalanced?
console.log("balancing: ", myTree.isBalanced(myTree.root));

// rebalance
console.log("rebalancing");
myTree.rebalance();
prettyPrint(myTree.root);

console.log("balancing: ", myTree.isBalanced(myTree.root));
