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

  return {
    insert,
    remove,
  };
};

export default Tree;
