import Node from './node.js';

const Tree = (arr) => {
  let root = null;
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
    // Create the root note
    const node = Node();
    node.data = subArr[midIndex];

    // Recursively construct the left subtree and make it left child of root
    const leftSubArr = subArr.slice(0, midIndex);
    node.left = buildTree(leftSubArr);
    // Recursively construct the left subtree and make it left child of root
    const rightSubArr = subArr.slice(midIndex + 1);
    node.right = buildTree(rightSubArr);

    if (subArr.length === sortedArr.length) {
      root = node;
      prettyPrint(root);
    }

    return node;
  };

  buildTree(sortedArr);

  return {};
};

export default Tree;
