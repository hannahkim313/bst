import Node from './node.js';

const Tree = (arr) => {
  const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const buildTree = (subArr) => {
    if (subArr.length === 0) {
      return null;
    }

    const midIndex = Math.floor(subArr.length / 2);
    const root = Node();
    root.data = subArr[midIndex];
    root.left = buildTree(subArr.slice(0, midIndex));
    root.right = buildTree(subArr.slice(midIndex + 1));

    if (subArr.length === sortedArr.length) {
      prettyPrint(root);
    }

    return root;
  };

  let root = buildTree(sortedArr);

  const insert = (value, node = root) => {
    let currNode = node;
    const newNode = Node();
    newNode.data = value;

    if (currNode === null) {
      return newNode;
    }

    if (value === currNode.data) {
      return null;
    }

    if (value < currNode.data) {
      if (currNode.left === null) {
        currNode.left = newNode;

        return newNode;
      }

      currNode = currNode.left;
      currNode = insert(value, currNode);
    }

    if (value > currNode.data) {
      if (currNode.right === null) {
        currNode.right = newNode;

        return newNode;
      }

      currNode = currNode.right;
      currNode = insert(value, currNode);
    }

    return currNode;
  };

  const findMinNode = (node) => {
    if (node.left === null) {
      return node;
    }

    return findMinNode(node.left);
  };

  const remove = (value, node = root) => {
    let currNode = node;

    if (currNode === null) {
      return null;
    }

    if (value < currNode.data) {
      currNode.left = remove(value, currNode.left);
    } else if (value > currNode.data) {
      currNode.right = remove(value, currNode.right);
    } else {
      if (currNode.left === null && currNode.right === null) {
        return null;
      }

      if (currNode.left === null) {
        currNode = currNode.right;
      } else if (currNode.right === null) {
        currNode = currNode.left;
      }

      if (currNode.left !== null && currNode.right !== null) {
        const minNode = findMinNode(currNode.right);
        currNode.data = minNode.data;
        currNode.right = remove(minNode.data, currNode.right);
      }
    }

    return currNode;
  };

  const find = (value, node = root) => {
    let currNode = node;

    if (currNode === null) {
      return null;
    }

    if (value < currNode.data) {
      currNode = find(value, currNode.left);
    } else if (value > currNode.data) {
      currNode = find(value, currNode.right);
    }

    return currNode;
  };

  const levelOrder = (callback, queue = [], node = root) => {
    let currNode = node;
    const references = queue;
    const values = [];

    if (currNode !== null) {
      references.push(currNode);
    }

    while (references.length !== 0) {
      currNode = references.shift();
      values.push(currNode.data);

      if (currNode.left !== null) {
        references.push(currNode.left);
      }

      if (currNode.right !== null) {
        references.push(currNode.right);
      }

      if (callback) {
        callback(currNode);
      }
    }

    return values;
  };

  const preOrder = (callback, node = root, values = []) => {
    if (node === null) {
      return null;
    }

    if (callback) {
      callback(node);
    }

    values.push(node.data);
    preOrder(callback, node.left, values);
    preOrder(callback, node.right, values);

    return values;
  };

  const inOrder = (callback, node = root, values = []) => {
    if (node === null) {
      return null;
    }

    if (callback) {
      callback(node);
    }

    inOrder(callback, node.left, values);
    values.push(node.data);
    inOrder(callback, node.right, values);

    return values;
  };

  const postOrder = (callback, node = root, values = []) => {
    if (node === null) {
      return null;
    }

    if (callback) {
      callback(node);
    }

    postOrder(callback, node.left, values);
    postOrder(callback, node.right, values);
    values.push(node.data);

    return values;
  };

  const height = (node = root) => {
    if (node === null || (node.left === null && node.right === null)) {
      return 0;
    }

    const leftDepth = height(node.left);
    const rightDepth = height(node.right);

    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    }

    return rightDepth + 1;
  };

  const depth = (node, refNode = root) => {
    if (refNode === null || node === null) {
      return -1;
    }

    if (node.data === refNode.data) {
      return 0;
    }

    if (node.data < refNode.data) {
      return depth(node, refNode.left) + 1;
    }

    if (node.data > refNode.data) {
      return depth(node, refNode.right) + 1;
    }

    return -1;
  };

  const isBalancedCalc = (node) => {
    if (node === null) {
      return 0;
    }

    const leftHeight = isBalancedCalc(node.left);

    if (leftHeight === -1) {
      return -1;
    }

    const rightHeight = isBalancedCalc(node.right);

    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const isBalanced = (node = root) => {
    if (isBalancedCalc(node) === -1) {
      return false;
    }

    return true;
  };

  const reBalance = () => {
    root = buildTree(inOrder(null, root));
  };

  return {
    insert,
    remove,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
};

export default Tree;
