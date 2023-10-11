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

  const root = buildTree(sortedArr);

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
        return newNode;
      }

      currNode = currNode.left;
      currNode = insert(value, currNode);
    }

    if (value > currNode.data) {
      if (currNode.right === null) {
        return newNode;
      }

      currNode = currNode.right;
      currNode = insert(value, currNode);
    }

    return currNode;
  };

  return {
    insert,
  };
};

export default Tree;
