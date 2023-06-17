/* eslint no-use-before-define: ["error", { "functions": false }] */
import Node from "./node";

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
    let root = node;
    let minimum = root.data;
    while (root.left) {
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
  isBalanced(root = this.root) {
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