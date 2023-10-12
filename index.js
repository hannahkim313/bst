import Tree from './factories/tree.js';

// initialize a new tree
const tree = Tree([1, 10, 99, 30, 5, 23, 7]);

// initial tree is balanced
console.log(tree.isBalanced());

// print out all elements in each method of traversal
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

// insert random numbers greater than 100
tree.insert(101);
tree.insert(423);
tree.insert(380);
tree.insert(353);

// confirm the tree is now unbalanced
console.log(tree.isBalanced());

// re-balance tree
tree.reBalance();

// confirm tree is balanced
console.log(tree.isBalanced());

// print out all elements of newly balanced tree in each method of traversal
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
